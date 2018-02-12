import React from 'react'
import { shallow } from 'enzyme'
import BlogListItem from './BlogListItem'

describe.only('<BlogListItem />', () => {

  let blogComponent
  beforeEach(() => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'mluukkai',
      url: 'mluukkai.github.io',
      likes: 3,
      user: {
        id:987654567,
        name:'Matti Luukkainen',
        username: 'mluukkai'
      }
    }
    const mockRemoveHandler = jest.fn()

    blogComponent = shallow(<Blog blog={blog} removeHandler={mockRemoveHandler}/>)

  })


  it('at first renders only limited blog content', () => {

    const beforeClick = blogComponent.find('.detail-info')
    expect(beforeClick.getElement().props.style).toEqual({ display: 'none' })

  })

  it('after click renders full blog content', () => {
    const firstDiv = blogComponent.find('.blog-info')
    firstDiv.simulate('click')
    const afterClick = blogComponent.find('.detail-info')
    expect(afterClick.getElement().props.style).toEqual({ display: '' })
  })

  it('doesnt show any blogs before logging in', () => {

    const beforeClick = blogComponent.find('.detail-info')
    expect(beforeClick.getElement().props.style).toEqual({ display: 'none' })
  })

})
