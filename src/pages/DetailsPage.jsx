import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';

const DetailsPage = () => {
  const params = useParams()
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const {data: castData} = useFetchDetails(`${params?.explore}/${params?.id}/credits`)
  const imageURL = useSelector((state) => state.movieData.imageURL);

  console.log("data",data)
  console.log("castData",castData)

  return (
    <div>
      <div className="w-full h-[300px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0'>
        <div className='relative mx-auto lg:-mt-24 lg:ml-0 w-fit'>
          <img
            src={imageURL + data?.poster_path}
            alt="Poster"
            className="h-80 w-60 object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsPage