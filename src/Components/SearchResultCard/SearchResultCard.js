import React from 'react';
import {Link} from 'react-router-dom';
import './SearchResultCard.scss';

const SearchResultCard = props => {
    return (
        <Link
            className="search-result-card"
            style={{textDecoration: 'none'}}
            to={{
                pathname: `/movie/${props.movie.id}`,
                state: {
                    movie: props.movie.id
                }
            }}
        >
            <h1 className="search-result-card__title">{props.movie.title}</h1>
            <img alt="Movie Backdrop" className="search-result-card__bg" src={`https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`} />
        </Link>
    )
}

export default SearchResultCard;