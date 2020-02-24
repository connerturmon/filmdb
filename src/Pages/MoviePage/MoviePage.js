import React, { useEffect, useState } from 'react';
import './MoviePage.scss';
import { TMDB_API_KEY } from '../../constants/keys';

const MoviePage = props => {
    const [movieDetails, setMovieDetails] = useState({});

    // Fetch movie details based on the ID
    useEffect(() => {
        // ID is retrieved from the pathname by removing the
        // '/movie/' part of the path.
        // eslint-disable-next-line
        const movieid = props.location.pathname.substring(7);
        
        fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setMovieDetails(providedResults);
        });
    }, [props.location.pathname])

    return (
        <div className="movie-page">
            <div className="movie-page__backdrop-container">
                <img alt="Movie Backdrop" className="movie-page__backdrop-container__bg" src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} />
            </div>
            <img alt="Movie Poster" className="movie-page__poster" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} />
            <div className="movie-page__details">
                <h1 className="movie-page__details__title">{movieDetails.title}</h1>
                <p className="movie-page__details__overview">{movieDetails.overview}</p>
            </div>
        </div>
    );
}

export default MoviePage;