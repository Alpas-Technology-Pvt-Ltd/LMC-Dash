import api from '@/lib/axios';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { HeatLatLngTuple, LatLng } from 'leaflet';
import { toast } from 'react-toastify';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-CA'); // 'en-CA' ensures YYYY-MM-DD format
};

export const findEmergencyIncidentsExists = (
  data: Incident[],
): Incident[] | [] => {
  const emergencyIncidents = [];
  // const emergencyIncidents = data?.filter(
  //   (report) =>
  //     report.service_id == 2 ||
  //     report.service_id == 24 ||
  //     report.service_id == 3 ||
  //     report.service_id == 9 ||
  //     report.service_id == 23,
  // );

  if (emergencyIncidents.length > 0) return emergencyIncidents;
  else return [];
};

export function getMonthIndex(monthName: string) {
  const months = [
    { full: 'January', short: 'Jan' },
    { full: 'February', short: 'Feb' },
    { full: 'March', short: 'Mar' },
    { full: 'April', short: 'Apr' },
    { full: 'May', short: 'May' },
    { full: 'June', short: 'Jun' },
    { full: 'July', short: 'Jul' },
    { full: 'August', short: 'Aug' },
    { full: 'September', short: 'Sep' },
    { full: 'October', short: 'Oct' },
    { full: 'November', short: 'Nov' },
    { full: 'December', short: 'Dec' },
  ];

  const index = months.findIndex(
    (m) =>
      m.full.toLocaleLowerCase() === monthName?.toLocaleLowerCase() ||
      m.short.toLocaleLowerCase() === monthName?.toLocaleLowerCase(),
  );

  return index !== -1 ? index : null; // Returns null if the input is invalid
}

export const serializeDoughtnutData = (
  data: doughtNutBackendDataFormat[],
): doughNutDataSerializedFormat => {
  // [ trash, all_clear, cancelled, on_move , active]

  // {count: Number; title: string; description: string; endpoint: string;}

  const doughnutDataArr = [0, 0, 0, 0, 0];

  data.map((item) => {
    if (item?.title == 'trash') doughnutDataArr[0]++;
    else if (item?.title == 'all_clear') doughnutDataArr[1]++;
    else if (item?.title == 'cancelled') doughnutDataArr[2]++;
    else if (item?.title == 'on_move') doughnutDataArr[3]++;
    else if (item?.title == 'active') doughnutDataArr[4]++;
  });

  return doughnutDataArr;
};

export const serializeBarChartData = (
  data: barBackendDataFormat[],
): barDataSerializeFormat => {
  let xAxis: string[] = [];
  let yAxis: number[] = [];

  // const sortedData = data.sort((a,b) => a.service_count - b.service_count);
  data.forEach((item) => {
    xAxis.push(item.service_name);
    yAxis.push(item.service_count);
  });

  return {
    xAxis,
    yAxis,
  };
};

export const serializeLineChartData = (
  data: lineBackendDataFormat,
  startMonth: number,
  EndMonth: number,
): lineDataSerializeFormat => {
  let xAxis: string[] = [];

  months.forEach((mon, ind) => {
    if (ind >= startMonth && ind <= EndMonth) xAxis.push(mon);
  });

  let startMonthIndex = getMonthIndex(xAxis[0]);
  let yAxis = new Array(xAxis.length).fill(0);

  data.forEach((item) => {
    const incidentOccuredMonth = new Date(item.timestamp).getMonth();
    yAxis[incidentOccuredMonth - startMonthIndex!]++;
  });

  return {
    xAxis,
    yAxis,
  };
};

export const serializeMapData = (
  data: lineBackendDataFormat,
): (LatLng | HeatLatLngTuple)[] => {
  const locationArr: (LatLng | HeatLatLngTuple)[] = [];

  data.forEach((incident) => {
    const location: LatLng | HeatLatLngTuple = [
      incident.location.lat,
      incident.location.lng,
      1,
    ];
    locationArr.push(location);
  });

  return locationArr;
};

