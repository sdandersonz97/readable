import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const Options = (props) => {
    const { post, onClickDelete, comment, path,postId } = props
    const CurrentId = post? post.id:comment.id
    console.log(props.match.params.postId)
    console.log(CurrentId)
    return(
        <div className="dropdown">
            <Link className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="#">
                <i className="material-icons">settings</i>
                <span className="sr-only">Toggle Dropdown</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to={path}>Edit</Link>
                <Link className="dropdown-item" onClick={()=>onClickDelete(props.match.params.postId,CurrentId,()=>props.history.push('/'))} to="#">Remove</Link>
            </div>
        </div>    
    )
}


  
export default withRouter(Options)