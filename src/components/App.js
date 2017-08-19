import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PostsIndex from '../containers/posts_index'
import PostsShow from '../containers/posts_show'
import NavBar from '../components/nav_bar'
import PostsForm from '../components/posts_form'
import CommentForm from './comment_form'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/posts/new" component={PostsForm} />
          <Route path="/posts/edit/:postId" component={PostsForm} />
          <Route path="/posts/:postId/comment/new" component={CommentForm} />
          <Route path="/posts/:postId/comment/edit/:commentId" component={CommentForm} />
          <Route path="/categories/:category/:postId" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    );
  }
}

export default App;
