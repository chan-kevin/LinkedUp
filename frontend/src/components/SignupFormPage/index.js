import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
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
        <div id='firstPage'>
            <form onSubmit={handlePage1Submit} className='subSignUpPage'>
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label>
                Email
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>
                Password (6 or more characters)
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <p id='terms'>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, 
                    and Cookie Policy.</p>

                <button type="submit" className='signUpSubmit'>Agree & Join</button>
                <p id='hasAcc'>Already on LinkedIn? <NavLink to="/login" id='hasAccSignIn'>Sign in</NavLink></p>
            </form>
        </div>
        );
      }
    
      const renderPage2 = () => {
        return (
        <div>
            <form onSubmit={handlePage2Submit} className='subSignUpPage' id='signUpPage2'>
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label>
                First Name
                </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <label>
                Last Name
                </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <button type="submit" className='signUpSubmit' id='signUpContinue'>Continue</button>
            </form>
        </div>
        );
      }
    
      return (
        <div className='fontFamily' id='signUpPage'>
            <h1 id='signUpTitle'>Make the most of your professional life</h1>
                {page === 1 && renderPage1()}
                {page === 2 && renderPage2()}
        </div>
      );
    }
export default SignupFormPage;