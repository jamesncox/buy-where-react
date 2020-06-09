import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'
import users from '../reducers/users'

const rootReducer = combineReducers(
    {
        sessions,
        users
    }
)

export default rootReducer