import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/usersApi";

export function useUpdateUser(){
    const queryClient = useQueryClient();

     const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
        queryClient.invalidateQueries({ 
            queryKey: ['users'], 
        });
        },
    })
    return mutation;
}