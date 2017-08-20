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
            <div className="dropdown">
                <Link  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="#">
                    <i className="material-icons">settings</i>
                    <span className="sr-only">Toggle Dropdown</span>
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={path}>Edit</Link>
                    <Link className="dropdown-item" onClick={()=>onClickDelete()} to="#">Remove</Link>
                </div>
            </div>    
        )
    }
}


  
export default withRouter(connect(null,{deleteComment,deletePost})(Options))