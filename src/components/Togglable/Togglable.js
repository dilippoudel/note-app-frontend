import { useState } from 'react'
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hiddeWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hiddeWhenVisible}>
        <button>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
export default Togglable