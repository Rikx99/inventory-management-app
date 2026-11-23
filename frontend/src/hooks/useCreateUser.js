import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/api/usersApi";

export function useCreateUser(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['users'] 
        });
        }
    })
    return mutation;
}