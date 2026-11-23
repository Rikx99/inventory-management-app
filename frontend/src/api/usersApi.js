import apiClient from "@/lib/httpClient";

export async function getUsers({ page, limit = 10 }) {
  const { data } = await apiClient.get("/users/paginated", {
    params: {
      page,
      limit,
    },
  });
  return data;
}

export async function getUserById(id){
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
}

export async function createUser(userData){
  const { data } = await apiClient.post("/users", userData);
  return data;
}

export async function updateUser({id, userData}){
  const { data } = await apiClient.patch(`/users/${id}`, userData);
  return data;
}

export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
}