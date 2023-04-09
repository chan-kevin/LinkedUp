import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/search'

const SearchBar = () => {
  const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const results = useSelector(state => Object.values(state.search));

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    dispatch(searchActions.clearResult());
    dispatch(searchActions.searchUser(query))

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
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={query} placeholder="Search Users" />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <ul>
          {results.map((user, index) => (
            <li key={index}>{user.firstName} {user.lastName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;