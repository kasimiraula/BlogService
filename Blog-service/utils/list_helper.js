const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  const reducer = (sum, blogs) => {
    return sum + blogs.likes
  }
  return (blogs.length === 0 ? 0 : blogs.reduce(reducer, 0))
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return 0
  }

  const likes = new Map()
  blogs.map(bl => likes.set(bl.author, 0))
  blogs.map(bl => likes.set(bl.author, likes.get(bl.author) + bl.likes))

  mostlikes = findGreatestValueFromMap(likes)

  return({author: mostlikes[0],votes: mostlikes[1]})
}

const mostBlogs = (blogs) => {

  if(blogs.length === 0) {
    return 0
  }

  const blogsInTotal = new Map()

  blogs.map(bl => blogsInTotal.set(bl.author, 0))
  blogs.map(bl => blogsInTotal.set(bl.author, blogsInTotal.get(bl.author) + 1))

  mostblogs = findGreatestValueFromMap(blogsInTotal)

  return({
    author: mostblogs[0],
    blogs: mostblogs[1]
  })
}


const favouriteBlog = (blogs) => {
  let mostpopular
  let max = 0

  blogs.forEach(function(blog){
    formattedB = formatBlog(blog)

    if(max < blog.likes) {
      max = blog.likes
      mostpopular = formattedB
    }

    else if (max === blog.likes) {
      mostpopular.length > 0 ? mostpopular.concat(formattedB) : mostpopular = [mostpopular, formattedB]
    }
  })
  return(mostpopular)
}

const formatBlog = (blog) => {
   const formattedBlog = { ...blog, id: blog._id}
   delete formattedBlog._id
   delete formattedBlog.__v
   return(formattedBlog)
}

const findGreatestValueFromMap = (blogs) => {
  let max = 0
  let greatest = ''
  for (const [key, value] of blogs) {
    if(value > max) {
      max = value
      greatest = [key, value]
    }
  }
  return(greatest)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
