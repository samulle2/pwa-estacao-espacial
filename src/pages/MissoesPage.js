import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
import MissaoForm from '../components/MissaoForm';
const MissoesPage = () => {
    const [missoes, setMissoes] = useState([]);
    const [editing, setEditing] = useState(null);
    const fetchMissoes = async () => {
        try {
            const res = await api.get('/missoes');
            setMissoes(res.data);
        }
        catch (error) {
            console.error('Erro ao buscar missões:', error);
            alert('Erro ao buscar missões.');
        }
    };
    useEffect(() => {
        fetchMissoes();
    }, []);
    const handleDelete = async (id) => {
        const confirmar = confirm('Tem certeza que deseja excluir esta missão?');
        if (!confirmar)
            return;
        try {
            await api.delete(`/missoes/${id}`);
            alert('Missão excluída com sucesso!');
            fetchMissoes();
        }
        catch (error) {
            console.error('Erro ao excluir missão:', error);
            if (error.response?.status === 500) {
                alert('Não é possível excluir uma missão que possui módulos vinculados.');
            }
            else {
                alert('Erro ao excluir missão.');
            }
        }
    };
    const handleSave = async (dados) => {
        if (!dados.nome || !dados.descricao || !dados.data_inicio || !dados.data_fim) {
            alert('Preencha todos os campos!');
            return;
        }
        const inicio = new Date(dados.data_inicio);
        const fim = new Date(dados.data_fim);
        if (inicio > fim) {
            alert('Data de início não pode ser posterior à data de fim.');
            return;
        }
        const anos = [inicio.getFullYear(), fim.getFullYear()];
        if (anos.some(a => a < 1900 || a > 2100)) {
            alert('As datas devem estar entre os anos 1900 e 2100.');
            return;
        }
        try {
            if (editing) {
                await api.put(`/missoes/${editing.id}`, dados);
                alert('Missão atualizada com sucesso!');
                setEditing(null);
            }
            else {
                await api.post('/missoes', dados);
                alert('Missão criada com sucesso!');
            }
            fetchMissoes();
        }
        catch (error) {
            console.error('Erro ao salvar missão:', error);
            alert('Erro ao salvar missão. Verifique os dados.');
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Miss\u00F5es" }), _jsx(MissaoForm, { onSave: handleSave, initialData: editing }), _jsx("ul", { children: missoes.map((m) => (_jsxs("li", { children: [m.nome, " - ", m.descricao, " ", _jsx("br", {}), new Date(m.data_inicio).toLocaleDateString(), " \u2192 ", new Date(m.data_fim).toLocaleDateString(), _jsx("button", { onClick: () => setEditing(m), children: "Editar" }), _jsx("button", { onClick: () => handleDelete(m.id), children: "Excluir" })] }, m.id))) })] }));
};
export default MissoesPage;
