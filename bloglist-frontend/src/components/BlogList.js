import React from 'react'
import {connect} from 'react-redux'
import Blog from './Blog'
import {likeBlog, removeBlog} from './../reducers/blogReducer'

class BlogList extends React.Component {

  render () {
    return(
      <div>
        <h2>Blogs</h2>
        {this.props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeHandler={this.handleLike(blog)} removeHandler={this.handleRemove(blog)}/>
        )}
      </div>
    )
  }

  handleLike = (blog) => async(e) => {
    e.preventDefault()
    this.props.likeBlog(blog)
  }

  handleRemove = (blog) => async(e) => {
    e.preventDefault()
    if (window.confirm(`Do you really want to remove ${blog.title} ?` )) {
      this.props.removeBlog(blog)
    }
  }
}
// <Blog key={blog.id} blog={blog} isByLoggedUser={user.username===blog.user.username} removeHandler={removeHandler(blog)}/>
// isByLoggedUser={user.username===blog.user.username} <br/>

const mapStateToProps = (state) => {
  return {
    blogs : state.blogs
  }
}

export default connect(
  mapStateToProps,
  {likeBlog, removeBlog}
)(BlogList)
