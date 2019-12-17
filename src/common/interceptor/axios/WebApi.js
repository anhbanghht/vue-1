import axios from 'axios'
import AuthenticationService from "../../../services/authentication.service";

const webApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
});

webApi.interceptors.request.use( (config) => {

  if (!AuthenticationService.isEnableExpire()) {
    AuthenticationService.refreshToken();
  }

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// webApi.interceptors.request.use(function (config) {
//   // hook
//   if (!navigator.onLine)
//     return Promise.reject({message: 'You are offline'})
//
//   return config
// }, function (error) {
//   // hook
//
//   return Promise.reject(error)
// })

// Add a response interceptor
// webApi.interceptors.response.use(function (response) {
//   // hook
//
//   return response
// }, function (error) {
//   // hook
//   if (error.response)
//     if (error.response.data && error.response.message)
//       error.message = error.response.message
//     else if (error.response.data && typeof error.response.data === 'string')
//       error.message = error.response.data
//
//   return Promise.reject(error)
// });

export default webApi;

