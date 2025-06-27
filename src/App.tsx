import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AstronautasPage from './pages/AstronautasPage';
import MissoesPage from './pages/MissoesPage';
import ModulosPage from './pages/ModulosPage';
import MenuBar from './components/MenuBar';
import ParticipacoesPage from './pages/ParticipacoesPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import PerfilPage from './pages/PerfilPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuBar />
        <Box sx={{ marginTop: '64px', padding: '20px' }}> {/* Adicione esta Box com marginTop */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            
            {/* Rotas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<AstronautasPage />} />
              <Route path="/missoes" element={<MissoesPage />} />
              <Route path="/modulos" element={<ModulosPage />} />
              <Route path="/participacoes" element={<ParticipacoesPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>
            
            {/* Redirecionar para login se não encontrado */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;