

export const mapData = [1, 2, 3, 4];

export const accidentReports: Incident[] = [];

export const statusColors = {
  active: 'orange',
  on_move: 'blue',
  all_clear: 'green',
  cancelled: 'red',
  trash: 'purple',
};

export const incidentTypeMappingData = {
  Janku: 24,
  Rally: 23,
  'Loose Cattle': 22,
  'Flood and Landslide': 21,
  'Public Land Occupancy': 20,
  'Black Market': 19,
  'Needy People': 18,
  Disaster: 17,
  'Road Digging': 16,
  'Non-permitted Advertisement': 15,
  'Street Light': 14,
  Footpath: 13,
  'Plant Related Issues': 12,
  'Heritage Protection': 11,
  'Education Issue': 10,
  'Sexual Violence': 9,
  'Non-permitted Structure': 8,
  'Non-permitted Parking': 7,
  Garbage: 6,
  'Mortuary Transport': 5,
  Sewage: 4,
  Ambulance: 3,
  Firefighter: 2,
};

export const getIncidentIdFromName = (name: string): string => {
  return incidentTypeMappingData[name];
};

export const incidentTypeData = [
  'Janku',
  'Rally',
  'Loose Cattle',
  'Flood and Landslide',
  'Public Land Occupancy',
  'Black Market',
  'Needy People',
  'Disaster',
  'Road Digging',
  'Non-permitted Advertisement',
  'Street Light',
  'Footpath',
  'Plant Related Issues',
  'Heritage Protection',
  'Education Issue',
  'Sexual Violence',
  'Non-permitted Structure',
  'Non-permitted Parking',
  'Garbage',
  'Mortuary Transport',
  'Sewage',
  'Ambulance',
  'Firefighter',
];

export const statusData = [
  'trash',
  'all_clear',
  'cancelled',
  'on_move',
  'active',
];
