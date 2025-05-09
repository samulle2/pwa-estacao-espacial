import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
import AstronautaForm from '../components/AstronautaForm';
const AstronautasPage = () => {
    const [astronautas, setAstronautas] = useState([]);
    const [editing, setEditing] = useState(null);
    const fetchAstronautas = async () => {
        try {
            const res = await api.get('/astronautas');
            setAstronautas(res.data);
        }
        catch (error) {
            console.error('Erro ao buscar astronautas:', error);
            alert('Erro ao buscar astronautas.');
        }
    };
    useEffect(() => {
        fetchAstronautas();
    }, []);
    const handleDelete = async (id) => {
        const confirmar = confirm('Deseja excluir este astronauta?');
        if (!confirmar)
            return;
        try {
            await api.delete(`/astronautas/${id}`);
            alert('Astronauta excluído com sucesso!');
            fetchAstronautas();
        }
        catch (error) {
            console.error('Erro ao excluir astronauta:', error);
            alert('Erro ao excluir astronauta.');
        }
    };
    const handleSave = async (dados) => {
        if (!dados.nome || !dados.especialidade || !dados.data_nascimento) {
            alert('Preencha todos os campos!');
            return;
        }
        const ano = new Date(dados.data_nascimento).getFullYear();
        if (ano < 1900 || ano > 2100) {
            alert('Ano de nascimento inválido. Use uma data entre 1900 e 2100.');
            return;
        }
        try {
            if (editing) {
                await api.put(`/astronautas/${editing.id}`, dados);
                alert('Astronauta atualizado com sucesso!');
                setEditing(null);
            }
            else {
                await api.post('/astronautas', dados);
                alert('Astronauta cadastrado com sucesso!');
            }
            fetchAstronautas();
        }
        catch (error) {
            console.error('Erro ao salvar astronauta:', error);
            alert('Erro ao salvar astronauta. Verifique o console.');
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Astronautas" }), _jsx(AstronautaForm, { onSave: handleSave, initialData: editing }), _jsx("ul", { children: astronautas.map((a) => (_jsxs("li", { children: [a.nome, " - ", a.especialidade, " - ", new Date(a.data_nascimento).toLocaleDateString(), _jsx("button", { onClick: () => setEditing(a), children: "Editar" }), _jsx("button", { onClick: () => handleDelete(a.id), children: "Excluir" })] }, a.id))) })] }));
};
export default AstronautasPage;
