const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name:1})
    .populate('comments', {_id: 1, content:1})

  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = validateBlogParams(request.body)
    if(body === null) {
      return(response.status(400).end())
    } else {
      const blog = new Blog(body)

      if (blog.likes === undefined || blog.likes === '') {
        blog.likes = 0
      }

      const user = await User.findById(decodedToken.id)
      blog.user = user._id

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(formatBlog(savedBlog))
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //one should validate params here
    const body = request.body

    if(body === null) {
      return(response.status(400).end())
    }

    const comment = new Comment(body)
    const blog = await Blog.findById(request.params.id)
    comment.blog = blog._id
    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {username: 1, name:1}).populate('comments', {_id: 1, content:1})

    response.status(201).json(formatBlog(updatedBlog))

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === decodedToken.id ) {
      await Blog.remove(blog)
      return response.status(204).end()
    } else {
      return response.status(401).json({error:'not authorized to delete the blog'}).send()
    }
  } catch (ex) {
    console.log('something went wrong again')
    return response.status(401).send({ error: `id does not exist ${ex}` })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = validateBlogParams(request.body)
    if (body === null) {
      response.status(400).send({error: 'bad params given'})
    } else {
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user,
        comments: body.comments
      }

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {username: 1, name:1}).populate('comments', {_id: 1, content:1})
      response.json(formatBlog(updatedBlog))
    }
  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'id does not exist' })
  }
})

const validateBlogParams = (body) => {

  if (body.likes === undefined) {
    body.likes = 0
  }

  if (body.title === undefined || body.url === undefined) {
    return null
  } else {
    return body
  }
}

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    id: blog._id,
    user: blog.user,
    comments: blog.comments
  }
}

module.exports = blogsRouter
