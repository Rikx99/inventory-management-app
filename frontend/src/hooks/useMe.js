import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/authApi";

export function useMe(){
    return useQuery({
        queryKey: ['me'],
        queryFn: getCurrentUser,
    });
}