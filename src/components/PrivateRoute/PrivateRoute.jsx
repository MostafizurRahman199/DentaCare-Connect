import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../../Auth/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useFirebaseAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute; 