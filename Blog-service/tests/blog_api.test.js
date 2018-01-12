const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Do not go to Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
  },
  {
    _id: '5a332aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Hijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 9,
    __v: 0
  },
  {
    _id: '5a422bb71b54a676234d17f8',
    title: 'Did you go To Statement Considered Harmful',
    author: 'Edsger W. Fijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  }
]

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

  expect(response.body.length).toBe(initialBlogs.length)
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

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(res => res.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
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

    await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')


    const blogs = response.body.filter(res => res.title === 'Go Scrum yourself 2')

    expect(blogs[0].likes).toBe(0)
    expect(response.body.length).toBe(initialBlogs.length + 2)
  })

  test('blogs with no title nor url are not added', async () => {
    const newBlog3 = {
      _id: '5a11ab105b04a966234d17f8',
      author: 'Martin Gowner',
      __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog3)
    .expect(400)

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length + 2)
  })
})

afterAll(() => {
  server.close()
})
