import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AstronautasPage from './pages/AstronautasPage';
import MissoesPage from './pages/MissoesPage';
import ModulosPage from './pages/ModulosPage';
import Menu from './components/Menu';
import ParticipacoesPage from './pages/ParticipacoesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<AstronautasPage />} />
          <Route path="/missoes" element={<MissoesPage />} />
          <Route path="/modulos" element={<ModulosPage />} />
          <Route path="/participacoes" element={<ParticipacoesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
