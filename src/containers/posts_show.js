import _ from 'lodash'
import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { orderByTime, orderByVotes } from '../actions/sorts_actions'
import { fetchPost, votePost, editPost, deletePost } from '../actions/posts_actions'
import { voteComment, deleteComment } from '../actions/comments_actions'
import Options from '../components/options'
import PostComments from '../components/post_comments'
class PostsShow extends Component{
    componentDidMount(){
        const { postId } = this.props.match.params
        if(!this.props.post){
            this.props.fetchPost(postId)
        }
    }
    render(){
        const {post,editPost,comments,deletePost} = this.props
        const sort = this.props.sorts.order === 'byVotes' ? _.sortBy(comments,(comment)=>-comment.voteScore) : _.sortBy(comments,(comment)=>-comment.timeStamp)
        console.log(sort)
        if(!post){
            return <div>Loading...</div>
        }
        return(
            <div className="container">
                <Link to="/"><i className="material-icons">arrow_back</i></Link>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row ">
                            <div className="col-md-10">
                                <p className="h4">{post.title}</p> 
                            </div>
                            <div className="col-md-1">
                                <Options
                                    post={post}
                                    onClickDelete={deletePost}
                                    path={`/posts/edit/${post.id}`}
                                />
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <p className="lead">{post.body}</p>
                    </div>
                    <div className="col-md-12">
                        <p><em><small>
                            {post.category} <br/>
                            {post.timestamp} <br/>
                            {post.author}                        
                       </small></em></p>
                       <Link to={`/posts/${post.id}/comment/new`}>Add a comment</Link>
                       <hr/>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" onClick={()=>this.props.orderByTime('comments')} href="#">Newest</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>this.props.orderByVotes('comments')} href="#">Votes</a>
                    </li>
                </ul>
                <PostComments
                    comments={sort}
                    postId={post.id}
                />
            </div>
        )
    }
}
function mapStateToProps({posts, comments, sorts},ownProps){
    return{
        post:posts[ownProps.match.params.postId],
        comments: comments[ownProps.match.params.postId],
        sorts: sorts.comments
    }
}
export default connect(mapStateToProps,{ fetchPost, editPost, deletePost, orderByTime, orderByVotes  })(PostsShow)