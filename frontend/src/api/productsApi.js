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

export async function getProductById(id){
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}

export async function createProduct(productData){
  const { data } = await apiClient.post("/products", productData);
  return data;
}

export async function updateProduct({id, productData}){
  const { data } = await apiClient.patch(`/products/${id}`, productData);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data;
}