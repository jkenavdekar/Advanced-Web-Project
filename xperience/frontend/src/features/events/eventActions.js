import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "./eventConstants";
import * as api from '../../api/index.js';


export function loadEvents() {
    return async function(dispatch) {
        try {
            const { data } = await api.fetchPosts();

            data.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            });

            const newDates = data.filter(function(e) {
                return new Date(e.date) >= new Date();
            });

            //console.log(newDates);

            const filter = localStorage.getItem("eventFilter");
            //console.log(filter);

            const user = JSON.parse(localStorage.getItem('profile'));
            //console.log(user?.result.displayName);

            switch(filter) {

                case 'isGoing':
                    const newData1 = data.filter(function(e) {
                        return e.attendees.includes(user.result.displayName);
                    });
                    console.log(newData1);
                    dispatch({ type: FETCH_EVENTS, payload: newData1 });
                    break;

                case 'isHosting':
                    const newData2 = data.filter(function(e) {
                        return e.hostedBy === user.result.displayName;
                    });
                    dispatch({ type: FETCH_EVENTS, payload: newData2 });
                    break;

                default:
                    dispatch({ type: FETCH_EVENTS, payload: newDates });
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
            const { data } = await api.updatePost(id, post);
        
            dispatch({ type: UPDATE_EVENT, payload: data });
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
            const { data } = await api.toggleEvent(id, post);
            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}



export function updatePhoto(id, post) {
    return async function(dispatch) {
        
        try {
            const { data } = await api.updatePhoto(id, {photoURL: post});

            dispatch({ type: UPDATE_EVENT, payload: data });
        } 
        catch (error) {
            console.log(error);
        }
    }
}


export function updateCount(id, post) {
    return async function(dispatch) {
        
        try {

            const { data } = await api.updateCount(id, post);

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