import axios from 'axios'
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const baseURL = isDev ? "http://localhost:5000" : ""
export default axios.create({
    baseURL: baseURL,
    withCredentials: true
});