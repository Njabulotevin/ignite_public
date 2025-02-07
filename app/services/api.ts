import axios, { AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});
