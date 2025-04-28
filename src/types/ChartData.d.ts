type doughtNutBackendDataFormat = {
  count: Number;
  title: string;
  description: string;
  endpoint: string;
};
type doughNutDataSerializedFormat = number[];

type barBackendDataFormat = {
  service_count: number;
  service_name: string;
};

type barDataSerializeFormat = {
  xAxis: string[];
  yAxis: number[];
};

type lineBackendDataFormat = Incident[];

type lineDataSerializeFormat = {
  xAxis: string[];
  yAxis: number[];
};
