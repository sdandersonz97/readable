import { combineReducers} from 'redux'
import  posts  from './reducer_posts'
import  comments  from './reducer_comments'
import { reducer as formReducer }  from 'redux-form'
import categories from './categoriesReducer'
import sort from './sortReducer'
export default combineReducers({
  posts,
  comments,
  categories,
  sort,
  form:formReducer
})