const list = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs= []

  const result = list.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const newBlogs = [
    {
    _id: '5a332aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  },
  {
    _id: '5a422bb71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0
  }
]
  const listWithManyBlogs = listWithOneBlog.concat(newBlogs)

  const listWithUnpopularBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a332aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    }
  ]

  test('when there are no blogs in the list', () => {
    const result = list.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = list.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when there are blogs in the list that have several likes', () => {
    const result = list.totalLikes(listWithManyBlogs)
    expect(result).toBe(12)
  })

  test('when there are blogs in the list that have no likes', () => {
    const result = list.totalLikes(listWithUnpopularBlogs)
    expect(result).toBe(0)
  })
})

describe('most popular blog is found ', () => {

  const listWithOneFavourite = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a332aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422bb71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  const newBlog = {
    _id: '5a522ba71b54a676234d17f8',
    title: 'Go Scrum',
    author: 'Martin Fowler',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  }

  const listWithManyFavourites =listWithOneFavourite.concat(newBlog)

    test('when there is one blog that is the most popular', () => {
      const result = list.favouriteBlog(listWithOneFavourite)
      expect(result.likes).toBe(10)
    })

    test('when there are many blogs with the same highest amount of likes', () => {
      const result = list.favouriteBlog(listWithManyFavourites)
      expect(result.length).toBe(2)
    })
})

describe('author with most blogs ', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'How to get up in the mornings',
      author: 'Paavo Väyrynen',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }
  ]

  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a332aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422bb71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a522ba71b54a676234d17f8',
      title: 'Go Scrum',
      author: 'Martin Fowler',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when there are no authors', () => {
    const result = list.mostBlogs([])
    expect(result).toBe(0)
  })

  test('when there is one author', () => {
    const result = list.mostBlogs(listWithOneBlog)
    expect(result.author).toBe('Paavo Väyrynen')
    expect(result.blogs).toBe(1)
  })

  test('when there are many authors', () => {
    const result = list.mostBlogs(listOfBlogs)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.blogs).toBe(3)
  })
})

describe('author with most likes ', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'How to get up in the mornings',
      author: 'Paavo Väyrynen',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }
  ]

  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a332aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422bb71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a522ba71b54a676234d17f8',
      title: 'Go Scrum',
      author: 'Martin Fowler',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]


  test('when there is one author', () => {
      const result = list.mostLikes(listWithOneBlog)
      expect(result.author).toBe('Paavo Väyrynen')
      expect(result.votes).toBe(1)
  })

  test('when there are many authors', () => {
      const result = list.mostLikes(listOfBlogs)
      expect(result.author).toBe('Edsger W. Dijkstra')
      expect(result.votes).toBe(27)
  })
})
