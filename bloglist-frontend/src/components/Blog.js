import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class Blog extends React.Component {


  static propTypes = {
//    removeHandler: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      minimize: true
      /*,

      isByLoggedUser: props.isByLoggedUser
    */
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
      <div className='blog-info' style={blogStyle} onClick={this.showMoreDetails}>
        <div className='mini-info'>
          {this.props.blog.title} by {this.props.blog.author}
          {this.state.minimize ? '' : this.details}
        </div>
        <div className='detail-info' style={hideDetails}>
          {this.props.blog.url} <br/>
          likes: {this.props.blog.likes} <br/>
          added by {this.props.blog.user.name ? this.props.blog.user.name : `a user ${this.props.blog.user.username}`}<br/>
          <button onClick={this.props.likeHandler}>like</button> &nbsp; &nbsp; <button onClick={this.props.removeHandler}>remove</button>
        </div>
      </div>
    )}

//{this.state.isByLoggedUser ? <button onClick={this.state.removeHandler}>Delete</button> : ''}
  showMoreDetails = () => {
    this.setState({minimize: !this.state.minimize})
  }

}



export default connect(
  null
)(Blog)
