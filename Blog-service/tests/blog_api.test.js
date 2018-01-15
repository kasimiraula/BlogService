const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { formatBlog, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require ('./test_helper')


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when GET request is made ', () => {

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('it returns all the blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const blogs = blogsInDb()
  expect(response.body[0].length).toBe(blogs.length)
})

test("the author of first note is Dijksta", async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].author).toBe('Edsger W. Dijkstra')
})
})

describe('when POST request is made ', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      _id: '5a522ba71b54a676234d17f8',
      title: 'Go Scrum yourself',
      author: 'Martin Fowler',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }

    const blogsBeforePost = await blogsInDb()

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await blogsInDb()
    const titles = blogsAfterPost.map(res => res.title)

    expect(blogsAfterPost.length).toBe(blogsBeforePost.length +1)
    expect(titles).toContain('Go Scrum yourself')
  })

  test('likes are initialized correctly ', async () => {
    const newBlog2 = {
      _id: '5a111ba00b54a676234d17f8',
      title: 'Go Scrum yourself 2',
      author: 'Martin Fowler',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }

    const blogsBeforePost = await blogsInDb()

    await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsInDatabase = await blogsInDb()

    const blogs = blogsInDatabase.filter(blog => blog.title === 'Go Scrum yourself 2')

    expect(blogs[0].likes).toBe(0)
    expect(blogsInDatabase.length).toBe(blogsBeforePost.length +1)
  })

  test('blogs with no title nor url are not added', async () => {
    const newBlog3 = {
      _id: '5a11ab105b04a966234d17f8',
      author: 'Martin Gowner',
      __v: 0
    }

    const blogsBeforePost = await blogsInDb()

    await api
    .post('/api/blogs')
    .send(newBlog3)
    .expect(400)

    const blogsAfterPost = await blogsInDb()

    expect(blogsAfterPost.length).toBe(blogsBeforePost.length)
  })
})

describe('when DELETE request is made for ', () => {

  test('an existing blog, it will be removed', async () => {
    const blogsBeforeDelete = await blogsInDb()
    const blogToRemove = blogsBeforeDelete[blogsBeforeDelete.length -1]

    await api
    .delete(`/api/blogs/${blogToRemove.id}`)
    .expect(204)

    const blogsAfterDelete = await blogsInDb()

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length-1)
  })

  test('a non existing blog, then system does not crash', async () => {
    const blogsBeforeDelete = await blogsInDb()

    await api
    .delete(`/api/blogs/trolololo`)
    .expect(400)

    const blogsAfterDelete = await blogsInDb()
    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length)

  })
})

describe('when PUT request is made ', () => {

  test('with valid params, the blog will be updated', async () => {
    const blogsBeforeUpdate = await blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    console.log(blogToUpdate)
    const likesBeforeUpdate = blogToUpdate.likes
    blogToUpdate.likes = likesBeforeUpdate +1

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)

    const blogsAfterUpdate = await blogsInDb()

    expect(blogsAfterUpdate[0].likes).toBe(likesBeforeUpdate+1)
  })

  test('nothing happens, if the id is not found', async () => {

    const imaginaryBlogToUpdate = {
      _id: '5a522ba71b54a67707lol7f8',
      title: 'whatever',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }

    await api
    .put(`/api/blogs/${imaginaryBlogToUpdate._id}`)
    .send(imaginaryBlogToUpdate)
    .expect(400)

  })
})

describe.only('when there are initially two users and no blogs at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    await Blog.remove({})

    await api
      .post('/api/users')
      .send({ username: 'root', name:'rootroot', password: 'sekret' })
      .expect(200)

    await api
      .post('/api/users')
      .send({username: 'boot', name:'bootboot', password: 'tekes' })

  })

  test('DELETE /api/blogs/:id deletes a created blog, when performed by the creator', async () => {

      const user = await api
      .post('/api/login')
      .send({username: 'root', password:'sekret'})

      await api
      .post('/api/blogs')
      .send({title:'test1', author:'tester', url:'www.google.fi'})
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(201)

      const blogs = await blogsInDb()

      await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${user.body.token}`)

      const result = await blogsInDb()

      expect(result.length).toBe(0)
  })

  test('DELETE /api/blogs/:id doesnt deletes blogs, when performed by others than the creator', async () => {

    let user = await api
    .post('/api/login')
    .send({username: 'root', password:'sekret'})

    const addedBlog = await api
    .post('/api/blogs')
    .send({title:'test1', author:'tester', url:'www.google.fi'})
    .set('Authorization', `Bearer ${user.body.token}`)
    .expect(201)

    user = await api
    .post('/api/login')
    .send({username: 'boot', password:'tekes'})

    //const blogs = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(401)

      const result = await blogsInDb()

      expect(result.length).toBe(1)
  })
})

describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', name:'rootroot', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with a used username', async () => {
    const usersBeforeOperation = await usersInDb()

    const takenUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(takenUser)
      .expect(400)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with not valid username', async () => {
    const usersBeforeOperation = await usersInDb()

    const tooshortUsername = {
      username: 'ro',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(tooshortUsername)
      .expect(400)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with not valid password', async () => {
    const usersBeforeOperation = await usersInDb()

    const tooshortPassw = {
      username: 'root2',
      name: 'Matti Luukkainen',
      password: 'sa'
    }

    await api
      .post('/api/users')
      .send(tooshortPassw)
      .expect(400)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})

afterAll(() => {
  server.close()
})
