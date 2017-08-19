import { combineReducers} from 'redux'
import  posts  from './reducer_posts'
import  comments  from './reducer_comments'
import { reducer as formReducer }  from 'redux-form'
import categories from './reducer_categories'
import sorts from './reducer_sorts'
export default combineReducers({
  posts,
  comments,
  categories,
  sorts,
  form:formReducer
})