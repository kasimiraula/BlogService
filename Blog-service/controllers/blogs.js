const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(formatBlog))
    })
})

blogsRouter.post('/', (request, response) => {

  request = validateParams(request)
  if(request === null) {
    return(response.status(400).end())
  } else {
  const blog = new Blog(request.body)

  if (blog.likes === undefined || blog.likes === '') {
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  }
})

const validateParams = (request) => {
  const blog = request.body

  if (request.body.likes === undefined) {
    request.body.likes = 0
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    return null
  } else {
    return request
  }
}

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    id: blog._id
  }
}

module.exports = blogsRouter
