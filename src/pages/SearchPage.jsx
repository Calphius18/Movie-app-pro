import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { useDebounce } from 'use-debounce';

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [debouncedSearchTerm] = useDebounce(location?.search?.slice(3), 1500);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params : {
        query: debouncedSearchTerm,
        page: page
      } 
    })
    setData((prev) => {
      return [
        ...prev, 
        ...response.data.results
      ]
    })
    } catch (error){
      console.log("error", error)
    }
  }

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    // Reset page and data when search term changes
    setPage(1);
    setData([]);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchData();
    }
  }, [page, debouncedSearchTerm]);


    useEffect(() => {
      window.addEventListener("scroll", handleScroll)
    }, [])

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 px-2 sticky top-20 z-20 justify-center'>
        <input 
        type="" 
        placeholder='Search Here...'
        onChange={(e) => {
          navigate(`/search?q=${e.target.value}`);
        }}
        className="px-4 py-1 text-lg rounded-full w-full h-full bg-white text-black"
        value={debouncedSearchTerm.split("%20")?.join(" ")}
        />
      </div>

      <div className="container mx-auto">
        <h1 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Results</h1>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
              {
                data.map((searchData,index)=>{
                  return(
                    <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
                  )
                })
              }
          </div>

      </div>
    </div>
  )
}

export default SearchPage