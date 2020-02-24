import React, {useState} from 'react';
import './Home.scss';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { TMDB_API_KEY } from '../../constants/keys';

const Home = () => {
    const [searchResults, setSearchResults] = useState({});

    const submitSearchQuery = searchQuery => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
        .then(response => {
            return response.json();
        })
        .then(providedResults => {
            console.log(providedResults);
            setSearchResults(providedResults);
        });
    }

    return (
        <div className="home">
            <div className="home__title"><h1>FilmDB</h1></div>
            <SearchBar submitSearchQuery={submitSearchQuery} />
            {Object.entries(searchResults).length !== 0 &&
            searchResults.constructor === Object &&
                <div className="search-results">
                    <ul>
                        {searchResults.results.map(result => <li>{result.title}</li>)}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Home;