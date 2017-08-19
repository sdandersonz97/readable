import {ADD_POST,DELETE_POST,FETCH_POSTS,FETCH_POST,VOTE_POST,EDIT_POST} from '../actions/posts_actions'
import _ from 'lodash'
const initialPostsState = {}

export default function posts (state = initialPostsState, action){
    const { payload } = action
    switch (action.type) {
        case ADD_POST:
            return {...state, [payload.id]:payload}
        case EDIT_POST:
            return {...state, [payload.id]:payload}
        case FETCH_POSTS:
            return _.mapKeys(payload,'id')
        case FETCH_POST:
            return  {...state, [payload.id]:payload}
        case VOTE_POST:
            return  {...state, [payload.id]:payload}
        case DELETE_POST:
            return _.omit(state, payload)
        default:
            return state
        }
    }
