import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import { useSelector } from 'react-redux';
import ScrollCards from '../components/ScrollCards';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
 
const Home = () => {

const trendingData = useSelector((state) => state.movieData.bannerData);
const {data : nowPlayingData} = useFetch("/movie/now_playing")
const {data : topRatedData} = useFetch("/movie/top_rated")
const {data : popularTvShowData} = useFetch("/tv/popular")
const {data : onAirTvShowData} = useFetch("/tv/on_the_air")

 return (
   <div>
     <BannerHome />
     <ScrollCards data={trendingData} heading={"Trending"} trending={true}/>
     <ScrollCards data={nowPlayingData} heading={"Now Playing"}/>
     <ScrollCards data={topRatedData} heading={"Top Rated Movies"}/>
     <ScrollCards data={popularTvShowData} heading={"Popular TV Shows"}/>
     <ScrollCards data={onAirTvShowData} heading={"On Air TV Shows"}/>
   </div>
 );
};
export default Home