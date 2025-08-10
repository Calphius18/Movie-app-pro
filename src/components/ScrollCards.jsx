import React, { useRef } from 'react'
import Card from './Card';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const ScrollCards = ({data= [], heading}) => {
    const containerRef = useRef();

    const handleNext = () => {
      containerRef.current.scrollLeft += 300
    }
    const handlePrevious = () => {
      containerRef.current.scrollLeft -= 300
    }

    return (
      <div className="container mx-auto my-10 px-3">
        <h2 className="text-lx text-2xl font-bold mb-3 text-white">
          {heading}
        </h2>

        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6.5 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none"
          >
            {data.map((data, index) => {
              return (
                <Card
                  key={data.id + "heading" + index}
                  data={data}
                  index={index + 1}
                  trending={true}
                />
              );
            })}
          </div>
          <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
            <button onClick={handlePrevious} className='bg-white/70 rounded-full text-black p-1 -ml-2 z-10'>
                <GrLinkPrevious/>
            </button>
            <button onClick={handleNext} className='bg-white/70 rounded-full text-black p-1 -mr-2 z-10'>
                <GrLinkNext/>
            </button>
          </div>
        </div>
      </div>
    );
}

export default ScrollCards