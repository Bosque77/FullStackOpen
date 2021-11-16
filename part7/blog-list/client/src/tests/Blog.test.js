import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Forest',
    url: 'www.google.com',
    likes: 0,
    user:{
      username:'forestschwrtz',
      name:'forest'
    }
  }

  const username = 'forestschwrtz'

  const component = render(
    <Blog blog={blog} username={username}/>
  )

  component.debug()
  let div = component.container.querySelector('.blog-content')
  expect(div).toHaveStyle('display: none')



})

test('testing button fire', () => {

  const blog = {
    title: 'Blog Title',
    author: 'Forest',
    url: 'www.google.com',
    likes: 0,
    user:{
      username:'forestschwrtz',
      name:'forest'
    }
  }

  const username = 'forestschwrtz'

  const component = render(
    <Blog blog={blog} username={username}/>
  )

  let div = component.container.querySelector('.blog-content')
  console.log('about to fire the click view')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')

})

test('like button fire',() => {

  const addBlogLike = jest.fn()

  const blog = {
    title: 'Blog Title',
    author: 'Forest',
    url: 'www.google.com',
    likes: 0,
    user:{
      username:'forestschwrtz',
      name:'forest'
    }
  }

  const username = 'forestschwrtz'

  const component = render(
    <Blog blog={blog} username={username} addBlogLike={addBlogLike}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(addBlogLike.mock.calls).toHaveLength(2)

})