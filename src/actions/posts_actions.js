import axios from 'axios'
import { fetchComments } from './comments_actions'
export const ADD_POST='ADD_POST'
export const DELETE_POST='DELETE_POST'
export const FETCH_POSTS='FETCH_POSTS'
export const FETCH_POST='FETCH_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export function addPost(values,callback){
    
    const URL = `${API}/posts`
    const request = axios.post(URL,values,{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:ADD_POST,
                payload:data
            })
        }).then(()=>callback())
    }
}
export function editPost(id,values,callback){
    const URL = `${API}/posts/${id}`
    const request = axios.put(URL,values,{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:EDIT_POST,
                payload:data
            })
        }).then(()=>callback())
    }

}
export function deletePost(id, callback){
    const URL = `${API}/posts/${id}`
    const request = axios.delete(URL,{headers})
    return dispatch => {
        request.then(()=>{
            dispatch({
                type:DELETE_POST,
                payload:id
            })
        }).then(()=>callback)
    }
}
export function fetchPosts(){
    const URL = `${API}/posts`
    const request = axios.get(URL,{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:FETCH_POSTS,
                payload:data
            })
            data.map(post=>{
                dispatch(fetchComments(post.id))
            })  
        }) 
    }
}
export function fetchPost(id){
    const URL = `${API}/posts/${id}`
    const request = axios.get(URL,{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:FETCH_POST,
                payload:data
            })
            dispatch(fetchComments(id))
        })
    }
}
export function votePost(id,option){
    const URL = `${API}/posts/${id}`
    const request = axios.post(URL,{option},{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:VOTE_POST,
                payload:data
            })
        })
    }
}

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
const API = 'http://localhost:5001'
const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }

