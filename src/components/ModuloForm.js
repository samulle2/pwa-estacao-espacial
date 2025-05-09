import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
const ModuloForm = ({ onSave, initialData }) => {
    const [nome, setNome] = useState(initialData?.nome || '');
    const [funcao, setFuncao] = useState(initialData?.funcao || '');
    const [missaoId, setMissaoId] = useState(initialData?.missao_id || '');
    const [missoes, setMissoes] = useState([]);
    useEffect(() => {
        api.get('/missoes').then(res => setMissoes(res.data));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !funcao || !missaoId) {
            alert('Todos os campos são obrigatórios.');
            return;
        }
        onSave({
            nome,
            funcao,
            missao_id: Number(missaoId),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { value: nome, onChange: e => setNome(e.target.value), placeholder: "Nome do m\u00F3dulo" }), _jsx("input", { value: funcao, onChange: e => setFuncao(e.target.value), placeholder: "Fun\u00E7\u00E3o" }), _jsxs("select", { value: missaoId, onChange: e => setMissaoId(e.target.value), children: [_jsx("option", { value: "", children: "Selecione uma miss\u00E3o" }), missoes.map((m) => (_jsx("option", { value: m.id, children: m.nome }, m.id)))] }), _jsx("button", { type: "submit", children: "Salvar" })] }));
};
export default ModuloForm;
