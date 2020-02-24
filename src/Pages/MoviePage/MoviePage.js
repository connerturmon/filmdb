import React, { useEffect, useState } from 'react';
import { TMDB_API_KEY } from '../../constants/keys';

const MoviePage = props => {
    const [movieDeatils, setMovieDetails] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.location.state.movie}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setMovieDetails(providedResults);
        });
    }, [])

    return (
        <div>
            <h1>{movieDeatils.title}</h1>
        </div>
    );
}

export default MoviePage;