import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './profile';
import sessionReducer from './session';
import { experienceReducer } from './experience';
import { educationReducer } from './education';
import searchReducer from './search';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  search: searchReducer,
  experiences: experienceReducer,
  educations: educationReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  };

  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;