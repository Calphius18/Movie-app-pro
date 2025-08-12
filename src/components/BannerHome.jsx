import React , { useEffect, useState }from 'react'
import { useSelector } from 'react-redux';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import star from "../assets/star.svg"

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const [currentImage, setCurrentImage]= useState(0)

  const handleNext = () => {
     if(currentImage < bannerData.length -1) {
        setCurrentImage(prev => prev + 1)
     } else {

     }
  }
  const handlePrevious = () => {
     if(currentImage > 0) {
        setCurrentImage(prev => prev - 1)
     }
  }

  useEffect(() => {
    const interval = setInterval(()=> {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [bannerData, imageURL, currentImage])

  return (
    <div className="flex min-h-full max-h-95vh overflow-hidden ">
      {bannerData.map((data, index) => {
        return (
          <div key={data.id+"bannerHome"+index}className="min-w-full min-h-[450px] lg:min-h-full group overflow-hidden relative transition-all" style= {{ transform: `translateX(-${currentImage * 100}%)`}}>
            <div className="w-full h-full">
              <img
                src={imageURL + "" + data.backdrop_path}
                alt={data.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Next and Previous Image Button */}

            <div className="absolute top-0 h-full w-full items-center hidden justify-between px-5 group-hover:lg:flex">
              <button className="bg-white/70 rounded-full text-black text-2xl z-10 p-2 transition-all" onClick={handlePrevious}>
                <GrLinkPrevious />
              </button>
              <button className="bg-white/70 rounded-full text-black text-2xl z-10 p-2 transition-all" onClick={handleNext}>
                <GrLinkNext />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
              <div className="w-full absolute bottom-0 max-w-md px-2">
                <h2 className="font-bold text-3xl lg:text-4xl text-white drop-shadow-2xl">
                  {data?.title || data?.name}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p className='flex justify-between gap-2'>Rating: {Number(data.vote_average).toFixed(1)}<img src={star} alt="Star Rating"/></p>
                  <span>|</span>
                  <p>Views: {Number(data.popularity).toFixed()}</p>
                </div>
                <button className="bg-white px-4 py-2 text-black font-bold rounded-full mt-3 cursor-pointer hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-95">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BannerHome