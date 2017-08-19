export const ORDER_BY_TIME = 'ORDER_BY_TIME'
export const ORDER_BY_VOTES = 'ORDER_BY_VOTES'

export function orderByTime(element,order='byNewest'){
    return{
        type:ORDER_BY_TIME,
        element,
        order
    }
}
export function orderByVotes(element,order='byVotes'){
    return{
        type:ORDER_BY_VOTES,
        element,
        order
    }
}