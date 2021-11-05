import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlog from '../components/CreateBlog'


test('renders content', () => {
  const handleCreateBlog = jest.fn()


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
    <CreateBlog handleCreateBlog={handleCreateBlog} />
  )


 const title_input = component.container.querySelector('input')
 const author_input = component.container.querySelector('input:nth-child(2)')
 const url_input = component.container.querySelector('input:nth-child(3)')

 console.log(prettyDOM(url_input))
//   const form = component.container.querySelector('form')

//   fireEvent.change(input, {
//     target: { value: 'testing of forms could be easier' }
//   })
//   fireEvent.submit(form)



})