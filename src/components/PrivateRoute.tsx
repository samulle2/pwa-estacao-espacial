import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !usuario.isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;