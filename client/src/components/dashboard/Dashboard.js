import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'
import store from '../../store'
// import useSelector from 'react-redux'
// import { useDispatch } from 'react-redux'

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  const userId = useSelector(state => state.auth.user)
  useEffect(() => { store.dispatch(loadUser()) }, [])

  useEffect(() => { if (userId !== null) { getCurrentProfile() } }, [userId])

  return <div> Dashboard </div>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
