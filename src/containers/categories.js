import _ from 'lodash'
import React,{Component} from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categories_actions'
import { Link } from 'react-router-dom'

class categories extends Component {
    componentDidMount(){
        this.props.fetchCategories()
    }
    
    render(){
        return(
            <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</Link>
            <div className="dropdown-menu">
                {_.map(this.props.categories,(category) =>{ 
                    return <Link key={category.name} className="dropdown-item" to={`/categories/${category.path}`}>{category.name}</Link>
                })}
            </div>
            </li>
        )
    }
}

function mapStateToProps({categories}){
    return { categories }
}
export default connect(mapStateToProps,{fetchCategories})(categories)