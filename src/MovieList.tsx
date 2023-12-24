// MovieList.tsx

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Loading from './Loading';
import NavBar from './NavBar';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieData {
  [year: string]: Movie[];
}

function MovieList(): JSX.Element {
  const [movieData, setMovieData] = useState<MovieData>({});
  const [originalMovieData, setOriginalMovieData] = useState<MovieData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const apiKey = '2dca580c2a14b55200e784d157207b4d';

  const getMovieData = async (targetYear: string): Promise<Movie[]> => {
    try {
      const yearAsNumber = parseInt(targetYear, 10);

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${yearAsNumber}&page=1&vote_count.gte=100`
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

  const fetchDataForYear = async (targetYear: string): Promise<void> => {
    setLoading(true);
    const newMovies = await getMovieData(targetYear);
    setMovieData((prevData) => ({ ...prevData, [targetYear]: newMovies }));
    setLoading(false);
  };

  const fetchOriginalData = async (): Promise<void> => {
    setLoading(true);
    const newMovies = await getMovieData(getNextYear().toString());
    setOriginalMovieData({ [getNextYear().toString()]: newMovies });
    setLoading(false);
  };

  useEffect(() => {
    const initialYear = '2012';
    fetchDataForYear(initialYear);
    fetchOriginalData(); // Fetch original data when component mounts
  }, []);

  const handleInfiniteScroll = () => {
    try {
      if (!loading && isScrollAtBottom()) {
        const nextYear = getNextYear();
        if (nextYear <= 2023) {
          fetchDataForYear(nextYear.toString());
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
    Object.keys(movieData).length > 0 ? Math.max(...Object.keys(movieData).map(Number)) + 1 : 2012;

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [loading, movieData]);

  const tabSetter: React.Dispatch<React.SetStateAction<number>> = (tabNum) => {
    setSelectedGenre(tabNum);
  };

  const filterMoviesByGenre = (moviesByYear: MovieData): MovieData => {
    const filteredMovies: MovieData = {};

    for (const [year, movies] of Object.entries(moviesByYear)) {
      filteredMovies[year] =
        selectedGenre === 0 ? movies : movies.filter((movie) => movie.genre_ids.includes(selectedGenre));
    }

    return filteredMovies;
  };

  const movieSearch = (query: string): void => {
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseQuery.trim() === '') {
      setMovieData(originalMovieData);
      return;
    }

    const filteredMoviesByYear: MovieData = {};

    Object.entries(movieData).forEach(([year, movies]) => {
      const filteredMovies = movies.filter((movie) => {
        const lowercaseTitle = movie.title.toLowerCase();
        return lowercaseTitle.includes(lowercaseQuery);
      });

      filteredMoviesByYear[year] = filteredMovies;
    });

    setMovieData(filteredMoviesByYear);
  };

  return (
    <div style={{ paddingTop: '180px' }}>
      <NavBar tabSetter={tabSetter} onSearch={movieSearch} />
      {Object.entries(filterMoviesByGenre(movieData)).map(([year, movies]) => (
        <div key={year} style={{ maxWidth: '100vw', margin: '1rem' }}>
          <h1 style={{ margin: '6rem 0 1rem 0' }}>{year}</h1>
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
