import React from "react";
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "SYMBOLS":
      return { ...state, symbols: action.payload };
    case "TWEETS":
      return { ...state, tweets: action.payload };
    case "TWEET_SUMMARY":
      return { ...state, tweetSummary: action.payload };
    case "NEWS":
      return { ...state, news: action.payload };
    case "NEWS_SUMMARY":
      return { ...state, newsSummary: action.payload };
    case "SETTINGS":
      return { ...state, settings: action.payload };
    case "SELECTION":
      return { ...state, selected: action.payload };
    case "MEDIA":
      return { ...state, media: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    symbols: [],
    settings: {},
    tweets: {},
    tweetSummary: {},
    news: {},
    newsSummary: {},
    selected: "",
    media: "",
    studies: ['STUDYTHREEBARSCORE'],
    studyResults: []
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, registerUser };

async function loginAuthenticate(userEmail, password) {
};


// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    axios
      .post(process.env.REACT_APP_SERVER_LOGIN || 'http://localhost:1337/auth/local', {
        identifier: login,
        password: password,
      })
      .then(response => {
        // Handle success.
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        localStorage.setItem('id_token', response.data.jwt)
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user })

        history.push('/app/dashboard')
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });

    // setTimeout(() => {
    //   localStorage.setItem('id_token', 1)
    //   setError(null)
    //   setIsLoading(false)
    //   dispatch({ type: 'LOGIN_SUCCESS' })

    //   history.push('/app/dashboard')
    // }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function registerUser(dispatch, name, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  if (!!name && !!login && !!password) {
    axios
      .post(process.env.REACT_APP_SERVER_REGISTER || 'http://localhost:1337/auth/local/register', {
        username: name,
        email: login,
        password: password,
      })
      .then(response => {
        // Handle success.
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'REGISTRATION_SUCCESS', payload: response.data.user })
        history.push('/app/dashboard')
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  } else {
    dispatch({ type: "REGISTRATION_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
