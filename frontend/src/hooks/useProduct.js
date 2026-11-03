import { getProductById } from '@/api/productsApi';
import { useQuery } from '@tanstack/react-query';

export function useProduct(id){
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    });
   
}