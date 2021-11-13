const axios = require('axios').default;

//  AXISTANCE is exported which is an nstance of axios used to send and recive 
// request to and from api.
const axinstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export default axinstance;