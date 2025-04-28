import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

// Events to track user activity
const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
let inactivityTimer: NodeJS.Timeout;

export const useUserInactivity = (timeout = 4 * 1000) => {
  const [isInactive, setIsInactive] = useState(false);

  const resetUnwantedTimers = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
  };

  const debouncedResetTimer = debounce(() => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setIsInactive(true);
    }, timeout);
  }, 300);

  function handleActivity() {
    resetUnwantedTimers();
    debouncedResetTimer();
  }

  useEffect(() => {
    // Initial timer setup
    debouncedResetTimer();

    // Add event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(inactivityTimer);
    };
  }, [timeout]);

  return { isInactive, setIsInactive };
};
