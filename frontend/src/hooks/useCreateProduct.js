import { createProduct } from '@/api/productsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProduct(){
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    })
   return mutation;
}