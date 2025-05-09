import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const AstronautaForm = ({ onSave, initialData }) => {
    const [nome, setNome] = useState(initialData?.nome || '');
    const [especialidade, setEspecialidade] = useState(initialData?.especialidade || '');
    const [dataNascimento, setDataNascimento] = useState(initialData?.data_nascimento?.substring(0, 10) || '');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !especialidade || !dataNascimento) {
            alert('Preencha todos os campos!');
            return;
        }
        const data = new Date(dataNascimento);
        const ano = data.getFullYear();
        if (ano < 1900 || ano > 2100) {
            alert('Ano de nascimento inválido. Escolha entre 1900 e 2100.');
            return;
        }
        onSave({
            nome,
            especialidade,
            data_nascimento: data.toISOString(),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { value: nome, onChange: e => setNome(e.target.value), placeholder: "Nome" }), _jsx("input", { value: especialidade, onChange: e => setEspecialidade(e.target.value), placeholder: "Especialidade" }), _jsx("input", { type: "date", value: dataNascimento, onChange: e => setDataNascimento(e.target.value), placeholder: "Data de nascimento" }), _jsx("button", { type: "submit", children: "Salvar" })] }));
};
export default AstronautaForm;
