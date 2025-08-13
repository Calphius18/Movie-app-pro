import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import star from "../assets/star.svg";
import moment from 'moment';
import Divider from '../components/Divider';
import useFetch from '../hooks/useFetch';
import ScrollCards from '../components/ScrollCards';
import VideoPlay from '../components/VideoPlay';


const DetailsPage = () => {
  const params = useParams()
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const {data : castData} = useFetchDetails(`${params?.explore}/${params?.id}/credits`)
  const {data : similarData} = useFetch(`/${params?.explore}/${params.id}/similar`)
  const {data : recommendedData} = useFetch(`/${params?.explore}/${params.id}/recommendations`)
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  console.log("data",data)
  console.log("castData",castData)

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  const runtime = data?.last_episode_to_air?.runtime ?? data?.runtime;

  const duration = runtime
    ? [
        Math.floor(runtime / 60), // Hours
        Math.round(runtime % 60), // Minutes
      ]
  : [0, 0];

  const director = castData?.crew
  ?.filter(el => el?.department === "Directing")
  .slice(0, 3)
  .map(el => el?.name)
  .join(", ") || "N/A";

const producer = castData?.crew
  ?.filter(el => el?.job === "Producer" || el?.job === "Executive Producer")
  .slice(0, 3)
  .map(el => el?.name)
  .join(", ") || "N/A";

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-3 lg:gap-10 items-start">
        <div className="relative mx-auto lg:-mt-24 mt-0 lg:mx-0 w-full max-w-[240px] aspect-[2/3] flex flex-col items-center">
          <img
            src={imageURL + data?.poster_path}
            alt="Poster"
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-4 w-full py-2 px-4 text-center bg-white text-black rounded-full font-bold text-lg hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-95"
          >
            Play Now
          </button>
        </div>

        <div className="text-center mt-16 lg:mt-0">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-500">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center justify-center gap-3 text-center">
            <p className="flex items-center">
              Rating:
              <span className="flex items-center ml-1">
                {Number(data?.vote_average).toFixed(1)}
                <img src={star} alt="Star Rating" className="w-2 h-2.5 ml-0" />
              </span>
            </p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0] > 0 && `${duration[0]}h `}
              {duration[1]}m
            </p>

            {params?.explore === "tv" && (
              <>
                <span>|</span>
                <p>
                  EPs : {data?.number_of_episodes ?? "N/A"}
                </p>
              </>
            )}
          </div>

          <Divider />

          <div>
            <h3 className="text-2xl font-bold mb-1 text-white">Overview</h3>
            <p>{data?.overview}</p>
          </div>

          <Divider />

          <div className="flex items-center text-center gap-3 my-3 justify-center">
            <p>Status : {data?.status}</p>
            <span>|</span>
            <p>
              Release Date :{" "}
              {data?.release_date || data?.first_air_date
                ? moment(data.release_date || data?.first_air_date).format(
                    "MMMM Do YYYY"
                  )
                : "N/A"}
            </p>
            <span>|</span>
            <p>Studio : {data?.production_companies[0]?.name}</p>
          </div>

          <Divider />

          <div>
            <p>
              <span className="text-white font-bold">Director</span> :{" "}
              {director}
            </p>
            <Divider />
            <p>
              <span className="text-white font-bold">Producer(s)</span> :{" "}
              {producer}
            </p>
          </div>

          <Divider />

          <h2 className="text-lg font-bold my-2">Cast :</h2>

          <div className="gap-5 grid grid-cols-[repeat(auto-fit,96px)] justify-center">
            {castData?.cast
              ?.filter((el) => el.profile_path)
              .map((starCast, index) => (
                <div key={index} className="flex flex-col items-center w-24">
                  <img
                    src={imageURL + starCast?.profile_path}
                    alt={starCast?.name}
                    className="h-24 w-24 object-cover rounded-full"
                  />
                  <p className="font-bold text-sm text-neutral-400">
                    {starCast?.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <ScrollCards
          data={similarData}
          heading={"Similar " + params.explore}
          media_type={params.explore}
        />
        <ScrollCards
          data={recommendedData}
          heading={"Recommended " + params.explore}
          media_type={params.explore}
        />
      </div>

      {playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore}/>
      )}
    </div>
  );
}

export default DetailsPage