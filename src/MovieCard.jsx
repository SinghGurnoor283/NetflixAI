import React from 'react';
import { IMG_CDN_URL } from './utils/constants';

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-32 snap-start md:w-40 h-48 md:h-60 transform transition-transform duration-300 hover:scale-120">
      <img
        className="rounded-md w-full h-full object-cover"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Poster"
        loading="eager"
        width="160" 
        height="240" // matches md:h-60
      />
    </div>
  );
};

export default MovieCard;