import _ from 'lodash'
import React,{Component} from 'react'
import Options from './options'
import { Link } from 'react-router-dom'
import { voteComment } from '../actions/comments_actions'
import { connect } from 'react-redux'
const PostsComments = (props) => {
    return(
        <div>
            <ul className="list-posts">
                {_.map(props.comments,(comment)=>{
                    return(
                        <li  key={comment.id}>
                            <div className="row">
                                <div className="col-md-1">
                                    <Link to="#"><i className="material-icons" onClick={()=>props.voteComment(props.postId,comment.id,'upVote')}>keyboard_arrow_up</i></Link>
                                    <div className="mini-counts">
                                        {comment.voteScore} <br/>
                                        Votes
                                    </div>
                                    <Link to="#"><i className="material-icons" onClick={()=>props.voteComment(props.postId,comment.id,'downVote')}>keyboard_arrow_down</i></Link>
                                </div>
                                <div className="col-md-10">
                                    <strong> {comment.author} </strong><br/>
                                    {comment.body}
                                </div>
                                <div className="col-md-1">
                                    <Options
                                        path={`/posts/${props.postId}/comment/edit/${comment.id}`}
                                        comment={comment}
                                    />        
                                </div>
                            </div>
                            <hr/>
                        </li>
                )
            })}
            </ul>
        </div>
    )
}
export default connect(null,{ voteComment })(PostsComments)
