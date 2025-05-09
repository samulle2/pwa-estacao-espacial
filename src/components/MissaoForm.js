import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const MissaoForm = ({ onSave, initialData }) => {
    const [nome, setNome] = useState(initialData?.nome || '');
    const [descricao, setDescricao] = useState(initialData?.descricao || '');
    const [dataInicio, setDataInicio] = useState(initialData?.data_inicio?.substring(0, 10) || '');
    const [dataFim, setDataFim] = useState(initialData?.data_fim?.substring(0, 10) || '');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !descricao || !dataInicio || !dataFim) {
            alert('Preencha todos os campos!');
            return;
        }
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        if (inicio > fim) {
            alert('Data de início não pode ser maior que a data de fim.');
            return;
        }
        const anoInicio = inicio.getFullYear();
        const anoFim = fim.getFullYear();
        if (anoInicio < 1900 || anoInicio > 2100 || anoFim < 1900 || anoFim > 2100) {
            alert('As datas devem estar entre 1900 e 2100.');
            return;
        }
        onSave({
            nome,
            descricao,
            data_inicio: inicio.toISOString(),
            data_fim: fim.toISOString(),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { value: nome, onChange: e => setNome(e.target.value), placeholder: "Nome da miss\u00E3o" }), _jsx("input", { value: descricao, onChange: e => setDescricao(e.target.value), placeholder: "Descri\u00E7\u00E3o" }), _jsx("input", { type: "date", value: dataInicio, onChange: e => setDataInicio(e.target.value) }), _jsx("input", { type: "date", value: dataFim, onChange: e => setDataFim(e.target.value) }), _jsx("button", { type: "submit", children: "Salvar" })] }));
};
export default MissaoForm;
