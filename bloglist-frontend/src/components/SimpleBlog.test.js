import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'mluukkai',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const firstDiv = blogComponent.find('.info')
    const secondDiv = blogComponent.find('.extra')

    expect(firstDiv.text()).toContain(blog.title)
    expect(firstDiv.text()).toContain(blog.author)
    expect(secondDiv.text()).toContain(blog.likes)
  })

  it('clicking the like button twice calls the event handler twice', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'mluukkai',
      likes: 3
    }

  const mockHandler = jest.fn()

  const blogComponent = shallow(
    <SimpleBlog
      blog={blog}
      onClick={mockHandler}
    />
  )

  const button = blogComponent.find('button')
  button.simulate('click')
  button.simulate('click')

  expect(mockHandler.mock.calls.length).toBe(2)
})
})
