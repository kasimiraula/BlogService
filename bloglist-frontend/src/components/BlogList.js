import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import BlogListItem from './BlogListItem'
import {likeBlog, removeBlog} from './../reducers/blogReducer'

class BlogList extends React.Component {

  render () {
    return(
      <div>
        <h2>Blogs</h2>
        <Table striped>
          <tbody>
            {this.props.blogs.map(blog =>
            <tr key={blog.id}>
              <td><BlogListItem key={blog.id} blog={blog} removeHandler={this.handleRemove(blog)}/></td>
            </tr>
            )}
          </tbody>
        </Table>
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

const orderBlogs = (blogs) => {
  const orderBlogs = blogs.sort((a,b) => b.likes - a.likes)
  return orderBlogs
}

const mapStateToProps = (state) => {
  return {
    blogs : orderBlogs(state.blogs),
    loggedUser : state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  {likeBlog, removeBlog}
)(BlogList)
