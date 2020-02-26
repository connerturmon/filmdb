import React, { useEffect, useState } from 'react';
import './MoviePage.scss';
import { TMDB_API_KEY } from '../../constants/keys';
import CastBlock from '../../Components/CastBlock/CastBlock';

const MoviePage = props => {
    const [movieDetails, setMovieDetails] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [overviewExpanded, setOverviewExpanded] = useState(false);

    // Fetch movie details based on the ID
    useEffect(() => {
        // ID is retrieved from the pathname by removing the
        // '/movie/' part of the path.
        // eslint-disable-next-line
        const movieid = props.location.pathname.substring(7);
        
        // Fetch general movie details.
        fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setMovieDetails(providedResults);
        });

        // Fetch cast and crew.
        fetch(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${TMDB_API_KEY}`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setMovieCredits(providedResults);
        });
    }, [props.location.pathname])
 
    // Main Container ensures movieDetails is populated before
    // any kind of rendering. This prevents "undefined" errors
    // in certain functions that use movieDetails.
    if (
        Object.entries(movieDetails).length !== 0 &&
        movieDetails.constructor === Object &&
        Object.entries(movieCredits).length !== 0 &&
        movieCredits.constructor === Object
    ) {
        // Used to shorten description if it is over a certain
        // threshold. Can be expanded by pressing the "Show more"
        // button.
        let overviewTextRender = movieDetails.overview;
        if (movieDetails.overview.length > 110 && !overviewExpanded) {
            overviewTextRender = (
                <div className="movie-page__details__overview">
                    <p>{movieDetails.overview.substring(0,110)}...</p>
                    <button className="btn-show-more" onClick={() => setOverviewExpanded(true)}>Show more</button>
                </div>
            )
        } else if (overviewExpanded) {
            overviewTextRender = (
                <div className="movie-page__details__overview">
                    <p>{movieDetails.overview}</p>
                </div>
            )
        }

        // Render Rating Color
        let ratingColor = 'rating-grey';
        if (movieDetails.vote_average >= 0 && movieDetails.vote_average < 5.0)
            ratingColor = 'rating-red';
        else if (movieDetails.vote_average >= 5.0 && movieDetails.vote_average < 7.0)
            ratingColor = 'rating-yellow';
        else
            ratingColor = 'rating-green';

        // Adjust Title Size based on length.
        let titleRender = <h1 className="movie-page__details__title">{movieDetails.title}</h1>
        if (movieDetails.title.length > 17)
            titleRender = <h2 className="movie-page__details__title">{movieDetails.title}</h2>

        // Main
        return (
            <div className="movie-page">
                <div className="movie-page__backdrop-container">
                    <img alt="Movie Backdrop" className="movie-page__backdrop-container__bg" src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} />
                </div>
                <div className="movie-page__header">
                    <img alt="Movie Poster" className="movie-page__header__poster" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} />
                    <div className={`movie-page__header__score-container ${ratingColor}`}>
                        <h2 className="movie-page__header__score-container__score">{movieDetails.vote_average}</h2>
                        <p>Votes: {movieDetails.vote_count}</p>
                    </div>
                </div>
                <div className="movie-page__details">
                    {titleRender}
                    <div className="movie-page__details__subtitle">
                        <h3 className="movie-page__details__release-date">{movieDetails.release_date.substring(0,4)}</h3>
                        <p>{movieDetails.runtime}m</p>
                    </div>
                    {overviewTextRender}
                </div>

                <div className="movie-page__credits">
                    <h1>Cast</h1>
                    {movieCredits.cast.slice(0,4).map(actor => <CastBlock key={actor.id} actor={actor} />)}
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}

export default MoviePage;