import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';
import google from '../HomePage/google_logo.png'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);

    if (sessionUser) return <Redirect to="/" />;

    // const ele = document.getElementById('headBackground');
    // ele.style.backgroundColor = 'rgb(236, 233, 229)';

    const handlePage1Submit = (e) => {
        e.preventDefault();

        // const emailRegex = /\S+@\S+\.\S+/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const passwordRegex = /^[A-Za-z]\w{5,14}$/;
        const passwordRegex = /^.{6,}$/;
        const emailError = document.getElementById('signUpEmail');
        const passwordError = document.getElementById('signUpPassword');


        if (!emailRegex.test(email)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: "Please enter a valid email address."
          }));
          emailError.style.borderColor = 'rgb(201, 20, 20)';
        }
        if (!passwordRegex.test(password)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            password: "Password must be 6 characters or more."
          }));
          passwordError.style.borderColor = 'rgb(201, 20, 20)';
          return;
        }
        
        setErrors([])
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
                {/* <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul> */}

                <label>
                Email
                </label>
                <input
                    id='signUpEmail'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <div className='signUpError'>{errors.email}</div>}

                <label>
                Password (6 or more characters)
                </label>
                <input
                    id='signUpPassword'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <div className='signUpError'>{errors.password}</div>}

                <p id='terms'>By clicking Agree & Join, you agree to the 
                LinkedIn <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement'>User Agreement</a>
                , <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy'>Privacy Policy</a>, 
                and <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy'>Cookie Policy</a>.</p>

                <button type="submit" className='signUpSubmit'>Agree & Join</button>
                <div id='signUpBorder'></div>
                <button type="submit" className='signUpSubmit' id='signUpGoogle'> <img src={google} alt='google' id='google'/> Continue with Google</button>
                <p id='hasAcc'>Already on LinkedIn? <NavLink to="/login" id='hasAccSignIn'>Sign in</NavLink></p>
            </form>
            <p id='businessPage'>Looking to create a page for a business? <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/help/linkedin/answer/a543852?trk=registration-frontend_join-form-page-help-link'>Get help</a></p>
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
        <header id='signUpHeader'>
        <div className='fontFamily' id='pageBackground'>
            <h1 id='signUpTitle'>Make the most of your professional life</h1>
            <div className='fontFamily' id='signUpPage'>
                {page === 1 && renderPage1()}
                {page === 2 && renderPage2()}
            </div>
        </div>
        </header>
      );
    }
export default SignupFormPage;