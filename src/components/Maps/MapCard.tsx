'use client';
import { statusColors } from '@/data/incidentData';
import { glassyCSS } from '@/data/temp';
import { LocationIcon, PhoneIcon, StatusIcon, TimeIcon } from '@/svg/maps';
import { MapImageIcon } from '@/svg/utilitySVG';
import { formatDate } from '@/utils/utilitiesFn';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Button from '../Utility_Components/Button';

const shadow = 'shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]';
const MapCard = ({
  report,
  showMapImage = false,
  width,
  showInfoButton = true,
}: {
  report: Incident;
  showMapImage: boolean;
  width: string;
  showInfoButton?: boolean;
}) => {
  return (
    <div className={`${width} flex gap-3 ${glassyCSS} p-3`}>
      {/* Left */}
      <Left report={report} />

      {/* Right */}
      <div className="right flex flex-col gap-3 w-[55%]  p-1">
        <RightTop report={report} />
        <RightBottom
          showMapImage={showMapImage}
          report={report}
          showInfoButton={showInfoButton}
        />
      </div>
    </div>
  );
};

export default MapCard;

//---------------------------------------------LOCAL COMPONENTS----------------------------------------------------------------------------//

const Left = ({ report }: { report: Incident }) => {
  const locale = useLocale();

  return (
    <div className={`left h-[250px] w-[43%] p-3 rounded-md ${shadow}`}>
      <Link
        href={`/${locale}/map/1/singleMap?lat=${report.location.lat}&lng=${report.location.lng}`}
        className={`${shadow} top shadow-lg rounded-md h-full flex items-center justify-center`}
      >
        <MapImageIcon height={230} width={230} />
      </Link>
    </div>
  );
};

const RightTop = ({ report }: { report: Incident }) => {
  const date = formatDate(report.timestamp);
  return (
    <div className={`${shadow} rounded-md p-3`}>
      <div className="flex items-center justify-between gap-5">
        <h3 className="text-2xl font-semibold font-mono  mb-2 capitalize">
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
            className={`inline-block text-white text-sm font-medium px-3 rounded-md py-1`}
            style={{ background: statusColors[report.status] }}
          >
            {report.status}
          </span>
        </p>
      </div>

      {/* Location */}
      <div className={` w-full rounded`}>
        <div className="flex gap-3 items-center">
          <LocationIcon />
          <p className="">Maitighar (28.298883,29.28882)</p>
        </div>
      </div>
    </div>
  );
};

const RightBottom = ({
  showMapImage,
  report,
  showInfoButton,
}: {
  showMapImage: boolean;
  report: Incident;
  showInfoButton: boolean;
}) => {
  const locale = useLocale();
  return (
    <div className="flex gap-3 w-full">
      {/* UserName && Button */}
      <div
        className={`${shadow} rounded-md p-3 ${
          showMapImage ? 'w-[52%]' : 'w-full'
        }`}
      >
        <span className="mb-4 inline-block">
          <strong>Username : </strong>
          Pramod
        </span>

        {showInfoButton && (
          <Link href={`/${locale}/map/1/singleDetails`} className="w-full">
            <Button className="w-full py-2" variant="primary">
              More Info
            </Button>
          </Link>
        )}
      </div>

      {/* Showing location part conditionally */}
      {/* {showMapImage && (
        <div className={`${shadow} w-[45%] rounded-md`}>
          <Link
            href="/map/1/singleMap"
            className={`${shadow} top shadow-lg rounded-md block h-full`}
          >
            <img
              src={MapsImage.src}
              alt=""
              className="shadow-lg h-full object-cover rounded-md"
            />
          </Link>
        </div>
      )} */}
    </div>
  );
};
