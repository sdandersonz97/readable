import _ from 'lodash'
import React,{Component} from 'react'
import { fetchPosts, votePost } from '../actions/posts_actions'
import { fetchComments } from '../actions/comments_actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class PostsIndex extends Component {
    componentDidMount(){
        this.props.fetchPosts()
    }
    renderPosts(){
        const { posts, votePost, comments } = this.props
        
        return _.map(posts, post=>{
            const { id, voteScore, title, author, category } = post
 
            return (
                <li className="list-posts-item" key={id}>
                    <div className="row">
                        <div className="col-md-1">
                            <div className="votes row justify-content-md-center">
                                <div  className="col-md-1">
                                    <Link onClick={()=>votePost(id,'upVote')} to="#"><i className="material-icons" >keyboard_arrow_up</i></Link>
                                    <div className="mini-counts">
                                        {voteScore} <br/>
                                        Votes
                                    </div>
                                    <Link onClick={()=>votePost(id,'downVote')} to="#"><i className="material-icons" >keyboard_arrow_down</i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 align-self-center">
                            <Link className="title" to={`/categories/${category}/${id}`}>{title} By: {author} </Link>
                        </div>
                        <div className="col-md-2 align-self-center">
                            {_.size(comments[id])}<br/>
                            <small>comments</small>
                        </div>
                    </div>               
                </li>
            )
        })
    }
    render(){
        return(
            <div className="container">
                <ul className="list-posts">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}
function mapStateToProps({posts, comments}){
    return { posts, comments }
}
export default connect(mapStateToProps,{fetchPosts, fetchComments, votePost})(PostsIndex)