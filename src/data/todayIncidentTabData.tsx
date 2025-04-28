import {
  InProgressIcon,
  PendingIcon,
  ReportIcon,
  SolvedIcon,
  TrashIcon,
} from '@/svg/dashboard';

type TodayIncidentTabDataType = {
  tabTitle: string;
  icon: React.JSX.Element;
  data: number;
  colorStyles: string;
};

export const getTodayIncidentTabData = ({
  incident_count,
  all_clear,
  active,
  on_move,
  trash,
  cancelled,
}): TodayIncidentTabDataType[] => {
  return [
    {
      tabTitle: 'incident_count',
      icon: <ReportIcon />,
      data: incident_count,
      colorStyles: '#0000FF',
    },
    {
      tabTitle: 'all_clear',
      icon: <SolvedIcon />,
      data: all_clear,
      colorStyles: '#22C55E',
    },
    {
      tabTitle: 'active',
      icon: <PendingIcon />,
      data: active,
      colorStyles: '#FFA500',
    },
    {
      tabTitle: 'on_move',
      icon: <InProgressIcon />,
      data: on_move,
      colorStyles: '#A020F0',
    },
    {
      tabTitle: 'trash',
      icon: <TrashIcon />,
      data: trash,
      colorStyles: '#FF0000',
    },
    {
      tabTitle: 'cancelled',
      icon: <TrashIcon />,
      data: cancelled,
      colorStyles: '#964B00',
    },
  ];
};
export const TodayIncidentTabData: TodayIncidentTabDataType[] = [
  {
    tabTitle: 'incident_count',
    icon: <ReportIcon />,
    data: 7,
    colorStyles: '#0000FF',
  },
  {
    tabTitle: 'all_clear',
    icon: <SolvedIcon />,
    data: 1,
    colorStyles: '#22C55E',
  },
  {
    tabTitle: 'active',
    icon: <PendingIcon />,
    data: 3,
    colorStyles: '#FFA500',
  },
  {
    tabTitle: 'on_move',
    icon: <InProgressIcon />,
    data: 2,
    colorStyles: '#A020F0',
  },
  {
    tabTitle: 'trash',
    icon: <TrashIcon />,
    data: 1,
    colorStyles: '#FF0000',
  },
  {
    tabTitle: 'cancelled',
    icon: <TrashIcon />,
    data: 1,
    colorStyles: '#964B00',
  },
];
