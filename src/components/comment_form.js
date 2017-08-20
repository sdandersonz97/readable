import React,{ Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addComment, editComment, fetchComment } from '../actions/comments_actions'

class CommentForm extends Component{
    componentDidMount(){
        const { commentId,postId } = this.props.match.params 
         if(this.props.commentId){
            this.props.fetchComment(postId,commentId)
        }
            
        
    }
    renderField(field){
        const {meta: {touched, error}} = field
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`
        return(
            <div className="form-group">
                <label>{field.label}</label>
                    <field.type
                        className={className}
                        type="text"
                        disabled={field.onEditDisabled}
                        {...field.input}
                    />
                <div className="invalid-feedback">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    onSubmit(values){
        const {commentId, postId, category}=this.props.match.params
        if(commentId){
            this.props.editComment(postId,commentId,values,()=>this.props.history.push(`/categories/${category}/${postId}`))
        }
        else{
            this.props.addComment(postId,values,()=>this.props.history.push(`/categories/${category}/${postId}`))
        }
        
    }
    render(){
        const { handleSubmit } = this.props
        const disable = this.props.match.params.commentId ? true:false
        return(
            <div className="row justify-content-md-center">
                <form className="col-md-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="Author"
                        name="author"
                        type="input"
                        component={this.renderField}
                        onEditDisabled={disable}
                    />
                    <Field 
                        label="Content for this Comment"
                        name="body"
                        type="textarea"
                        component={this.renderField}
                    />
                    <button type="submit" style={{margin:"15px"}} className="btn btn-primary">Add a Comment</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        )
    }

}

function mapStateToProps({ comments }, ownProps){
    const {commentId, postId} = ownProps.match.params
    if(commentId && comments[postId]){
        return {
            initialValues:comments[postId]
                .filter( c => c.id === commentId )
                .reduce((c,a)=>{return a})
        }
    }
    return {}
}
function validate(values){
    const errors={}
    const fields = ['author','body']
    fields.map( field =>{
       if(!values[field]){
           errors[field]=`Enter a ${field} `
       }
    })
    return errors
}

CommentForm = reduxForm({
    validate,
    form:"CommentForm"
    
})(CommentForm)

export default connect(mapStateToProps,{ addComment, editComment, fetchComment })(CommentForm)