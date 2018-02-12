import React from 'react'
import CommentForm from './CommentForm'

const Blog = ({ blog, likeHandler }) => {
  if(blog === undefined) {
    return <div></div>
  }
  return (

    <div>
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>likes: {blog.likes} <button onClick={likeHandler}>like</button></p>
        <p>added by {blog.user.name ? blog.user.name : `a user ${blog.user.username}`}</p>
      </div>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment._id}>{comment.content}</li>
          )}
        </ul>
        <CommentForm blog={blog}/>
      </div>
    </div>
  )
}

export default Blog
