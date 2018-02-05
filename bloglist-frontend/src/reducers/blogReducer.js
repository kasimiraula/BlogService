
import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('ACTION ' + action.type)
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const oldBlogs = state.filter(blog=> blog.id !== action.data.id)
      const likedBlog = action.data
      return [...oldBlogs, likedBlog]
    case 'REMOVE':
      const existingBlogs = state.filter(blog=> blog.id !== action.data.id)
      return existingBlogs
    case 'ADD_NEW':
      const newBlog = action.data
    return [...state, newBlog]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_NEW',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {...blog, likes: blog.likes+1}
    const likedBlog = await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const blogToRemove = blog
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blogToRemove
    })
  }
}

export default blogReducer
