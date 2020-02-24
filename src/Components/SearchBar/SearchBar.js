import React, {useState} from 'react';
import './SearchBar.scss';

const SearchBar = props => {
    const [searchText, setSearchText] = useState('');
    
    const liftSearchQuery = () => {
        props.submitSearchQuery(searchText);
        setSearchText('');
    }

    return (
        <form
            className="searchbar-form"
            onSubmit={e => {
                e.preventDefault();
                liftSearchQuery();
            }}>
            <input
                className="searchbar"
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search Films"
            />
        </form>
    )
}

export default SearchBar;