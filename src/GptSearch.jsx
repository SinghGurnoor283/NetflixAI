// GptSearch.js (No changes needed here for CSS responsiveness directly, but if you want the whole page to be full height, add min-h-screen here)
import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <div className="min-h-screen bg-black"> {/* Added min-h-screen and a background for the whole page */}
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch