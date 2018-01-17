import React from 'react'
import blogService from '../services/blogs'
import '../index.css'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: [],
      title: '',
      url: '',
      adult: '',
      notification: null,
      error: null
    }
  }

  render() {
    return(
      <div>
        <Notification message={this.state.notification}/>
        <Error message={this.state.error}/>

        <form onSubmit={this.addNewBlog}>
          title:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleFormFieldChange}
          />
          <br/>
          author:
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleFormFieldChange}
          />
          <br/>
          url:
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleFormFieldChange}
          />
          <button>Add a new blog</button>
          </form>
        </div>
    )
  }

  handleFormFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addNewBlog = async (e) => {
    try{
      e.preventDefault()
      const newBlog =
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.setState({
        title: '',
        author: '',
        url: '',
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

export default BlogForm
