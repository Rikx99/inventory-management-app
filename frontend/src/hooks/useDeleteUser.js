import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/api/usersApi";

export function useDeleteUser(){
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['users']
        });
        },
    });
    return mutation;
}