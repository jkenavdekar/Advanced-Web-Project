import { LISTEN_TO_CURRENT_USER_PROFILE, UPDATE_PHOTO } from './profleConstants';
import * as api from '../../api/index.js';

export function listenToCurrentUserProfile(profile) {
    return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    }   
}


export function addPhoto(id, user) {
    return async function(dispatch) {
        
        try {
            const { data } = await api.addPhoto(id, {photoURL: user});
            dispatch({ type: UPDATE_PHOTO, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}