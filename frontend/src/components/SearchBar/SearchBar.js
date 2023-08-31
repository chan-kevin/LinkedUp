import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/search'
import './SearchBar.css'
import { useHistory } from 'react-router-dom';
import { fetchRandomUsers } from '../../store/random';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => Object.values(state.search));
  const randomUsers = useSelector(state => Object.values(state.random));
  const history = useHistory();

  const startSearch =() => {
    setShowModal(true);
    dispatch(fetchRandomUsers());
  }

  const onClose = () => {
    setShowModal(false);
    document.getElementById('searchBar').value='';
  }

  const searchUser = (e) => {
    setQuery(e.target.value);
    dispatch(searchActions.searchAllUser(e.target.value));
  };

  const checkOutProfile = (userId) => {
    history.push(`/users/${userId}`);
    window.scrollTo(0,0);
    document.getElementById('searchBar').value='';
    setShowModal(false);
  }

const matchedWord = (word) => {
    if (word.toLowerCase().includes(query.toLowerCase())) {
      return <div><span className='matched'>{word.slice(0, query.length)}</span><span>{word.slice(query.length, word.length)}</span></div>
    } else {
      return <div><p>{word}</p></div>
    }
}

  return (
    <div className='fontFamily'>
      <div className='searchWithIcon'>
        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
        <input type="text" onChange={searchUser} onClick={startSearch} placeholder='Search' id='searchBar'/>
      </div>
      {showModal && (
        <div className="modal" id='searchModal'>
        <div className="modal-background" id='searchModalBackground' onClick={onClose} />
            <div className="modal-content" id='searchModalConetent'>
                {(query !== '') ? (
                  <ul>
                    {users.map((user, index) => (
                      <li key={index} onClick={() => checkOutProfile(user.id)} className='searchResult'>
                        <i className="fa-solid fa-magnifying-glass" id='insideSearch'></i>
                        <div className='fullName'>
                          {matchedWord(user.firstName)}
                          <p>&nbsp;</p>
                          {matchedWord(user.lastName)}
                          <div className='headlineSearch'>&nbsp; &bull; &nbsp;{user.headline}</div>
                        </div>
                        <div className='authorPic' id='searchPhoto'>
                          <img src={user.photoUrl} alt='defaultProfile' />
                        </div>
                      </li>
                    ))}
                  </ul>
                ): (
                  <ul>
                    <li className='searchResult seachTitle'> Try Searching for</li>

                    {randomUsers.map((user, index) => (
                      <li key={index} onClick={() => checkOutProfile(user.id)} className='searchResult'>
                        <i className="fa-solid fa-magnifying-glass" id='insideSearch'></i> 
                            <div className='fullName'>
                                <p>{user.firstName}</p>

                                <p>&nbsp;</p>

                                <p>{user.lastName}</p>
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