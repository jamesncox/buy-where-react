import { combineReducers } from 'redux'
import sessions from '../reducers/sessions'
import users from '../reducers/users'
import stores from '../reducers/stores'
import items from '../reducers/items'
import errors from '../reducers/errors'
import isOpen from '../reducers/isOpen'

const rootReducer = combineReducers(
    {
        sessions,
        users,
        stores,
        items,
        errors,
        isOpen
    }
)

export default rootReducer