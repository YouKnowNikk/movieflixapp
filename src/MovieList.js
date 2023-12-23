import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Loading from './Loading';
import NavBar from './NavBar';

function MovieList() {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const apiKey = '2dca580c2a14b55200e784d157207b4d';
  const [selectedGenre, setSelectedGenre] = useState(0);
  const getMovieData = async (targetYear) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${targetYear}&page=1&vote_count.gte=100`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.results.slice(0, 8);
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const fetchDataForYear = async (targetYear) => {
    setLoading(true);
    const newMovies = await getMovieData(targetYear);
    setMovieData((prevData) => ({ ...prevData, [targetYear]: newMovies }));
    setLoading(false);
  };

  useEffect(() => {
    const initialYear = 2012;
    fetchDataForYear(initialYear);
  }, []);

  const handleInfiniteScroll = () => {
    try {
    
      if (!loading && isScrollAtBottom()) {
        const nextYear = getNextYear();
        if (nextYear <= 2023) {
          fetchDataForYear(nextYear);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isScrollAtBottom = () =>
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.documentElement.scrollHeight;

  const getNextYear = () =>
    Object.keys(movieData).length > 0 ? Math.max(...Object.keys(movieData)) + 1 : 2012;

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
   
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [loading, movieData]);

  const tabSetter = (val)=>{
      setSelectedGenre(val);
  }
  
  const filterMoviesByGenre = (moviesByYear) => {
    const filteredMovies = {};
  
    for (const [year, movies] of Object.entries(moviesByYear)) {
      filteredMovies[year] = selectedGenre === 0 ? movies : movies.filter((movie) => movie.genre_ids.includes(selectedGenre));
    }
  
    return filteredMovies;
  };

  return (
    <div style={{paddingTop:'180px'}}>
      <NavBar tabSetter={tabSetter}   />
      {Object.entries(filterMoviesByGenre(movieData)).map(([year, movies]) => (
        <div key={year} style={{ maxWidth: '100vw', margin: '1rem'}}>
          <h1 style={{ margin:'2rem 0 1rem 0'}}>{year}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem' }}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
      {loading && <Loading />}
    </div>
  );
}

export default MovieList;
