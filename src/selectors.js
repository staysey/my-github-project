
import * as R from 'ramda'
export const getRepoById = (state, id) => state.repo[id]

export const getRepo =  (state, ownProps) =>{
    const repo = R.map(id => getRepoById(state, id), state.repoPage.repoIds)
    return repo
}

export const getUser =  (state, ownProps) =>{
    if(state.user === -1) return -1
    if(state.user[0] === undefined) return state.user
    return state.user[0]
}

export const getRenderedRepoLength = state => R.length(state.repoPage.repoIds)

export const getOffset = (state) => {
    debugger;
    return state.repo.offset
}