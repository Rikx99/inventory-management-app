import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/httpClient";

export function useProducts(page) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/products/paginated?page=${page}&limit=10`
      );

      return data;
    },
    placeholderData: keepPreviousData,
  });
}