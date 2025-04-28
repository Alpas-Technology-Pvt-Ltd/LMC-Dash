'use client';
import SingleDetails from '@/components/Maps/SingleDetails';
import SingleMaps from '@/components/Maps/SingleMaps';
import Redirect from '@/components/Utility_Components/Redirect';
import { useGlobalContext } from '@/context/context';
import { LatLngExpression } from 'leaflet';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = React.use(params);
  const param1 = unwrappedParams.id[0];
  const param2 = unwrappedParams.id[1];
  const searchParams = useSearchParams();

  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lng'));
  const location: LatLngExpression = [lat, lon];

  const { todayIncidents, incidentPageData } = useGlobalContext();

  // Merge the data here

  const mergedIncidentData: Incident[] = [
    ...todayIncidents,
    ...incidentPageData,
  ];

  if (param2.includes('singleDetails')) {
    // load the singleDetail wala component
    return (
      <>
        <SingleDetails incidentData={mergedIncidentData} />
        <Redirect />
      </>
    );
  } else {
    // load the singleMap wala component
    return (
      <>
        <SingleMaps location={location} />
        <Redirect />
      </>
    );
  }
};

export default page;
