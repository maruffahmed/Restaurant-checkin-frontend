import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import axios from "./axios";
import { AxiosRequestConfig } from "axios";

export async function AuthenticatedFetch(
  url: string,
  options?: AxiosRequestConfig
) {
  const session = await getServerSession(authOptions);
  let res = await axios(url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
  return res.data;
}
