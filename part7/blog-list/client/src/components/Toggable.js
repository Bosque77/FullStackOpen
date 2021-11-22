import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="toggable-button" onClick={toggleVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id="toggable-button" onClick={toggleVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">hide</button>
      </div>
    </div>
  )
})


Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable