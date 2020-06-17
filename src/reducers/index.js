import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'
import users from '../reducers/users'
import stores from '../reducers/stores'
import items from '../reducers/items'

const rootReducer = combineReducers(
    {
        sessions,
        users,
        stores,
        items
    }
)

export default rootReducer