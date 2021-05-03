import { SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER } from "./authConstants";
import firebase from '../../app/config/firebase';
import * as api from '../../api/index.js';

export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export function verifyAuth() {
  return function(dispatch) {
    return firebase.auth().onAuthStateChanged( user => {
        if(user) {
          dispatch(signInUser(user))
        }
        else {
          dispatch(signOutUser())
        }
    })
  }
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER
  }
}

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: SIGN_UP_USER , payload: data });
  }
  
  catch (error) {
    console.log(error);
  }
}

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: SIGN_UP_USER , payload: data });
  } 
  
  catch (error) {
    console.log(error);
  }
}