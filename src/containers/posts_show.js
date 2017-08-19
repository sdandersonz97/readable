import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, votePost, editPost, deletePost } from '../actions/posts_actions'
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
        const {post,editPost,comments} = this.props
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
                <PostComments
                    comments={comments}
                    postId={post.id}
                />
            </div>
        )
    }
}
function mapStateToProps({posts, comments},ownProps){
    return{
        post:posts[ownProps.match.params.postId],
        comments: comments[ownProps.match.params.postId]
    }
}
export default connect(mapStateToProps,{ fetchPost, editPost, deletePost })(PostsShow)