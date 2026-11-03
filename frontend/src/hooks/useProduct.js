import { getProductById } from '@/api/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useProduct(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: getProductById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
        }
    })
    return mutation;
}