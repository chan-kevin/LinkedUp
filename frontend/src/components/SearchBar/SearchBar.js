import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/search'
import './SearchBar.css'
import { Modal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => Object.values(state.search));
  const history = useHistory();

  useEffect (() => {
    dispatch(searchActions.fetchAllUser());
  }, [query])

  const onClose = () => {
    setShowModal(false);
    document.getElementById('searchBar').value='';
  }

  const searchUser = (e) => {
    setQuery(e.target.value);

    // dispatch(searchActions.clearResult());
    // dispatch(searchActions.searchUser(query))
    

    // if (e.target.value === ''){
    //     dispatch(searchActions.clearResult());
    // }
  };

  const checkOutProfile = (userId) => {
    history.push(`/users/${userId}`);
    document.getElementById('searchBar').value='';
    setShowModal(false);
  }

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(searchActions.searchUser(query))
//   };

const matchedWord = (word) => {
    if (query.toLowerCase().includes(word.toLowerCase())) return word
}

const unmatchedWord = (word) => {
    if (!query.toLowerCase().includes(word.toLowerCase())) return word
}

  return (
    <div className='fontFamily'>
      <div className='searchWithIcon'>
        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
        <input type="text" onChange={searchUser} onClick={() => setShowModal(true)} placeholder='Search' id='searchBar'/>
      </div>
      {showModal && (
        <div className="modal" id='searchModal'>
        <div className="modal-background" id='searchModalBackground' onClick={onClose} />
            <div className="modal-content" id='searchModalConetent'>
                {(query !== '') && (
                <ul>
                    {users.filter(user => {
                        const parts = query.toLowerCase().split(' ');
                        return parts.every(part => user.firstName.toLowerCase().includes(part) || user.lastName.toLowerCase().includes(part));
                    }).map((user, index) => (
                        <li key={index} onClick={() => checkOutProfile(user.id)} className='searchResult'>
                            <i className="fa-solid fa-magnifying-glass" id='insideSearch'></i> 
                            <div className='fullName'>
                                {user.firstName.split('').map((letter) => 
                                    <div>
                                        <p className='matched'>{matchedWord(letter)}</p> <p>{unmatchedWord(letter)}</p>
                                    </div>)} 

                                <p>&nbsp;</p>

                                {user.lastName.split('').map((letter) => 
                                    <div>
                                        <p className='matched'>{matchedWord(letter)}</p> <p>{unmatchedWord(letter)}</p>
                                    </div>)}
                            </div>
                        </li>
                    ))}
                </ul>
                )}
            </div>
      </div>
      )}
      
    </div>
  );
};

export default SearchBar;