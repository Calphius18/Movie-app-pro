 import React from 'react'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import { useSelector } from 'react-redux';
import ScrollCards from '../components/ScrollCards';
 
 const Home = () => {

const trendingData = useSelector((state) => state.movieData.bannerData);

 return (
   <div>
     <BannerHome />
     <ScrollCards data={trendingData} heading={"Trending"}/>
   </div>
 );
};
export default Home