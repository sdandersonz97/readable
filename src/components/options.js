import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const Options = (props) => {
    const { post, onClickDelete, comment, path } = props
    return(
        <div className="dropdown">
            <Link className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="#">
                <i className="material-icons">settings</i>
                <span className="sr-only">Toggle Dropdown</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to={path}>Edit</Link>
                <Link className="dropdown-item" onClick={()=>onClickDelete(post.id,props.history.push('/'))} to="#">Remove</Link>
            </div>
        </div>    
    )
}


  
export default withRouter(Options)