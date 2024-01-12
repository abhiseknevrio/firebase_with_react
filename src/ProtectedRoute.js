import React from 'react';
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children, isAuthenticated }) => {
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
};

export default PrivateRoute;