'use client';
import { CloseIcon } from '@/svg/utilitySVG';
import React from 'react';

type overlayProps = {
  src?: string | null;
  overlay: 'image' | 'video';
  overlayOpen: boolean;
  setOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickHandler: () => void;
};

const SingleDetailsOverlay = ({
  src = null,
  overlay,
  overlayOpen,
  clickHandler,
}: overlayProps) => {
  return (
    <>
      <div
        className={`h-full w-full absolute z-10 top-0 left-0  transition-all scale-0 ${
          overlayOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        {overlay == 'image' && (
          <img src={src!} alt="Image" className="w-full h-full" />
        )}
        {overlay == 'video' && (
          <div className="h-full w-full bg-blue-800">
            <h1 className="text-7xl">Videooooooooo</h1>
          </div>
        )}
      </div>

      {/* Hide Button */}
      <div
        className={`crossIcon absolute z-20 top-0 right-5 text-3xl text-white transition-all scale-0 ${
          overlayOpen ? 'scale-100' : 'scale-0'
        }`}
        onClick={clickHandler}
      >
        <CloseIcon />
      </div>
    </>
  );
};

export default SingleDetailsOverlay;
