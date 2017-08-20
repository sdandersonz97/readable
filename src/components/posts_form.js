import React,{ Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addPost, editPost, fetchPost } from '../actions/posts_actions'

class PostsForm extends Component{
    componentDidMount(){
        if(this.props.match.params.postId){
            this.props.fetchPost(this.props.match.params.postId)
        }
        
    }
    renderField(field){
        const {meta: {touched, error}} = field
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`
        return(
            <div className="form-group">
                <label>{field.label}</label>
                {field.type === "select" ? (
                    <field.type
                        className={className}
                        type="text"
                        disabled={field.onEditDisable}
                        {...field.input}
                    >
                        <option disabled></option>
                        <option value="react">React</option>
                        <option value="redux">Redux</option>
                        <option value="udacity">Udacity</option>
                    </field.type>
                ):( 
                    <field.type
                        className={className}
                        type="text"
                        disabled={field.onEditDisable}
                        {...field.input}
                    />
                )
                }
                <div className="invalid-feedback">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    onSubmit(values){
        const {postId,category}=this.props.match.params
        if(postId){
            this.props.editPost(postId,values,()=>this.props.history.push(`/categories/${category}/${postId}`))
        }
        else{
            values['id'] = Math.random().toString(36).substr(-8)
            values['timestamp'] = Date.now()
            this.props.addPost(values,()=>this.props.history.push(`/categories/${values.category}/${values.id}`))
        }
        
    }
    render(){
        const { handleSubmit } = this.props
        const disabled = this.props.match.params.postId ? true:false
        return(
            <div className="row justify-content-md-center">
                <form className="col-md-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="Title"
                        name="title"
                        type="input"
                        component={this.renderField}
                        
                    />
                    <Field 
                        label="Author"
                        name="author"
                        type="input"
                        component={this.renderField}
                        onEditDisable={disabled}
                    />
                    <Field 
                        label="Content for this Post"
                        name="body"
                        type="textarea"
                        component={this.renderField}
                    />
                    <Field 
                        label="Select a category for this Post"
                        name="category"
                        type="select"
                        component={this.renderField}
                        onEditDisable={disabled}
                    />
                    <button type="submit" style={{margin:"15px"}} className="btn btn-primary">Add a post</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        )
    }

}

function mapStateToProps({ posts }, ownProps){
    const {postId} = ownProps.match.params
    if(postId){
        return {
            initialValues:posts[postId]
        }
    }
    return {}
}
function validate(values){
    const errors={}
    const fields = ['title','author','body','category']
    fields.map( field =>{
       if(!values[field]){
           errors[field]=`Enter a ${field} `
       }
    })
    return errors
}

PostsForm = reduxForm({
    validate,
    form:"postsForm"
    
})(PostsForm)

export default connect(mapStateToProps,{addPost, editPost, fetchPost})(PostsForm)