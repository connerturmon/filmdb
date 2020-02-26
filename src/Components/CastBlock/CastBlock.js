import React, { useEffect, useState } from 'react';
import './CastBlock.scss';
import { TMDB_API_KEY } from '../../constants/keys';

const CastBlock = props => {
    const [actorDetails, setActorDetails] = useState({});

    // Fetch actor details for actor.
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${props.actor.id}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setActorDetails(providedResults);
        });
    }, [props.actor.id])

    return (
        <div className="cast-block">
            <div className="cast-block__profile-pic">
                <img alt="Actor Portrait" className="cast-block__profile-pic__img" src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`} />
            </div>
            <div className="cast-block__details">
                <h2>{props.actor.name}</h2>
                <p>{props.actor.character}</p>
            </div>
        </div>
    );
}

export default CastBlock;