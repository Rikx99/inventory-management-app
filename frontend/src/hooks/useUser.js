import { useQuery } from '@tanstack/react-query';
import { getUserById } from "@/api/usersApi";

export function useUser(id){
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getUserById(id),
    });
   
}