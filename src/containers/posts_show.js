import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, votePost, deletePost } from '../actions/posts_actions'
import Options from '../components/options'
import PostComments from './post_comments'
import { bindActionCreators } from 'redux'
import moment from 'moment'
class PostsShow extends Component{
    componentDidMount(){
        const { postId } = this.props.match.params
        if(!this.props.post){
            this.props.fetchPost(postId)
        }
    }
    renderVotes(id, voteScore){
        const { votePost } = this.props
        return(
            <div className="col-md-1">
                <Link onClick={()=>votePost(id,'upVote')} to="#"><i className="material-icons" >keyboard_arrow_up</i></Link>
                <div className="mini-counts">
                    {voteScore} <br/>
                    Votes
                </div>
                <Link onClick={()=>votePost(id,'downVote')} to="#"><i className="material-icons" >keyboard_arrow_down</i></Link>
            </div>
        )
    }
    render(){
        const {post, deletePost} = this.props
        
        if(!post){
            return <div>Loading...</div>
        }
        let time = moment(post.timestamp).format("h:mm:ss DD-MM-YYYY ")
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
                        <div className="row">
                            {this.renderVotes(post.id,post.voteScore)}
                            <div className="col-md-11">
                                <p className="lead">{post.body}</p>
                                <p><em><small>
                                    {post.category} <br/>
                                    {post.author} 
                                    {time} <br/>                       
                                </small></em></p>
                                <Link to={`/categories/${this.props.match.params.category}/posts/${this.props.match.params.postId}/comments/add`}>Add a comment</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                <PostComments/>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPost, 
        votePost, 
        deletePost
    }, dispatch)
}
function mapStateToProps({ posts },ownProps){
    return{
        post:posts[ownProps.match.params.postId],
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostsShow)