'use client';
import { useGlobalContext } from '@/context/context';
import { useEffect } from 'react';

export default function RedirectingLogicWrapper() {
  const { emerygencyRedirect, setEmergencyRedirect } = useGlobalContext();

  useEffect(() => {
    if (emerygencyRedirect) {
      setEmergencyRedirect(false);
    }
  }, [emerygencyRedirect]); // Runs only when `emerygencyRedirect` changes

  return null; // No UI needed
}

