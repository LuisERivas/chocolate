import React, { Fragment, useState } from 'react'
// bring in connect
import { connect } from 'react-redux'
// bring in setAlert
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
// bring in proptypes
import PropTypes from 'prop-types'

const Register = ({ setAlert, register }) => {
  // the object full of values is formData, function to update state(formData) is setform data
  const [ formData, setFormData ] = useState({
    // default state values
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  // destructure formData
  const { name, email, password, password2 } = formData
  // the on chage at the level of the individual form input will call the onChange function that will call setFormData which
  // changes the value based on the name of the target and the value inputed to the target
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  // on submit funciton arrow function
  const onSubmit = e => {
    // prevent lock
    e.preventDefault()
    // if password does not match password too, log error message the alert is the class for the styling
    if (password !== password2) {
      setAlert('passwords do not match', 'danger')
      // if it does work, log the data in the state
    } else {
      register({ name, email, password })
    }
  }

  // adding value={variable} asociates the variable with the current state, the on change causes the state to be updated
  return (
    <Fragment>
      <h1> Registration </h1>
      <p> Create your account </p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input type='submit' value='Register' />
        </div>
        <p>
            Already have an account?
          <a href='/login' > Login </a>
        </p>
      </form>
    </Fragment>
  )
}
// proptype regis
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

// export using connect the null is temporar and this lets us pass setAlert (actions we want to use from props) State, object with actions we want to use
export default connect(null, { setAlert, register })(Register)
