import axios from 'axios' 
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)
  const API = 'http://localhost:5001'
  const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }


export function fetchCategories(){
    const URL = `${API}/categories`
    const request = axios.get(URL,{headers})
    return dispatch=>{
        request.then(({data})=>{
            dispatch({
                type:FETCH_CATEGORIES,
                payload:data
            })
        })
        
    }
}