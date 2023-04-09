import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/search'
import './SearchBar.css'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(state => Object.values(state.search));

  useEffect (() => {
    dispatch(searchActions.fetchAllUser());
  }, [query])

  const searchUser = (e) => {
    setQuery(e.target.value);
    // dispatch(searchActions.clearResult());
    // dispatch(searchActions.searchUser(query))
    

    if (e.target.value === ''){
        dispatch(searchActions.clearResult());
    }
  };

//   useEffect(() => {
//     dispatch(searchActions.clearResult());
//   }, [dispatch, query])
//   const uniqueResults = results.filter((item, index, self) => self.findIndex(t => t.id === item.id) === index);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch(`/api/users/search?q=${query}`)
//       .then(res => res.json())
//       .then(data => {
//         setResults(data);
//       })
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchActions.searchUser(query))
  };

  return (
    <div>
      <div className='searchWithIcon'>
        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
        <input type="text" onChange={searchUser} placeholder='Search' id='searchBar'/>
      </div>
      {query !== '' && (
        <ul>
            {users.filter(user => {
                const parts = query.toLowerCase().split(' ');
                return parts.every(part => user.firstName.toLowerCase().includes(part) || user.lastName.toLowerCase().includes(part));
            }).map((user, index) => (
                <li key={index}>{user.firstName} {user.lastName}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;