import React from 'react';
import './SearchResultCard.scss';

const SearchResultCard = props => {
    return (
        <div className="search-result-card">
            <h1 className="search-result-card__title">{props.movie.title}</h1>
            <img className="search-result-card__bg" src={`https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`} />
        </div>
    )
}

export default SearchResultCard;