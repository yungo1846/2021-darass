import axios from "axios";
import { BASE_URL } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { getCookie } from "./cookie";

const customAxios = axios.create({
  baseURL: BASE_URL
});

customAxios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(COOKIE_KEY.ATK)}`;
customAxios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const request = {
  GET: async (query: string) => await customAxios.get(query),
  POST: async <T>(query: string, data: T) => await customAxios.post(query, data),
  PATCH: async <T>(query: string, data: T) => await customAxios.patch(query, data),
  DELETE: async (query: string) => await customAxios.delete(query)
};

export { request };
