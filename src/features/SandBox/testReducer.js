import { toast } from "react-toastify";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../app/async/asyncReducer";
import { delay } from "../../app/common/util/util";

const inc = 'increment';
const dec = 'decrement';

const initialState = {
    data: 42
}


export function incAmout(amount) {

    return async function(dispatch) {

        dispatch(asyncActionStart());
        try {

            await delay(1000);
            dispatch({type: inc, payload: amount});
            dispatch(asyncActionFinish());
        } 
        
        catch (error) {

            dispatch(asyncActionError(error))
        }
    }
}

export function decAmout(amount) {

    return async function(dispatch) {

        dispatch(asyncActionStart());
        try {

            await delay(1000);
            dispatch({type: dec, payload: amount});
            dispatch(asyncActionFinish());
        } 
        
        catch (error) {

            dispatch(asyncActionError(error))
            toast.error(error);
        }
    }
}

export function testReducer(state=initialState, action) {

    switch(action.type) {

        case inc:
            return{
                ...state,
                data: state.data + action.payload,
            };

        case dec:
            return{
                ...state,
                data: state.data - action.payload,
            };

        default:
            return state;
    }
}