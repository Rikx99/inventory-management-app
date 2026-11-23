import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getUsers } from "@/api/usersApi";

export function useUsers(params){
    useQuery({
        queryKey: ['users', params],
        querFn: () => getUsers(params),
        placeholderData: keepPreviousData,
    });
}