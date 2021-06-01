import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';

export function configureStore() {
    
    const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

    //store.dispatch(verifyAuth())

    return store
}