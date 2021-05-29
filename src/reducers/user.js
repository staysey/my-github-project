import * as R from 'ramda'

import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
} from '../actionTypes'

const initialState = []

export default (state = initialState, {type, payload}) =>{
    switch (type) {
        case FETCH_USER_SUCCESS:

            return payload
        case FETCH_USER_FAILURE:
            return payload
        default:
            return state
    }
}