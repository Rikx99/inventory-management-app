import { QueryClient } from "@tanstack/react-query";
// Creazione del client per React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})