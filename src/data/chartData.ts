import type { ChartData, ChartOptions } from 'chart.js';
import { chartsDataColor } from './temp';

// Target mostRegisteredIncidentData
export const mostRegisteredIncidentDataOptions: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false, // Hide x-axis grid lines
      },
      ticks: {
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
    y: {
      grid: {
        display: false, // Hide y-axis grid lines
      },
      ticks: {
        display: true, // Hide x-axis labels
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
  },
};
export const getMostRegisteredIncidentData = (
  labelsData = ['Ambulance', 'Damkal', 'Phohor', 'Maila', 'Chada Gai'],
  mostRegisteredData = [30, 40, 10, 50, 5],
): ChartData<'bar'> => {
  const mostRegisteredIncidentData: ChartData<'bar'> = {
    labels: labelsData, // X-axis labels
    datasets: [
      {
        label: 'Incident Type', // Dataset label
        data: mostRegisteredData, // Y-axis data points
        borderColor: '#4AB58E', // Line color
        borderWidth: 0.5, // Width of the line
        barPercentage: 0.3,

        // Filling the bottom area
        backgroundColor: '#4AB58E',
      },
    ],
  };

  return mostRegisteredIncidentData;
};

// incidentTrendData
export const getIncidentTrendData = (
  labelData = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  trendData = [30, 40, 10, 50, 15, 20, 15, 30, 21, 12, 5, 8],
): ChartData<'line'> => {
  const incidentTrendData: ChartData<'line'> = {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"], // X-axis labels
    labels: labelData, // X-axis labels
    datasets: [
      {
        label: 'Unique Customer', // Dataset label
        // data: [30, 40, 10, 50, 15,20,45,30,80,95,70,67], // Y-axis data points
        data: trendData, // Y-axis data points
        borderColor: 'rgb(60, 216, 86)', // Line color
        borderWidth: 5, // Width of the line
        pointRadius: 0,
      },
    ],
  };

  return incidentTrendData;
};
export const incidentTrendDataOptions: ChartOptions<'line'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid lines
      },
      ticks: {
        display: true, // Hide x-axis labels
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
    y: {
      grid: {
        display: false, // Hide y-axis grid lines
      },
      ticks: {
        display: true, // Hide x-axis labels
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
  },
};

//   // Status Data
export const getDoughnutData = (
  doughNutData = [12, 19, 3, 12],
): ChartData<'doughnut'> => {
  // Status Data
  const doughtnutData: ChartData<'doughnut'> = {
    labels: ['trash', 'all_clear', 'cancelled', 'on_move', 'active'],
    datasets: [
      {
        label: '',
        data: doughNutData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgb(106, 90, 205)',
          'rgba(255, 206, 86, 0.8)',
          'rgb(60, 179, 113)',
          'rgb(95, 90, 205)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgb(106, 90, 205)',
          'rgba(255, 206, 86, 1)',
          'rgb(60, 179, 113,1)',
          'rgb(95, 90, 205)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return doughtnutData;
};

export const doughtnutOptions: ChartOptions<'doughnut'> = {
  responsive: true, // Enable responsiveness
  aspectRatio: 1.2,
  cutout: '70%', // Reduce inner hole size (default is 50%)
  plugins: {
    legend: {
      display: true, // Hide legend labels
      labels: {
        color: chartsDataColor, // Legend text color
        usePointStyle: true, // Ensures round color indicators
        boxWidth: 20, // Adjusts legend box size
      },
    },
    tooltip: {
      enabled: true, // Hide tooltips
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false, // Hide x-axis labels
        color: chartsDataColor, // Color of y-axis labels
      },
      border: {
        color: chartsDataColor,
      },
    },
  },
};

//-----------------------------------------------------------------------------------------------------------------------------------------//

// By default data will be selected of 6 month
// const trendData = {
//   xAxis: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sept',
//     'Oct',
//     'Nov',
//     'Dec',
//   ],
//   yAxis: [30, 40, 10, 50, 15, 20, 15, 30, 21, 12, 5, 8],
// };

// //-----------------------------------------------------------------------------------------------------------------------------------------//

// const statusData = [12, 19, 3, 12];

// -----------------------------------------------------------------------------------------------------------------------------------------//

// // Most Registered Incident Type
// const mostRegisteredIncident = {
//   xAxis: ['Ambulance', 'Damkal', 'Phohor', 'Maila', 'Chada Gai'],
//   yAxis: [30, 40, 10, 50, 5],
// };

export const fakeIncident: Incident = {
  incident_id: 101,
  map_link: 'https://maps.google.com/?q=27.7172,85.3240',
  picture: 'https://example.com/incident.jpg',
  icon_url: 'https://example.com/icon.png',
  service_name: 'Fire Department',
  service_id: 1,
  status: 'on_move',
  verbal_time: '10 minutes ago',
  location: { lat: 27.7172, lng: 85.324 },
  timestamp: new Date().toISOString(),
  message: 'Fire outbreak reported near the market area.',
  contact_no: '+977-9812345678',
  video: 'https://example.com/incident.mp4',
  service_changed: false,
  before_picture: 'https://example.com/before.jpg',
  after_picture: 'https://example.com/after.jpg',
  cancelled_picture: null,
};

console.log(fakeIncident);
