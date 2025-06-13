'use client';
import useCustomFetching from '@/hooks/useQuery';
import { findEmergencyIncidentsExists, getDate } from '@/utils/utilitiesFn';
import { createContext, useContext, useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// utils/socket.js

const context = createContext<contextType>({
  activeTab: 0,
  setActiveTab: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
  theme: 'light',
  setTheme: () => {},
  emergencyIncident: [],
  setEmergencyIncidents: () => {},
  todayIncidents: [],
  setTodayIncidents: () => {},
  incidentPageData: [],
  setIncidentPageData: () => {},
  incidentsChangeIndicator: false,
  setIncidentChangeIndicator: () => {},
  emerygencyRedirect: false,
  setEmergencyRedirect: () => {},
  userAuthStatus: false,
  setUserAuthStatus: () => {},
  refreshToken: '',
  setRefreshToken: () => {},
  totalIncidentCount: 0,
  setTotalIncidentCount: () => {},
});

const SOCKET_SERVER_URL = 'https://yalapi.lalitpur.city';

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  // const socket = useMemo(() => io(SOCKET_SERVER_URL), []);
  // const [isConnected, setIsConnected] = useState(false);
  // const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
  //   null,
  // );

  //---------------------------------------------------UI STATES---------------------------------------------------//
  const [activeTab, setActiveTab] = useState<number>(0);
  const [theme, setTheme] = useState<string>(
    localStorage?.getItem('theme') || 'light',
  );
  // const { theme, setTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  //---------------------------------------------------DATA STORE STATES---------------------------------------------------//
  const [todayIncidents, setTodayIncidents] = useState<Incident[] | []>([]);
  const [incidentPageData, setIncidentPageData] = useState<Incident[] | []>([]);
  const [emergencyIncident, setEmergencyIncidents] = useState<Incident[] | []>(
    [],
  );
  //---------------------------------------------------INDICATOR STATES---------------------------------------------------//

  // state for tracking if the incidents have changed or not. yugesh sir wala precaution
  const [incidentsChangeIndicator, setIncidentChangeIndicator] =
    useState<boolean>(false);

  const [emerygencyRedirect, setEmergencyRedirect] = useState<boolean>(false);

  //---------------------------------------------------Refresh Token STATE---------------------------------------------------//

  const [refreshToken, setRefreshToken] = useState<string | null>('');

  //---------------------------------------------------Total Page Count---------------------------------------------------//

  const [totalIncidentCount, setTotalIncidentCount] = useState<number>(0);
  //---------------------------------------------------User Auth STATES---------------------------------------------------//

  const userStatus = document.cookie
    .split(' ')
    .find((cookieItem) => cookieItem.includes('accessToken'))
    ? true
    : false;

  console.log(userStatus, 'user status from context');
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(userStatus);

  // Also Change the status after the user loggs in from the Login Form

  const { formattedTomorrow, formattedToday, formattedOneWeekAgo } = getDate();

  const {
    data: incidentData,
    isLoading,
    isError,
  } = useCustomFetching({
    API: `/api/v1/disaster/incident/?date_from=${formattedToday}&date_to=${formattedTomorrow}`,
    key: 'incidents',
  });

  //--------------------------------------------------------USEEFFECTS--------------------------------------------------------//

  // Theme useEffect //
  useEffect(() => {
    if (document) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    localStorage?.setItem('theme', theme!);
  }, [theme]);

  useEffect(() => {
    if (incidentData?.data?.results) {
      setTodayIncidents(incidentData.data.results); // set the incident state

      // console.log(incidentData.data.results, "from context")

      //  filtering emergency category
      const emergencyIncidentExists = findEmergencyIncidentsExists(
        incidentData?.data?.results,
      );

      if (emergencyIncidentExists?.length > 0) {
        setEmergencyIncidents((prev) => [...emergencyIncidentExists]); // update the emergency state
        setEmergencyRedirect(true); // Updating the "emerygencyRedirect" indicator
        setTheme('red'); // change the theme to red
      } else {
        setEmergencyRedirect(false);
        setTheme((prev) => (prev == 'red' ? 'light' : prev));
      }
    }
  }, [
    isLoading,
    incidentData?.data,
    incidentData?.data?.results,
    emergencyIncident?.length,
  ]);

  // Bell Icon wala indicator related useEffect //
  useEffect(() => {
    setIncidentChangeIndicator(true);
    // How to know the whether incidents has changed or not
  }, [todayIncidents]);

  // SOCKET USEEFFECT //
  // useEffect(() => {
  //   // All Socket event Listeners
  //   socket.on('connect', () => {
  //     console.log('Socket Connected');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Socket disconnected');
  //     setIsConnected(false);
  //   });

  //   socketRef.current = socket;

  //   return () => {
  //     socket.disconnect();
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <context.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        theme,
        setTheme,
        emergencyIncident,
        setEmergencyIncidents,
        incidentsChangeIndicator,
        setIncidentChangeIndicator,
        todayIncidents,
        setTodayIncidents,
        emerygencyRedirect,
        setEmergencyRedirect,
        userAuthStatus,
        setUserAuthStatus,
        refreshToken,
        setRefreshToken,
        totalIncidentCount,
        setTotalIncidentCount,
        incidentPageData,
        setIncidentPageData,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={true}
        draggable={true}
        transition={Bounce}
      />
      {children}
    </context.Provider>
  );
};

export default ContextWrapper;

// Using Global Context Varibales
export const useGlobalContext = () => {
  return useContext(context);
};
