type AccidentReport = {
  id: number;
  accidentType: string;
  location: string;
  contactNo: string;
  reportedTime: string;
  status: 'trash' | 'all_clear' | 'cancelled' | 'on_move'|'active';
};

type LocationT = {lat: number, lng: number};


type Incident = {
  incident_id: number;
  map_link: string | null;
  picture: string | null;
  icon_url: string;
  service_name: string;
  service_id: number;
  status: 'trash' | 'all_clear' | 'cancelled' | 'on_move' | 'active';
  verbal_time: string;
  location: LocationT;
  timestamp: string; // ISO 8601 date string
  message: string;
  contact_no: string;
  video: string | null;
  service_changed: boolean;
  before_picture: string | null;
  after_picture: string | null;
  cancelled_picture: string | null;
};

type IncidentTemp = {
  service_name: 'Neither';
  incident_id: '2';
};
