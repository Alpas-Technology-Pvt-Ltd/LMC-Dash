'use client';
import image from '@/assets/mapImage.png';
import videoImage from '@/assets/video image.jpg';
import { fakeIncident } from '@/data/chartData';
import { mapData } from '@/data/incidentData';
import Image from 'next/image';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MapCard from './MapCard';
import SingleDetailsOverlay from './SingleDetailsOverlay';

//---------------------------------------------COMPONENT----------------------------------------------------------------------------//

const SingleDetails = ({ incidentData }: { incidentData: Incident[] }) => {
  const [overlay, setOverlay] = useState<null | string>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  // Filter the query wala ID
  let filteredData: Incident | undefined = incidentData.find(
    (report) => report.incident_id == Number(searchParams.get('id')),
  );

  // What if the user mistakenly edits the URL to "/1/singleDetails" without any query , yesto case mah <MapCard /> component will receive
  // undefined data , which will cause error , so this alternative can be used.
  if (!filteredData?.incident_id) filteredData = fakeIncident;

  const overlayClickHandler = () => {
    setOverlayOpen((prev) => !prev);
  };

  const clickHandler = (overlayType: string) => {
    if (overlayType == 'image') {
      setOverlay('image');
      overlayClickHandler();
    } else {
      setOverlay('video');
      overlayClickHandler();
    }
  };

  return (
    <div className="p-5 relative">
      {/* Top Section */}
      <div className="w-full flex gap-3 flex-col lg:flex-row">
        {/* Image */}
        <LocalImageComponent clickHandler={clickHandler} />

        {/* Video */}
        <LocalVideoComponent clickHandler={clickHandler} />
      </div>

      {/* Bottom Section */}
      <div className="text flex flex-col lg:flex-row gap-3 w-full mt-3">
        <div className="left w-full lg:w-[60%]">
          <MapCard
            report={filteredData!}
            width="w-[100%]"
            showMapImage={false}
            showInfoButton={false}
          />
        </div>
        <div className="rightw-full lg:w-[39%] border-black border-[1px]">
          USER DEVICE INFO
        </div>
      </div>

      {/* Overlay Section */}
      {overlay == 'image' && (
        <SingleDetailsOverlay
          src={image.src}
          overlay={overlay}
          overlayOpen={overlayOpen}
          setOverlayOpen={setOverlayOpen}
          clickHandler={overlayClickHandler}
        />
      )}
      {overlay == 'video' && (
        <SingleDetailsOverlay
          src={image.src}
          overlay={overlay}
          overlayOpen={overlayOpen}
          setOverlayOpen={setOverlayOpen}
          clickHandler={overlayClickHandler}
        />
      )}
    </div>
  );
};

export default SingleDetails;

//---------------------------------------------LOCAL COMPONENTS----------------------------------------------------------------------------//

type localCompType = {
  clickHandler: (overlayType: string) => void;
};

const LocalImageComponent = ({ clickHandler }: localCompType) => {
  return (
    <div className="img w-full lg:w-[49%] cursor-pointer">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        className="w-full "
        navigation
        pagination={{ clickable: true }}
      >
        {mapData.map((data, ind) => (
          <SwiperSlide key={ind}>
            <div
              className="w-full h-[500px]"
              onClick={() => {
                clickHandler('image');
              }}
            >
              <Image
                src={image.src}
                alt=""
                className="w-full h-full "
                height={500}
                width={500}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const LocalVideoComponent = ({ clickHandler }: localCompType) => {
  return (
    <div
      className="video w-full lg:w-[49%] border-black border-[1px] cursor-pointer"
      onClick={() => {
        clickHandler('video');
      }}
    >
      {/* <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video> */}
      {/* <iframe src="https://vimeo.com/1048984535" allowFullScreen /> */}
      <Image
        src={videoImage.src}
        alt=""
        className="w-full h-full "
        height={500}
        width={500}
      />
    </div>
  );
};