export const getDate = () => {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const formattedOneWeekAgo = oneWeekAgo.toISOString().split('T')[0];

  const twoMonthsAgo = new Date(today);
  twoMonthsAgo.setMonth(today.getMonth() - 2);
  const formattedTwoMonthsAgo = twoMonthsAgo.toISOString().split('T')[0];

  return {
    formattedToday,
    formattedTomorrow,
    formattedOneWeekAgo,
    formattedTwoMonthsAgo,
    twoMonthsAgo,
    oneWeekAgo,
    today,
  };
};

export const getOneDayFurtherDate = (currDate: string) => {
  const oneDayFurther = new Date(currDate);
  oneDayFurther.setDate(oneDayFurther.getDate() + 1);
  const formattedOneDayFurther = oneDayFurther.toISOString().split('T')[0];

  return formattedOneDayFurther;
};

export function toastFn(status:string, toastMessage:string) {
  if (status == 'success') {
    return toast.success(toastMessage, {
      theme: 'dark',
    });
  } else if (status == 'warning') {
    return toast.warning(toastMessage, {
      theme: 'dark',
    });
  } else if (status == 'info') {
    return toast.info(toastMessage, {
      theme: 'dark',
    });
  } else
    return toast.error(toastMessage, {
      theme: 'dark',
    });
}

export async function fetchDataWithAxios({
  endpoint,
  method = 'get',
  postData,
}: {
  endpoint: string;
  method?: string;
  postData?: FormData;
}) {
  try {
    if (method == 'get') {
      const response = await api.get(endpoint);

      // Axios automatically throws for non-2xx responses when using await
      // So we only need to handle the successful response here
      return response.data; // Axios automatically parses JSON
    } else {
      const response = await api.post(endpoint, postData);
      return response.data; // Axios automatically parses JSON
    }
  } catch (error) {
    // Axios specific error handling
    if (axios.isAxiosError(error)) {
      // Network errors (no response)
      if (!error.response) {
        console.error('Network error:', error.message);
        toastFn('error', error.message);
        throw new Error(
          'Network error: Please check your connection and try again.',
        );
      }

      // Handle API-specific errors based on status code
      const status = error.response.status;
      console.error(`API error ${status}:`, error.response.data);

      giveStatusCodeMessage({ status, error });
    }

    // Handle other unexpected errors (non-Axios errors)
    console.error('Unexpected error:', error);
    toastFn('error', `An unexpected error occurred. Please try again later.`);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}

export const giveStatusCodeMessage = ({
  status,
  error,
}: {
  status: number;
  error?: any;
}) => {
  switch (status) {
    case 400:
      toastFn(
        'error',
        'Invalid request. Please check your input and try again.',
      );
      console.log('Invalid request. Please check your input and try again.');
      throw new Error(
        'Invalid request. Please check your input and try again.',
      );
    case 401:
    case 403:
      toastFn('error', 'Authentication failed. Please log in and try again.');
      console.log('Authentication failed. Please log in and try again.');
      throw new Error('Authentication failed. Please log in and try again.');
    case 404:
      console.error('The requested resource was not found.');
      toastFn('error', 'The requested resource was not found.');
      throw new Error('The requested resource was not found.');
    case 429:
      console.error('Too many requests. Please try again later.');
      toastFn('error', 'Too many requests. Please try again later.');
      throw new Error('Too many requests. Please try again later.');
    case 500:
    case 502:
    case 503:
    case 504:
      console.error('Server error. Please try again later.');
      toastFn('error', 'Server error. Please try again later.');
      throw new Error('Server error. Please try again later.');

    default:
      console.error(
        `API error (${status}): ${error.response.data.message}`,
      );
      toastFn(
        'error',
        `API error (${status}): ${error.response.data.message}`,
      );
      throw new Error(
        `API error (${status}): ${error.response.data.message}`,
      );
  }
};

export const generateSignatureV2 = () => {
  const timestampV2 = Math.floor(Date.now() / 1000).toString();
  const message = `${process.env.NEXT_PUBLIC_X_API_KEY}${timestampV2}`;

  const signatureV2 = CryptoJS.HmacSHA256(
    message,
    process.env.NEXT_PUBLIC_X_API_SECRET!,
  ).toString(CryptoJS.enc.Hex);

  return { timestampV2, signatureV2 };
};
