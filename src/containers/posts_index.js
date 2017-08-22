import _ from 'lodash'
import React,{Component} from 'react'
import { fetchPosts, votePost } from '../actions/posts_actions'
import { orderByTime, orderByVotes } from '../actions/sorts_actions'
import { fetchComments } from '../actions/comments_actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavOrderTab from '../components/nav_order_tab'
class PostsIndex extends Component {
    componentDidMount(){
        this.props.fetchPosts()
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
    renderPosts(){
        const { posts, comments, sorts } = this.props
        const sort = sorts.order === 'byVotes' ? _.sortBy(posts,(post)=>-post.voteScore) : _.sortBy(posts,(post)=>-post.timeStamp)
        return _.map(sort, post => {
            const { id, voteScore, title, author, category, deleted } = post
            if(deleted === false){
                return(
                    <li className="list-posts-item" key={id}>
                        <div className="row">
                            <div className="col-md-1">
                                <div className="votes row justify-content-md-center">
                                    {this.renderVotes(id, voteScore)}
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
                )}
        })
    }
    render(){
        return(
            <div className="container">
                <NavOrderTab
                    onClickOrderByTime={this.props.orderByTime}
                    onClickOrderByVotes={this.props.orderByVotes}
                    element='posts'
                />
                <ul className="list-posts">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({posts, comments,sorts},ownProps){
    if(ownProps.match.params.category){
        return {
            posts: _.omitBy(posts,(post)=>post.category !== ownProps.match.params.category),
            comments,
            sorts: sorts.posts
        }
    }
    return { posts, comments,sorts: sorts.posts }
}
export default connect(mapStateToProps,{
    fetchPosts, 
    fetchComments, 
    votePost,
    orderByTime, 
    orderByVotes
})(PostsIndex)