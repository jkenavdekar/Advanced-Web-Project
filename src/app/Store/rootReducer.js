import { combineReducers } from 'redux';
import authReducer from '../../features/authentication/authReducer';
import eventReducer from '../../features/events/eventReducer';
import { testReducer } from '../../features/SandBox/testReducer';
import modalReducer from '../common/modals/modalReducer';

const rootReducer = combineReducers({

    event: eventReducer,
    test: testReducer,
    modals: modalReducer,
    auth: authReducer
})

export default rootReducer;