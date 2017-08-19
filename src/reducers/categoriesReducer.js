import { LOAD_CATEGORIES } from '../actions/categoriesActions'


export default function categories (state = {}, action){
    const { categories } = action
    switch (action.type) {
        case LOAD_CATEGORIES:
            return categories['categories'].reduce((categories,category,index)=>{
                categories[index]=category
                return categories
            },{})

        default:
            return state
    }
}