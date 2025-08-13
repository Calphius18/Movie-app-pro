import React from 'react'; 
import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData, loading } = useFetchDetails(`/${media_type}/${data?.id}/videos`);

  // Only try to find the video after data is fetched
  const selectedVideo = videoData?.results?.find(
    vid => vid?.type === "Teaser" || vid?.type === "Trailer"
  );
  console.log("videoData", videoData)
  return (
    <section className="fixed bg-neutral-700/50 inset-0 z-20 flex justify-center items-center">
      <div className="bg-black w-full max-h-[60vh] max-w-screen-lg aspect-video rounded relative">
        <button 
          onClick={close} 
          className="absolute top-2 right-2 text-white text-2xl"
        >
          <IoClose />
        </button>
        {!loading && selectedVideo ? (
          <iframe 
            src={`https://www.youtube.com/embed/${selectedVideo.key}`} 
            className="w-full h-full"
            title={selectedVideo.name || "Video"}
            allowFullScreen
          />
        ) : !loading && !selectedVideo ? (
          <p className="text-white flex justify-center items-center h-full">
            No teaser or trailer available.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default VideoPlay;
