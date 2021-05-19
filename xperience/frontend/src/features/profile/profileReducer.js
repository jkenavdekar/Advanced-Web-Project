import { LISTEN_TO_CURRENT_USER_PROFILE, UPDATE_PHOTO } from './profleConstants';

const initialState = { 
    currentUserProfile: null
}

export default function profileReducer( state = initialState, { type, payload }) {
    switch (type) {

        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: payload
            }

        case UPDATE_PHOTO:
            return {
                ...state,
                currentUserProfile: payload
            }
        
        default: {
            return state;
      }
    }
}