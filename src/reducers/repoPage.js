
import * as R from 'ramda'
import {
    FETCH_REPO_SUCCESS,
    FETCH_USER_SUCCESS,
    LOAD_MORE_REPO_SUCCESS
} from '../actionTypes'

const initialState = {
    repoIds: [],

}

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case FETCH_REPO_SUCCESS:
            R.pluck('id', payload)
            return R.merge(state, {
                repoIds: R.pluck('id', payload)
            })
        case LOAD_MORE_REPO_SUCCESS:
            const ids = R.pluck('id', payload)
            return R.merge(state, {
                repoIds: R.concat(state.repoIds, ids)
            })
        default:
            return state
    }
}