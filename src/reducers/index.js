import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'

const rootReducer = combineReducers(
    {
        sessions
    }
)

export default rootReducer