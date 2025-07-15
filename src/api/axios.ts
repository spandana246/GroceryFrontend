import axios from 'axios';

export default axios.create({
  baseURL: ' http://localhost:5104/api',
});