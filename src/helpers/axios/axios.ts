import axios from "axios";

const instanceAxios = axios.create({
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default instanceAxios;
