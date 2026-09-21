import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = () => {
    const {isAuthenticated} = useAuthStore();
    // Se non è loggato reinderizza alla pagina di Login
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    // Se loggato, mostra la rotta interna tramite Outlet
    return <Outlet />;
}