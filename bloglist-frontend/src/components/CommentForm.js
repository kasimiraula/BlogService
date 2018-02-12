import React from 'react'
import {connect} from 'react-redux'
import {addComment} from './../reducers/blogReducer'
import {notify} from './../reducers/notificationReducer'
import '../index.css'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog : props.blog
    }
  }
  render() {
    return(
      <div style={{paddingBottom: 30}}>
        <form onSubmit={this.addNewComment}>
          <input
            type="text"
            name="comment"
          style={{marginRight:20}}/>
          <button>Comment</button>
          </form>
        </div>
    )
  }

  addNewComment = async (e) => {
    try{
      e.preventDefault()
      const newComment = {
        content: e.target.comment.value
      }
      this.props.addComment(this.state.blog, newComment)

      e.target.comment.value = ''

      const notification= `comment ${newComment.content} added`
      this.props.notify(notification, 'success', 5)
      } catch (ex) {
        const error = `couldn't add the comment due to an error: ${ex}`
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
  {addComment,
  notify}
)(CommentForm)
