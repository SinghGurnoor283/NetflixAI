import React from 'react'
import Header from './Header'
import useNowPlaying from './Hooks/useNowPlaying'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from './Hooks/usePopularMovies'
import useUpcomingMovies from './Hooks/useUpcomingMovies'
import useTopRated from './Hooks/useTopRated'
import useTopRatedTvSeries from './Hooks/useTopRatedTvSeries'
import useTrendingTvSeries from './Hooks/useTrendingTvSeries'
import GptSearch from './GptSearch'
import {useSelector} from 'react-redux'
import Footer from './Footer'
const Browse = () => {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
  useNowPlaying()
  usePopularMovies()
  useUpcomingMovies()
  useTopRated()
  useTopRatedTvSeries()
  useTrendingTvSeries()
  return (
    <div>
      <Header/>
      {
        showGptSearch? 
        (<GptSearch/>) : 
        (<><MainContainer/>
      <SecondaryContainer/>
      </>
      )}
      <Footer/>
      
    </div>
  )
}

export default Browse
