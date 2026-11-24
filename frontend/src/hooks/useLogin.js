import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/authApi";

export function useLogin(){
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['me']
            });
        },
    });
    return mutation;
}