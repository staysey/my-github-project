import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import repoPage from './repoPage'
import repo from './repo'
import user from './user'

export default history => combineReducers({
    repo,
    repoPage,
    user,
    router: connectRouter(history)
})