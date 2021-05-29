
import request from 'superagent';

import repo from './mockRepo'

export const fetchRepoApi = async (user) =>{

    const {body} = await request.get(`https://api.github.com/users/${user}/repos`)
    return body
    //return new Promise((resolve, reject)=>{
        //resolve(repo) })
}

export const fetchUserApi = async (user) =>{
    const {body} = await request.get(`https://api.github.com/users/${user}`)
    return body

}

export const loadMoreRepoApi = async (user, {offset}) =>{
    const {body} = await request.get(`https://api.github.com/users/${user}/repos?offset=${offset}`)
    return body
}