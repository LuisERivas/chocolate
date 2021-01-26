import React, { Fragment, useState } from 'react'

const Register = () => {
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
    // if password does not match password too, log error message
    if (password !== password2) {
      console.log('passwords do not match ')
      // if it does work, log the data in the state
    } else {
      console.log(formData)
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
            required />
        </div>
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
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
            required />
        </div>
        <div>
          <input type='submit' value='Register' />
        </div>
        <p>
            Already have an account?
          <a href='login' > Sign in </a>
        </p>
      </form>
    </Fragment>
  )
}

export default Register
