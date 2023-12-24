import React from 'react';
import './Moviecard.css';
import rating from './Images/icons8-rating-48.png';

interface MovieCardProps {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
  };
}

function MovieCard({ movie }: MovieCardProps): JSX.Element {
  return (
    <div>
      <div key={movie.id} className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '100%', marginBottom: '4px' }}
        />
        <h5 style={{ marginTop: '-2rem', display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={rating} alt="Rating" />
          {movie.vote_average}
        </h5>
        <h4 style={{ textAlign: 'center', margin: '1rem 0 2rem -1rem' }}>{movie.title}</h4>
      </div>
    </div>
  );
}

export default MovieCard;
