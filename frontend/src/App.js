import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ForgotPage from './components/ForgotPage'
import ProfilePage from './components/ProfilePage';
import ExperiencePage from './components/ExperiencePage';
import './index.css';
import PostPage from './components/PostPage';

function App() {
  return (
    <>
    <Navigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/home">
          <PostPage />
        </Route>

        <Route exact path="/users/:userId">
          <ProfilePage />
        </Route>

        <Route path="/users/:userId/experiences">
          <ExperiencePage />
        </Route>

        <Route path="/forgot">
          <ForgotPage />
        </Route>

        <Route path="/login">
          <LoginFormPage />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;