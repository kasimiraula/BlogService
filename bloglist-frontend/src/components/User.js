import React from 'react'

const User = ({ user }) => {
  if(user === undefined) {
    return <div> no user found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
        <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
        <li key={blog.id}>{blog.title} by {blog.author}</li>
        )}
      </ul>
    </div>
  )
}
export default User
