import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitLoginForm = (e) => {
    e.preventDefault()
    handleSubmit(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmitLoginForm}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default LoginForm
