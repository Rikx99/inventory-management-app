import { updateProduct } from '@/api/productsApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateProduct(){
    const queryClient = useQueryClient()
    
    const mutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
        queryClient.invalidateQueries({ 
            queryKey: ['products'], 
        });
    },
    })
    return mutation;
};