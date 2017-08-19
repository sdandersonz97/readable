import {ORDER_BY_TIME,ORDER_BY_VOTES} from '../actions/sortActions'

const initialSortState={
    posts:{
        order:'byNewest'
    },
    comments:{
        order:'byNewest'
    }
}

export default function sort(state = initialSortState,action){
    const {type,order,element} = action
    switch(type){
        case ORDER_BY_TIME:
            return{
                ...state,
                [element]:{
                    order
                }
                
            }
        case ORDER_BY_VOTES:
            return{
                ...state,
                [element]:{
                    order
                }
            }
        default:
            return state
        }
        
}