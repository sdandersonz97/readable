import { FETCH_CATEGORIES } from '../actions/categories_actions'


export default function categories (state = [], action){
    const { payload } = action
    switch (action.type) {
        case FETCH_CATEGORIES:
            return payload.categories
        default:
            return state
    }
}