import { deleteProduct } from '@/api/productsApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteProduct(){
     const queryClient = useQueryClient()

     const mutate = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        },
     })
     return mutate;
}