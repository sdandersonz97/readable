import axios from 'axios'
export const ADD_COMMENT='ADD_COMMENT'
export const DELETE_COMMENT='DELETE_COMMENT'
export const FETCH_COMMENTS='FETCH_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)
  const API = 'http://localhost:5001'
  const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }

export function  fetchComments(id){
    const URL = `${API}/posts/${id}/comments`
    const request = axios.get(URL,{headers})
    return dispatch =>{
        request.then(({data})=>{
            dispatch({
                type:FETCH_COMMENTS,
                payload:{
                    data,
                    id
                }
            })
        })
    }
        
}
export function addComment(id,values,callback){
    const URL = `${API}/comments`
    values['parentId'] = id
    values['id'] = Math.random().toString(36).substr(-8)
    values['timestamp'] = Date.now()
    const request = axios.post(URL,values,{headers})
    return dispatch =>{
        request.then(({data})=>{
            dispatch({
                type:ADD_COMMENT,
                payload:{
                    data,
                    id
                }
            })
        }).then(()=>callback())
    }
}

export function editComment(postId,commentId,values,callback){
    const URL = `${API}/comments/${commentId}`
    values['timestamp'] = Date.now()
    const request = axios.put(URL,values,{headers})
    return dispatch => {
        request.then(({data})=>{
            dispatch({
                type:EDIT_COMMENT,
                payload:{
                    data,
                    postId
                }
            })
        }).then(()=>callback())
    }
}


export function voteComment(id,commentId,option){
    const URL = `${API}/comments/${commentId}`
    const request = axios.post(URL,{option},{headers})
    return dispatch =>{
        request.then(({data})=>{
            dispatch({
                type:VOTE_COMMENT,
                payload:{
                    data,
                    id
                }
            })
        })
    }
}

export function deleteComment(postId,commentId){
    const URL = `${API}/comments/${commentId}`
    const request = axios.delete(URL,{headers})
    return dispatch => {
        request.then(()=>{
            dispatch({
                type:DELETE_COMMENT,
                payload:{
                    postId,
                    commentId
                }
            })
        })
    }
}