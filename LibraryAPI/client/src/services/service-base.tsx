import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:7146/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
