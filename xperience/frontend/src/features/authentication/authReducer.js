import { SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER } from "./authConstants";

const initialState = {
    authenticated: false,
    currentUser: null,
  };


export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {

        case SIGN_IN_USER:
            return {
            ...state,
            authenticated: true,
            currentUser: {
                email: payload.email,
                photoURL: 'assets/user.png',
                uid: payload.uid,
                displayName: payload.displayName,
                providerId: payload.providerData[0].providerId
                }
            };

        case SIGN_OUT_USER:
            localStorage.clear();
            return {
            ...state,
            authenticated: false,
            currentUser: null,
            };

        case SIGN_UP_USER:
            console.log(payload);
            localStorage.setItem('profile', JSON.stringify({ ...payload }));
            return { ...state, authenticated: true, currentUser: payload };
        default:
            return state;
    }
  }