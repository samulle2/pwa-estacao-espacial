import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
import ParticipacaoForm from '../components/ParticipacaoForm';
const ParticipacoesPage = () => {
    const [participacoes, setParticipacoes] = useState([]);
    const fetchParticipacoes = async () => {
        try {
            const res = await api.get('/participacoes');
            setParticipacoes(res.data);
        }
        catch (error) {
            console.error('Erro ao buscar participações:', error);
            alert('Erro ao buscar participações.');
        }
    };
    useEffect(() => {
        fetchParticipacoes();
    }, []);
    const handleSave = async (dados) => {
        try {
            await api.post('/participacoes', dados);
            alert('Participação criada com sucesso!');
            fetchParticipacoes();
        }
        catch (error) {
            console.error('Erro ao salvar participação:', error);
            alert('Erro ao salvar participação.');
        }
    };
    const handleDelete = async (id) => {
        const confirmar = confirm('Tem certeza que deseja excluir esta participação?');
        if (!confirmar)
            return;
        try {
            await api.delete(`/participacoes/${id}`);
            alert('Participação excluída com sucesso!');
            fetchParticipacoes();
        }
        catch (error) {
            console.error('Erro ao excluir participação:', error);
            alert('Erro ao excluir participação.');
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Participa\u00E7\u00F5es" }), _jsx(ParticipacaoForm, { onSave: handleSave }), _jsx("ul", { children: participacoes.map((p) => (_jsxs("li", { children: [p.astronauta?.nome, " participa da miss\u00E3o \"", p.missao?.nome, "\"", _jsx("button", { onClick: () => handleDelete(p.id), children: "Remover" })] }, p.id))) })] }));
};
export default ParticipacoesPage;
