import useAuthenticatedFetch from "./useAuthenticatedFetch";
import { IUsers } from "../types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useGetProfile = () => {
  const fetchFunction = useAuthenticatedFetch();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchFunction.get("/users/me"),
  });
  return {
    data: {
      data: data?.data as IUsers,
    },
    isLoading,
    isError,
    error,
    refetch,
  };
};

//
export const useUpdateProfileAvatar = () => {
  const queryClient = useQueryClient();
  const fetchFunction = useAuthenticatedFetch();
  const uploadAvatar = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      // Upload file
      const res = await fetchFunction.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // upload file success, update profile
      const updateProfileRes = await fetchFunction.patch("/auth/me", {
        photo: {
          id: res.data.id,
        },
      });
      return updateProfileRes.data;
    },
    [fetchFunction]
  );
  const { mutate, isError, data, isPending } = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  return {
    mutate,
    isPending,
    isError,
    data,
  };
};
