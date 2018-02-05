import React from 'react'
import {connect} from 'react-redux'
import blogService from '../services/blogs'
import {createBlog} from './../reducers/blogReducer'
import '../index.css'

class BlogForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notification: null,
      error: null
    }
  }

  render() {
    return(
      <div>
        <h2>Add new blog</h2>
        <Notification message={this.state.notification}/>
        <Error message={this.state.error}/>

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

      this.setState({
        notification: `a new blog ${newBlog.title} by ${newBlog.author} was added`})
        setTimeout(() => {
          this.setState({notification: null})}, 3000)
      } catch (ex) {
        this.setState({
          error: `couldn't add new blog due to an error: ${ex}`})
          setTimeout(() => {
            this.setState({error: null})}, 3000)
      }
  }

}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default connect(
  null,
  {createBlog}
)(BlogForm)
