import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      minimize: true,
      removeHandler: props.removeHandler
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      width: 300
    }

    const hideDetails = { display: this.state.minimize ? 'none' : '' }

    return(
      <div style={blogStyle}>
        <div onClick={this.showMoreDetails}>
          {this.state.blog.title} by {this.state.blog.author}
          {this.state.minimize ? '' : this.details}
        </div>
        <div style={hideDetails}>
          {this.state.blog.url} <br/>
          likes: {this.state.blog.likes} <button onClick={this.addLike}>like</button> <br/>
          added by {this.state.blog.user.name ? this.state.blog.user.name : `a user ${this.state.blog.user.username}`}<br/>
          {this.isBlogCreator() ? <button onClick={this.state.removeHandler}>Delete</button> : ''}
        </div>
      </div>
    )}


    isBlogCreator = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return(user.username === this.state.blog.user.username)
        }

    }

  showMoreDetails = () => {
    this.setState({minimize: !this.state.minimize})
  }

  addLike = async () => {
    const updatedBlog = this.state.blog
    updatedBlog.likes = updatedBlog.likes +1
    const updated = await blogService.update(this.state.blog.id, updatedBlog)
    console.log(updated)
    this.setState({
      blog: updated
    })
  }

}

export default Blog
