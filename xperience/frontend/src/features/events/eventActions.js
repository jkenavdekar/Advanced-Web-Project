import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "./eventConstants";
//import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/async/asyncReducer';
//import { fetchSampleData } from "../../app/api/mockApi";
import * as api from '../../api/index.js';


export function loadEvents() {
    return async function(dispatch) {
        try {
            const { data } = await api.fetchPosts();

            data.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });

            console.log(data);

            const filter = localStorage.getItem("eventFilter");
            console.log(filter);

            switch(filter) {

                case 'isGoing':
                    const newData1 = data.filter(function(e) {
                        return e.attendees.includes("Jenny");
                    });
                    console.log(newData1);
                    dispatch({ type: FETCH_EVENTS, payload: newData1 });
                    break;

                case 'isHosting':
                    const newData2 = data.filter(function(e) {
                        return e.hostedBy === "Jenny";
                    });
                    dispatch({ type: FETCH_EVENTS, payload: newData2 });
                    break;

                default:
                    dispatch({ type: FETCH_EVENTS, payload: data });
            }
            
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
            const { data } = await api.addAttendee(id, post);
            console.log(data);
        
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function cancelAttendee(id, post) {
    return async function(dispatch) {
        
        try {
            const { data } = await api.cancelAttendee(id, post);
        
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function addComment(id, post) {
    return async function(dispatch) {
        
        try {
            const { data } = await api.addComment(id, post);
            console.log(data);
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function toggleEvent(id, post) {
    return async function(dispatch) {
        
        try {
            console.log(post);
            const { data } = await api.toggleEvent(id, post);
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}


///////////////////////////////////////////////
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