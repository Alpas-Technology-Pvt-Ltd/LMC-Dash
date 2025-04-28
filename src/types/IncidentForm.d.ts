

type filterInputs = {
  fromDate:string;
  toDate:string;
  type?:string
  status?:string
}

type filterInputs2 = {
  search?:string
  type?:string
  status?:string
  date?:Date
}

type authInputs = {
  email: string;
  password: string;
};

type Inputs = {
  service: string;
  location: string;
  message:string;
  contactNo: number;
  video: string;
};
type formDataType = {
  label: string;
  registerValue:
    | 'service'
    | 'location'
    | 'contactNo'
    | 'message'
    | 'video';
  type: string;
  placeHolderVal: string | null;
  requiredVal:boolean
};
