import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState([]);
    const [page, setPage] = useState(1);

    if (sessionUser) return <Redirect to="/" />;

    const handlePage1Submit = (e) => {
        e.preventDefault();
        setPage(2);
      }

    const handlePage2Submit = (e) => {
        e.preventDefault();
            return dispatch(sessionActions.signup({ email, password, firstName, lastName }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }
    const renderPage1 = () => {
        return (
          <form onSubmit={handlePage1Submit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password (6 or more characters)
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Continue</button>
          </form>
        );
      }
    
      const renderPage2 = () => {
        return (
          <form onSubmit={handlePage2Submit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <button type="submit">Agree & Join</button>
          </form>
        );
      }
    
      return (
        <div>
          {page === 1 && renderPage1()}
          {page === 2 && renderPage2()}
        </div>
      );
    }
    
    // return (
    //     <form onSubmit={handleSubmit}>
    //         <ul>
    //             {errors.map(error => <li key={error}>{error}</li>)}
    //         </ul>
    //         <label>
    //             Email
    //             <input
    //                 type="text"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //             />
    //         </label>
    //         <label>
    //             Password (6 or more characters)
    //             <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />
    //         </label>
    //         <button type="submit">Agree & Join</button>
    // </form> 

export default SignupFormPage;