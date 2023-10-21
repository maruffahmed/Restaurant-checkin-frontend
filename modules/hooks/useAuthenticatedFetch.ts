import axios from "@/modules/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAuthenticatedFetch = () => {
  const { data: session } = useSession();
  console.log("session", session);
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [session?.accessToken]);

  return axios;
};

export default useAuthenticatedFetch;
