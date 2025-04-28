'use client';
import Section1 from '@/components/Dashboard/Section1/Section1';
import Section2 from '@/components/Dashboard/Section2/Section2';
import Tabmenu from '@/components/Tabmenu/Tabmenu';
import Overlay from '@/components/Utility_Components/Overlay';
import Redirect from '@/components/Utility_Components/Redirect';
import TodayIncidentTab from '@/components/Utility_Components/TodayIncidentTab';

export default function Home() {
  // const { socket, isConnected } = useWebSocket('wss://alert.alpalika.com/ws/notifications/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxMTA0MTY0LCJpYXQiOjE3NDI0NjQxNjQsImp0aSI6ImIwODg3OTBjYjcxOTRmZTliNTRhNmU1MTA5M2M2ZjJmIiwidXNlcl9pZCI6Mn0.l5sjeMjjp3755BqcD0dj0U79UgvbjgPI0NpKzLkbj-s');

  return (
    <div className="w-full p-5 ">
      {/* NO UI , Only Redirects The Page */}
      <Redirect />
      <Tabmenu />
      <TodayIncidentTab />
      <div className="w-full flex overflow-hidden relative">
        <Section1 />
        <Section2 />
        <Overlay />
      </div>
    </div>
  );
}
