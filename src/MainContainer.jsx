import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.NowPlayingMovies);
    if (movies == null) {
        console.log("nothing");
        return null;
    }
    const mainMovie = movies[5];
    const { original_title, overview, id,logoUrl } = mainMovie;
    console.log(id)
    return (
        <div className="overflow-hidden">
      <VideoBackground id={id} />
      <VideoTitle 
        movieId={id} 
        title={logoUrl?.title || original_title} 
        logoUrl={logoUrl} 
        overview={overview} 
      />
    </div>

    );
};

export default MainContainer;
