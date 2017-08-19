
export const LOAD_CATEGORIES = "LOAD_CATEGORIES"


export function loadCategoriesSuccess(categories){
    return{
        type:LOAD_CATEGORIES,
        categories
    }
}
export function loadCategories(){
    return function(dispatch){
        
    }
}