import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "./eventConstants";
//import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/async/asyncReducer';
//import { fetchSampleData } from "../../app/api/mockApi";
import * as api from '../../api/index.js';


export function loadEvents() {
    return async function(dispatch) {
        try {
            const { data } = await api.fetchPosts();
        
            dispatch({ type: FETCH_EVENTS, payload: data });
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

export function createPost(post) {
    return async function(dispatch) {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE_EVENT, payload: data });
    } 
    
    catch (error) {
      console.log(error.message);
    }
  }
}

export function updatePost(id, post) {
    return async function(dispatch) {
        
        try {
            console.log(id);
            console.log(post);
            const { data } = await api.updatePost(id, post);
        
            dispatch({ type: UPDATE_EVENT, payload: post });
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function deletePost(id) {
    return async function(dispatch) {
        try {
            await api.deletePost(id);
            dispatch({ type: DELETE_EVENT, payload: id });
            console.log(id);
        } 
        catch (error) {
            console.log(error);
        }
    }

}


export function addAttendee(id, post) {
    return async function(dispatch) {
        
        try {
            console.log(id);
            console.log(post);
            const { data } = await api.addAttendee(id, post);
        
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function listenToEvents(events) {
    return{
        type: FETCH_EVENTS,
        payload: events
    }
}

export function createEvent(event) {

    return {

        type: CREATE_EVENT,
        payload: event
    }
}

export function updateEvent(event) {

    return {

        type: UPDATE_EVENT,
        payload: event
    }
}

export function deleteEvent(eventID) {

    return {

        type: DELETE_EVENT,
        payload: eventID
    }
}