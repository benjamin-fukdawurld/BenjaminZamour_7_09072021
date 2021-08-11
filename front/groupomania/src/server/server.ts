import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default function createServer(token?: string): AxiosInstance {
  const configuration: AxiosRequestConfig = {
    baseURL: "http://localhost:5000/",
    timeout: 5000,
    headers: {},
  };

  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }

  return axios.create(configuration);
}
