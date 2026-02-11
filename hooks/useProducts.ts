import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/src/api/client';

export function useProducts(params?: {
    search?: string;
    categoryId?: string;
    freeDelivery?: boolean;
}) {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productsAPI.getAll(params),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productsAPI.getById(id),
        enabled: !!id,
    });
}
