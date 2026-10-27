import apiClient from "@/lib/httpClient";

export async function getProducts({ page, limit = 10 }) {
  const { data } = await apiClient.get("/products/paginated", {
    params: {
      page,
      limit,
    },
  });

  return data;
}