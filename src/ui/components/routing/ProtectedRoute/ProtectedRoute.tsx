import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

