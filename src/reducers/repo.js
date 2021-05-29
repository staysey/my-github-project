import * as R from 'ramda'

import {
    FETCH_REPO_SUCCESS,
    FETCH_USER_SUCCESS,
    LOAD_MORE_REPO_SUCCESS
} from '../actionTypes'

const initialState = {
    offset: 0
}

export default (state = initialState, {type, payload}) =>{
    switch (type) {
        case FETCH_REPO_SUCCESS:
            const newValues = R.indexBy(R.prop('id'), payload)
            state.offset = state.offset+4
            return R.merge(state, newValues)
        case LOAD_MORE_REPO_SUCCESS:
            const moreValues = R.indexBy(R.prop('id'), payload)
            return R.merge(state, moreValues)
        default:
            return state
    }
}