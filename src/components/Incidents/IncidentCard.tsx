'use client';
import Noimage from '@/assets/Noimage.png';
import { statusColors } from '@/data/incidentData';
import { glassyCSS } from '@/data/temp';
import { PhoneIcon, StatusIcon, TimeIcon } from '@/svg/maps';
import { MapImageIcon } from '@/svg/utilitySVG';
import { formatDate } from '@/utils/utilitiesFn';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Utility_Components/Button';

const shadow = 'shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]';

// left ko image has a fixed height
// right-bottom ko map ko logo has a fixed height

const IncidentCard = ({
  report,
  width,
}: {
  report: Incident;
  width?: string;
}) => {
  return (
    <div className={`${width} flex gap-3 ${glassyCSS} p-3`}>
      {/* Left */}
      <Left report={report} />

      {/* Right */}
      <div className="right flex flex-col gap-3 w-[55%]  p-1">
        <RightTop report={report} />
        <RightBottom report={report} />
      </div>
    </div>
  );
};

export default IncidentCard;

//---------------------------------------------LOCAL COMPONENTS----------------------------------------------------------------------------//

const Left = ({ report }: { report: Incident }) => {
  if (!report.picture)
    return (
      <div className={`left h-[250px] w-[43%] ${shadow} `}>
        {/* left-top */}
        <div
          className={`${shadow} shadow-lg h-full w-full rounded-md relative`}
        >
          <Image
            src={Noimage.src}
            alt=""
            height={250}
            width={250}
            className="h-full w-full object-cover shadow-lg rounded-md  z-10"
          />
          <div className="absolute left-0 top-0 w-full h-full bg-black/30 backdrop-blur-sm z-20 "></div>
        </div>
      </div>
    );

  return (
    <div className={`left h-[250px] w-[43%] ${shadow}`}>
      {/* left-top */}
      <div className={`${shadow} h-full w-full top shadow-lg rounded-md`}>
        <Image
          src={report.picture}
          alt=""
          height={250}
          width={250}
          className="h-full w-full object-cover shadow-lg rounded-md"
        />
      </div>
    </div>
  );
};

const RightTop = ({ report }: { report: Incident }) => {
  const date = formatDate(report.timestamp);

  return (
    <div className={`${shadow} rounded-md p-3`}>
      <div className="flex items-center justify-between gap-5">
        <h3 className="text-2xl font-semibold font-mono  mb-2 ">
          {report.service_name}
        </h3>
        <div className="flex flex-col gap-1">
          <span className="text-sm flex gap-2 items-center">
            {' '}
            <TimeIcon />
            {date}
          </span>
          <span className="text-sm flex gap-2 items-center">
            <PhoneIcon /> {report.contact_no}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex gap-3 items-center my-2">
        <StatusIcon />
        <p className="">
          <strong>Status:</strong>{' '}
          <span
            className={`inline-block text-white text-sm font-medium px-3 py-1 rounded-md  `}
            style={{ background: statusColors[report.status] }}
          >
            {report.status}
          </span>
        </p>
      </div>
    </div>
  );
};

const RightBottom = ({ report }: { report: Incident }) => {
  const locale = useLocale();
  return (
    <div className="flex gap-3">
      {/* UserName && Button */}
      <div className={`${shadow} rounded-md p-3 w-[53%] h-fit`}>
        <span className="mb-4 inline-block">
          <strong>Username : </strong>
          Pramod
        </span>
        <Link href={`/${locale}/map/1/singleDetails?id=${report.incident_id}`}>
          <Button className="w-full py-2 " variant="primary">
            More Info
          </Button>
        </Link>
      </div>
      {}

      {/* Location */}
      <div className={`${shadow} w-[45%]  rounded-md h-[100px]`}>
        <Link
          href={`/${locale}/map/1/singleMap?lat=${report.location.lat}&lng=${report.location.lng}`}
          className={`${shadow} top shadow-lg rounded-md flex items-center justify-center`}
        >
          <MapImageIcon height={100} width={130} />
        </Link>
      </div>
    </div>
  );
};
