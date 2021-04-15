import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/authentication/authActions';

export function configureStore() {

    const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

    store.dispatch(verifyAuth())

    return store
}