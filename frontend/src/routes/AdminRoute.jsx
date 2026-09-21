import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const AdminRoute = () => {
    const { user } = useAuthStore();

    if(!user || user.role !== 'admin'){
        return <Navigate to='/dashboard' replace />;
    }
    return <Outlet />;
}