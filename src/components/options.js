import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../actions/posts_actions'
import { deleteComment } from '../actions/comments_actions'

class Options extends Component {
    render(){
        const { post, comment, path, deletePost, deleteComment } = this.props
        const CurrentId = post? post.id:comment.id
        const onClickDelete = () => { post
            ? deletePost(this.props.match.params.postId, ()=>this.props.history.push('/'))
            : deleteComment(this.props.match.params.postId,CurrentId)}
        return(
            <div>
                <small>
                    <Link to={path}>Edit </Link>
                    | 
                    <Link onClick={()=>onClickDelete()} to="#"> Delete</Link>
                </small>
            </div>
        )
    }
}


  
export default withRouter(connect(null,{deleteComment,deletePost})(Options))