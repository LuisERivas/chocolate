import React from 'react'
import PropTypes from 'prop-types'

// bring in connect
import { connect } from 'react-redux'

// creates the actual llert that uses the destrctured alerts from props (props.alerts = {alerts})
const Alert = ({ alerts }) =>
// map through alert, if alert is not equal to null and greater than 0, map through and return a div with a mesage inside
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    // key for the alert and the class name for the alert that is dynamic based on the alert type that comes in from register.js
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ))
// gives a prop type to Alert
Alert.propTypes = {
  // gives the proptype of array
  alerts: PropTypes.array.isRequired
}

// map state to props
const mapStateToProps = state => ({
  alerts: state.alert
})

// adds connect to export
export default connect(mapStateToProps)(Alert)
