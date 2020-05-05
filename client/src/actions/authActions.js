import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_EVENTS
} from "./types";

export const sendSubscription = (subscription,userid) => dispatch => {
  /*return fetch(`/notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify({subscription,userid}),
    headers: {
      'Content-Type': 'application/json'
    }
  })*/

  axios
    .post("/notifications/subscribe", {subscription,userid})
    .then(res => console.log(res)) // re-direct to dashboard
    .catch(err =>console.log(err)
    );

}

export const getEvents = userid => dispatch => {
  axios
    .get("/api/events/"+userid)
    .then(res => {dispatch(setEvents(res.data));}) // re-direct to login on successful register
    .catch(err =>console.log(err)
    );
};

export const deleteEvent = (eventid,history) => dispatch => {
  axios
    .delete("/api/events/"+eventid)
    .then(res => {history.go(0)})
    .catch(err =>
      console.log(err)
    );
};

export const addEvent = (newEvent, history) => dispatch => {
  axios
    .post("/api/events/add", newEvent)
    .then(res => history.push("/dashboard")) // re-direct to dashboard
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateEvent = (newEvent, history) => dispatch => {
  axios
    .post("/api/events/update/"+newEvent.id, newEvent)
    .then(res => history.push("/dashboard")) // re-direct to dashboard
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setEvents = events => {
  return {
    type: SET_EVENTS,
    payload: events
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
