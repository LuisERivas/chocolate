import axios from 'axios'

const setAuthToken = token => {
// if token exists
  console.log('set auth token:' + token)
  if (token) {
    // set axios defaults header to what is in local storage token
    axios.defaults.headers.common['x-auth-token'] = token
    console.log('checking this')
    // if not, then delete whatever is in the header
  } else {
    delete axios.defaults.headers.common['x-auth-token']
    console.log('im being lame')
  }
}

export default setAuthToken
