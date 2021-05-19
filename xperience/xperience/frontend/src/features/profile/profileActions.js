import { LISTEN_TO_CURRENT_USER_PROFILE } from './profleConstants';

export function listenToCurrentUserProfile(profile) {
    return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    }   
}