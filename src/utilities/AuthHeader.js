import axios from 'axios';

// Automatically add authorization header to all axios requests.
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');

  if (token != null) {
    config.headers.Authorization = `Basic ${localStorage.getItem('token')}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});