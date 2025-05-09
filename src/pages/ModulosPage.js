import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
import ModuloForm from '../components/ModuloForm';
const ModulosPage = () => {
    const [modulos, setModulos] = useState([]);
    const [editing, setEditing] = useState(null);
    const fetchModulos = async () => {
        try {
            const res = await api.get('/modulos');
            setModulos(res.data);
        }
        catch (error) {
            console.error('Erro ao buscar módulos:', error);
            alert('Erro ao buscar módulos.');
        }
    };
    useEffect(() => {
        fetchModulos();
    }, []);
    const handleDelete = async (id) => {
        const confirmar = confirm('Deseja excluir este módulo?');
        if (!confirmar)
            return;
        try {
            await api.delete(`/modulos/${id}`);
            alert('Módulo excluído com sucesso!');
            fetchModulos();
        }
        catch (error) {
            console.error('Erro ao excluir módulo:', error);
            alert('Erro ao excluir módulo.');
        }
    };
    const handleSave = async (dados) => {
        if (!dados.nome || !dados.funcao || !dados.missao_id) {
            alert('Preencha todos os campos!');
            return;
        }
        try {
            if (editing) {
                await api.put(`/modulos/${editing.id}`, dados);
                alert('Módulo atualizado com sucesso!');
                setEditing(null);
            }
            else {
                await api.post('/modulos', dados);
                alert('Módulo criado com sucesso!');
            }
            fetchModulos();
        }
        catch (error) {
            console.error('Erro ao salvar módulo:', error);
            alert('Erro ao salvar módulo.');
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "M\u00F3dulos" }), _jsx(ModuloForm, { onSave: handleSave, initialData: editing }), _jsx("ul", { children: modulos.map((m) => (_jsxs("li", { children: [m.nome, " - ", m.funcao, " (Miss\u00E3o: ", m.missao?.nome || 'sem vínculo', ")", _jsx("button", { onClick: () => setEditing(m), children: "Editar" }), _jsx("button", { onClick: () => handleDelete(m.id), children: "Excluir" })] }, m.id))) })] }));
};
export default ModulosPage;
