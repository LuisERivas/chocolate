import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

const Login = ({ login, isAuthenticated }) => {
  // the object full of values is formData, function to update state(formData) is setform data
  const [ formData, setFormData ] = useState({
    // default state values
    email: '',
    password: ''
  })

  // destructure formData
  const { email, password } = formData
  // the on chage at the level of the individual form input will call the onChange function that will call setFormData which
  // changes the value based on the name of the target and the value inputed to the target
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  // on submit funciton arrow function
  const onSubmit = e => {
    // prevent lock
    e.preventDefault()
    console.log(formData)
    login(email, password)
  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1> Sign in </h1>
      <p> Access account </p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required />
        </div>
        <div>
          <input type='submit' value='Login' />
        </div>
        <p>
            Don't have an account?
          <a href='/register' > Register </a>
        </p>
      </form>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { login })(Login)
