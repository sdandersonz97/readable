import React from 'react'
import { Link } from 'react-router-dom'
const NavOrderTab = (props) =>{
    return(
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link active" onClick={()=>props.onClickOrderByTime(props.element)} to="#">Newest</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={()=>props.onClickOrderByVotes(props.element)} to="#">Votes</Link>
            </li>
        </ul>
    )
}
export default NavOrderTab