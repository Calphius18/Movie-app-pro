import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import star from "../assets/star.svg"
import { Link } from 'react-router-dom';

const Card = ({data, trending, index, media_type}) => {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediaType = data.media_type ?? media_type

  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] h-80 overflow-hidden max-w-[230px] rounded block relative hover:scale-105 transition-all'>
     <img src={imageURL+data?.poster_path} alt="" />

     <div className='absolute top-2'>
      {
      trending && (
        <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/55 overflow-hidden'>
          #{index} Trending
        </div>
      )
     }
     </div>

     <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/55 p-2'>
      <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
      <div className='text-sm text-neutral-500 flex justify-between items-center'>
        <p>{moment(data?.release_date || data?.first_air_date).format("MMMM Do YY")}</p>
        <p>|</p>
        <p className='flex text-xs px-1 bg-black rounded-full text-white'>Rating : {Number(data.vote_average).toFixed(1)}<img src={star} alt="Star Rating" width={7}/></p>
      </div>
     </div>

    </Link>
  )
}

export default Card