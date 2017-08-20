import _ from 'lodash'
import React,{Component} from 'react'
import Options from '../components/options'
import NavOrderTab from '../components/nav_order_tab'
import { Link, withRouter } from 'react-router-dom'
import { voteComment, fetchComments} from '../actions/comments_actions'
import { orderByTime, orderByVotes } from '../actions/sorts_actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CSSTransitionGroup } from 'react-transition-group'
class PostsComments extends Component {
    componentDidMount(){
        fetchComments(this.props.match.params.postId)
    }
    renderVotes(id,voteScore){
        const { voteComment } = this.props
        return(
            <div className="col-md-1">
                <Link to="#"><i className="material-icons" onClick={()=>voteComment(this.props.match.params.postId,id,'upVote')}>keyboard_arrow_up</i></Link>
                <div className="mini-counts">
                    {voteScore} <br/>
                    Votes
                </div>
                <Link to="#"><i className="material-icons" onClick={()=>voteComment(this.props.match.params.postId,id,'downVote')}>keyboard_arrow_down</i></Link>
            </div>
        ) 
    }
    render(){
        const { sorts, comments, orderByTime, orderByVotes } = this.props
        const sort = sorts.order === 'byVotes' ? _.sortBy(comments,(comment)=>-comment.voteScore) : _.sortBy(comments,(comment)=>-comment.timeStamp)
        return(
            <div>
                 <p className="h5">{_.size(comments)} Comments</p>
                 <hr/>
                <NavOrderTab
                    onClickOrderByTime={orderByTime}
                    onClickOrderByVotes={orderByVotes}
                    element='comments'
                />
               
                <ul className="list-posts">
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {_.map(sort,(comment)=>{
                            return(
                                <li  key={comment.id}>
                                    <div className="row">
                                        {this.renderVotes(comment.id, comment.voteScore)}
                                        <div className="col-md-10">
                                            <strong> {comment.author} </strong><br/>
                                            {comment.body}
                                        </div>
                                        <div className="col-md-1">
                                            <Options
                                                path={`/categories/${this.props.match.params.category}/posts/${this.props.match.params.postId}/comment/edit/${comment.id}`}
                                                comment={comment}
                                            />        
                                        </div>
                                    </div>
                                    <hr/>
                                </li>
                            )
                        })}
                    </CSSTransitionGroup>
                </ul>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        voteComment,  
        fetchComments, 
        orderByTime, 
        orderByVotes
    },dispatch)
}
function mapStateToProps({comments, sorts},ownProps){
    return {
        comments: comments[ownProps.match.params.postId],
        sorts:sorts.comments
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostsComments))
