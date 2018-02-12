import React from 'react'
import {connect} from 'react-redux'
import {createBlog} from './../reducers/blogReducer'
import {notify} from './../reducers/notificationReducer'
import '../index.css'

class BlogForm extends React.Component {

  render() {
    return(
      <div>
        <h2>Add new blog</h2>

        <form onSubmit={this.addNewBlog}>
          title:
          <input
            type="text"
            name="title"
          />
          <br/>
          author:
          <input
            type="text"
            name="author"
          />
          <br/>
          url:
          <input
            type="text"
            name="url"
          />
          <br/>
          <button>Add a new blog</button>
          </form>
        </div>
    )
  }

  addNewBlog = async (e) => {
    try{
      e.preventDefault()
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value
      }

      this.props.createBlog(newBlog)

      e.target.title.value = ''
      e.target.author.value = ''
      e.target.url.value = ''

      const notification= `a new blog ${newBlog.title} by ${newBlog.author} was added`
      this.props.notify(notification, 'success', 5)
      } catch (ex) {
        const error = `couldn't add new blog due to an error: ${ex}`
        this.props.notify(error, 'error', 5)
      }

    }
  }

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  {createBlog,
  notify}
)(BlogForm)
