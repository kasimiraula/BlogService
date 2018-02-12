import React from 'react'
import {connect} from 'react-redux'
import {likeBlog} from './../reducers/blogReducer'
//import PropTypes from 'prop-types'

class BlogListItem extends React.Component {


  /*static propTypes = {
    removeHandler: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }*/

  constructor(props) {
    super(props)
    this.state = {
      minimize: true
    }

  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      marginBottom: 5
    }

    const hideDetails = { display: this.state.minimize ? 'none' : '' }

    return(
      <div className='blog-info' style={blogStyle} onClick={this.showMoreDetails}>
        <div className='mini-info'>
          <a href={`/blogs/${this.props.blog.id}`}>{this.props.blog.title} by {this.props.blog.author}</a>
          {this.state.minimize ? '' : this.details}
        </div>
        <div className='detail-info' style={hideDetails}>
          {this.props.blog.url} <br/>
          likes: {this.props.blog.likes} <br/>
          added by {this.props.blog.user.name ? this.props.blog.user.name : `a user ${this.props.blog.user.username}`}<br/>
          <button onClick={this.handleLike(this.props.blog)}>like</button>
          &nbsp; &nbsp; {this.props.blog.user.username === this.props.loggedUser.username ?
          <button onClick={this.props.removeHandler}>remove</button> :false}
        </div>
      </div>
    )}

//{this.state.isByLoggedUser ? <button onClick={this.state.removeHandler}>Delete</button> : ''}
  showMoreDetails = () => {
    this.setState({minimize: !this.state.minimize})
  }

  handleLike = (blog) => (e) => {
    this.props.likeBlog(blog)
  }

}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: state.blogs
  }
}
export default connect(
  mapStateToProps,
  {likeBlog}
)(BlogListItem)
