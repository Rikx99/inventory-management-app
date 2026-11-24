import apiClient from "@/lib/httpClient";

export async function registerUser(userData){
    const { data } = await apiClient.post("/register", userData);
        return data;
};

export async function loginUser(userData){
    const { data } = await apiClient.post("/login", userData);
    return data;
};

export async function getCurrentUser() {
    const { data } = await apiClient.get("/me");
    return data;
}