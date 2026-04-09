import axios from "axios";

export const sendRequest = (data) =>
  axios.post("http://localhost:5000/api/test", data);

export const getHistory = () =>
  axios.get("http://localhost:5000/api/history");