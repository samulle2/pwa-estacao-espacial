import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AstronautasPage from './pages/AstronautasPage';
import MissoesPage from './pages/MissoesPage';
import ModulosPage from './pages/ModulosPage';
import Menu from './components/Menu';
import ParticipacoesPage from './pages/ParticipacoesPage';
const App = () => {
    return (_jsxs(BrowserRouter, { children: [_jsx(Menu, {}), _jsx("div", { style: { padding: '20px' }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AstronautasPage, {}) }), _jsx(Route, { path: "/missoes", element: _jsx(MissoesPage, {}) }), _jsx(Route, { path: "/modulos", element: _jsx(ModulosPage, {}) }), _jsx(Route, { path: "/participacoes", element: _jsx(ParticipacoesPage, {}) })] }) })] }));
};
export default App;
