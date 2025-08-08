import axios from "axios";

export const BASE_URL = `http://localhost:3000`;

const defaultHeaders = {
  "x-token": "acces",
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: defaultHeaders,
});

instance.interceptors.response.use(
  (response: any) => response,
  (error) => {
    console.error("API request failed:", error.message);
    return Promise.reject(error);
  }
);

export async function get(
  url: string,
  params?: Record<string, any>,
  config?: any
): Promise<any> {
  return instance.get(url, { ...config, params });
}

export async function post(
  url: string,
  data?: any,
  config?: any
): Promise<any> {
  return instance.post(url, data, config);
}

export default instance;
