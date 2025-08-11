import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="text-center bg-neutral-600/45 text-neutral-400 py-3">
      <div className='flex justify-center items-center gap-4'>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">Created By Babafemitan Fagbemi</p>
    </div>
  );
}

export default Footer