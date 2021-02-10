import axios from 'axios'

const setAuthToken = token => {
// if token exists
  if (token) {
    // set axios defaults header to what is in local storage token
    axios.defaults.headers.common['x-auth-token'] = token
    // if not, then delete whatever is in the header
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken
