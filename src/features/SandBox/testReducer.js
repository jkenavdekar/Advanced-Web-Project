const inc = 'increment';
const dec = 'decrement';

const initialState = {
    data: 42
}

export function incAmout(amount) {

    return {
        type: inc,
        payload: amount
    }
}

export function decAmout(amount) {

    return {
        type: dec,
        payload: amount
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