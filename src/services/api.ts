import axios from "axios";
import { siteConfig } from "@/constants/site";

export const api = axios.create({
  baseURL: siteConfig.apiUrl,
  withCredentials: true
});

export async function apiGet<T>(path: string) {
  const { data } = await api.get<{ data: T }>(path);
  return data.data;
}
