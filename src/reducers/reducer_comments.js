import { FETCH_COMMENTS, ADD_COMMENT, EDIT_COMMENT, VOTE_COMMENT, DELETE_COMMENT } from '../actions/comments_actions'
const INITIALSTATE={}
export default function comments (state = INITIALSTATE, action){
    const { payload } = action
    switch (action.type) {
        case FETCH_COMMENTS:
            return { ...state, [payload.id]: payload.data }
        case ADD_COMMENT:
            return { ...state, [payload.id]: payload.data }
        case EDIT_COMMENT:
            return { ...state, [payload.id]: payload.data }
        case VOTE_COMMENT:
            const newState = state[payload.id]
            const index = state[payload.id].findIndex((element)=>{return element.id === payload.data.id})
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