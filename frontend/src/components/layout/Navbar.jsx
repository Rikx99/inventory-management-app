import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

export default function Navbar(){
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state)=> state.logout);

    return(
        
    )
}