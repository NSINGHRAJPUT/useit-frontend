import axios from "axios";
import { getPublicApiUrl } from "@/lib/public-env";

export const api = axios.create({
  baseURL: getPublicApiUrl(),
});

export async function apiGet<T>(path: string) {
  const { data } = await api.get<{ data: T }>(path);
  return data.data;
}
