import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUser } from '@/api/authApi'

export function useRegister(){
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
        },
    });
    return mutation;
}