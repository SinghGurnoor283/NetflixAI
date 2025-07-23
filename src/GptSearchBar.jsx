import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import lang from './utils/languageConstants';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY, API_OPTIONS } from './utils/constants';
import { addGptMoviesResult } from './utils/GptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const placeholderList = lang[langKey].gptSearchPlaceholders;

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [langKey]);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = debounce(async () => {
    if (!searchText.current?.value) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

      const prompt = `You are an intelligent movie and web series recommendation system specifically trained on Netflix's style and catalog. Based on the following user query, suggest 5-7 highly relevant and trending Netflix-style titles. Recommendations should be similar in theme, genre, or vibe to what is asked. Return only the names of shows or movies, separated by commas. Do not explain anything or mention data limitations. User Query: ${searchText.current.value}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().split(",");
      console.log(text);
      const promiseArray = text.map((movie) => searchMovieTMDB(movie.trim()));
      const tmdbResults = await Promise.all(promiseArray);
      
      dispatch(addGptMoviesResult({ movieNames: text, movieResults: tmdbResults }));
    } catch (err) {
      console.error('Error from Gemini API:', err);
      setErrorMsg("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  }, 800);

  return (
    <div className="flex flex-col justify-center items-center py-18 px-4 bg-gradient-to-b from-black via-gray-900 to-black min-h-[200px]">
      <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <input
            ref={searchText}
            type="text"
            className="w-full p-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-600 text-black bg-white"
            placeholder={placeholderList[placeholderIndex]}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleGptSearchClick}
          className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'
          } text-white px-6 py-3 rounded-lg transition duration-300 w-full sm:w-auto`}
          disabled={loading}
        >
          {loading ? 'Finding magic...' : lang[langKey].search}
        </button>
      </div>

      {/* Loader Animation or Cool Message */}
      {loading && (
        <div className="mt-6 text-white animate-pulse text-lg">
          🍿 Summoning Netflix vibes... Hang tight!
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-6 text-red-500 font-semibold">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
