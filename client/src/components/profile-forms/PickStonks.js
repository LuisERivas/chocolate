import React, { Fragment, useState } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Form, FormGroup, FormLabel } from 'react-bootstrap'

const PickStonks = props => {
  const [formData, setFormData] = useState({
    // set initial state
    nameOfStonk: null,
    ticker: null
  })
  // destructure by pulling from form data
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const {
    nameOfStonk,
    ticker
  } = formData

  return (

    <Fragment>
      <h1>Here is where you add stonks to your list</h1>
      <Form>
        <FormGroup>
          <FormLabel> Type in the Name </FormLabel>
          <Form.Control type='nameOfStonk' placeholder='Name' value={nameOfStonk} onChange={e => onChange(e)} />
          <p />
          <FormLabel> Type in the ticker </FormLabel>
          <Form.Control type='ticker' placeholder='Ticker' value={ticker} onChange={e => onChange(e)} />

        </FormGroup>

      </Form>
    </Fragment>
  )
}

PickStonks.propTypes = {

}

export default PickStonks
