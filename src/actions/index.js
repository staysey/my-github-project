import {
    FETCH_REPO_START,
    FETCH_REPO_SUCCESS,
     FETCH_REPO_FAILURE,
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    LOAD_MORE_REPO_SUCCESS,
    LOAD_MORE_REPO_START,
    LOAD_MORE_REPO_FAILURE
} from '../actionTypes'

import {fetchRepoApi,fetchUserApi, loadMoreRepoApi
} from '../api'
import {getOffset, getRenderedRepoLength} from "../selectors";

export const fetchUser = us => async dispatch => {
    dispatch({
        type: FETCH_USER_START
    })

    try{
        const user = await fetchUserApi(us)
        const arr = [];
        arr.push(user);
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: arr
        })
    } catch (err) {
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: -1,
            error: true
        })
    }
}

export const fetchRepo = user => async (dispatch, getState) => {
    dispatch({
        type: FETCH_REPO_START
    })

    try{
        const repo = await fetchRepoApi(user)

        dispatch({
            type: FETCH_REPO_SUCCESS,
            payload: repo
        })
    } catch (err) {
        dispatch({
            type: FETCH_REPO_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const loadMoreRepo = user => async (dispatch, getState) => {
    const offset = getRenderedRepoLength(getState())
    dispatch({
        type: LOAD_MORE_REPO_START
    })

    try{
        const repo = await loadMoreRepoApi(user, {offset})
        dispatch({
            type: LOAD_MORE_REPO_SUCCESS,
            payload: repo
        })
    } catch (err) {
        dispatch({
            type: LOAD_MORE_REPO_FAILURE,
            payload: err,
            error: true
        })
    }
}
