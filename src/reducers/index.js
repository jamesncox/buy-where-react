import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'
import users from '../reducers/users'
import stores from '../reducers/stores'

const rootReducer = combineReducers(
    {
        sessions,
        users,
        stores
    }
)

export default rootReducer