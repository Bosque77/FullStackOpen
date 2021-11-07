import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    let filter = event.target.value
    dispatch(filterAnecdotes(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter