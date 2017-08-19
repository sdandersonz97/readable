import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Readable</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</Link>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="#">Action</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts/new">Add a Post</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar