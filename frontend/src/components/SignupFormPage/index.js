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
    const [headline, setHeadline] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);

    if (sessionUser) return <Redirect to="/" />;

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
    }

    const handlePage1Submit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{6,}$/;
        const emailError = document.getElementById('signUpEmail');
        const passwordError = document.getElementById('signUpPassword');

        if (email === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: "Please enter your email address."
        }));
        emailError.style.borderColor = 'rgb(201, 20, 20)';
    } 
        
        else if (!emailRegex.test(email)) {
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
        setPage(3);
    }

    const handlePage3Submit = (e) => {
        e.preventDefault();
            return dispatch(sessionActions.signup({ email, password, firstName, lastName, headline, location }))
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
                    className='credentials-input'
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
                    className='credentials-input'
                />
                {errors.password && <div className='signUpError'>{errors.password}</div>}

                <p id='terms'>By clicking Agree & Join, you have read the 
                LinkedUp <a target='_blank' rel='noreferrer' href='https://github.com/kchannn13/LinkedUp/blob/main/README.md'>README</a>
                , <a target='_blank' rel='noreferrer' href='https://github.com/kchannn13/LinkedUp/wiki'>Wiki Page</a>, 
                and <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/'>My LinkedIn</a>.</p>
  
                <button type="submit" className='signUpSubmit' onClick={handlePage1Submit}>Agree & Join</button>

                <div className="divider-container" id='signup-divider'>
                    <div className="divider-item"></div>
                    <div className="divider-text">or</div>
                    <div className="divider-item"></div>
                </div>
                
                <button type="submit" className='signUpSubmit' id='signUpGoogle' onClick={demoLogin}> Continue as Demo</button>
                <p id='hasAcc'>Already on LinkedUp? <NavLink to="/login" id='hasAccSignIn'>Sign in</NavLink></p>
            </form>
            <p id='businessPage'>Looking to create a page for a business? <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/'>Get help</a></p>
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

                <button type="submit" className='signUpSubmit' id='signUpContinue' onClick={handlePage2Submit}>Continue</button>
            </form>
        </div>
        );
      }

      const renderPage3 = () => {
        return (
        <div>
            <form onSubmit={handlePage3Submit} className='subSignUpPage' id='signUpPage2'>
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label>
                Headline
                </label>
                <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    required
                />

                <label>
                Location
                </label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <button type="submit" className='signUpSubmit' id='signUpContinue' onClick={handlePage3Submit}>Continue</button>
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
                {page === 3 && renderPage3()}
            </div>
        </div>
        </header>
      );
    }
export default SignupFormPage;