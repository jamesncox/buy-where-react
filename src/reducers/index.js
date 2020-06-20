import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'
import users from '../reducers/users'
import stores from '../reducers/stores'
import items from '../reducers/items'
import errors from '../reducers/errors'

const rootReducer = combineReducers(
    {
        sessions,
        users,
        stores,
        items,
        errors
    }
)

export default rootReducer