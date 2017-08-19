import { FETCH_COMMENTS, ADD_COMMENT, EDIT_COMMENT, VOTE_COMMENT } from '../actions/comments_actions'

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
            return { ...state, [payload.id]: payload.data }
        default: 
            return state
        }
    }