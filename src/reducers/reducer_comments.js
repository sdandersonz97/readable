import { FETCH_COMMENTS, ADD_COMMENT, EDIT_COMMENT, VOTE_COMMENT, DELETE_COMMENT, FETCH_COMMENT } from '../actions/comments_actions'
const INITIALSTATE={}
export default function comments (state = INITIALSTATE, action){
    const { payload } = action
    let newState=[]
    let index
    switch (action.type) {
        case FETCH_COMMENTS:
            return { ...state, [payload.id]: payload.data }
        case FETCH_COMMENT:
            return { ...state, [payload.postId]: [...state[payload.postId], payload.data ]}
        case ADD_COMMENT:
            console.log(payload)
            console.log(payload)
            return { ...state, [payload.parentId]: [...state[payload.parentId],payload]}
        case EDIT_COMMENT:
            const a = state[payload.data.parentId]
            const i = state[payload.data.parentId].findIndex((element)=>{return element.id === payload.data.id})
            a[i] = payload.data
            return { ...state, [payload.data.parentId]:[ ...a ]}
        case VOTE_COMMENT:
            newState = state[payload.id]
            index = state[payload.id].findIndex((element)=>{return element.id === payload.data.id})
            newState[index] = payload.data
            return { ...state,
                [payload.id]:[
                    ...newState
                ]
            }
        case DELETE_COMMENT:
            const filterState = state[payload.postId].filter(comment=>comment.id !== payload.commentId)
            return {...state, [payload.postId]:[...filterState]}
        default: 
            return state
        }
    }