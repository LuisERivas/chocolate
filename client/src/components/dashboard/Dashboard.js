import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'
import store from '../../store'
import UserLoadMessage from '../layout/userLoadMessage'
import { Button } from 'react-bootstrap'
// import useSelector from 'react-redux'
// import { useDispatch } from 'react-redux'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  const userId = useSelector(state => state.auth.user)
  useEffect(() => { store.dispatch(loadUser()) }, [])

  useEffect(() => { if (userId !== null) { getCurrentProfile() } }, [userId])

  return loading && profile === null ? <UserLoadMessage /> : <Fragment>
    <h1 className='large'> Dashboard </h1>
    <p> Welcome { user && user.name } </p>
    { profile !== null ? (
      <Fragment> you HAVE a profile </Fragment>
    ) : (
      <Fragment>
        <p> you DON'T HAVE any stonks</p>
        <Button href='/pick-stonks' variant='danger'> Choose Stonks </Button>
      </Fragment>
    )}
  </Fragment>
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
