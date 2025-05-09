import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
const ParticipacaoForm = ({ onSave }) => {
    const [astronautaId, setAstronautaId] = useState('');
    const [missaoId, setMissaoId] = useState('');
    const [astronautas, setAstronautas] = useState([]);
    const [missoes, setMissoes] = useState([]);
    useEffect(() => {
        const carregar = async () => {
            try {
                const [resAstronautas, resMissoes] = await Promise.all([
                    api.get('/astronautas'),
                    api.get('/missoes'),
                ]);
                setAstronautas(resAstronautas.data);
                setMissoes(resMissoes.data);
            }
            catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao carregar astronautas ou missões.');
            }
        };
        carregar();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!astronautaId || !missaoId) {
            alert('Selecione um astronauta e uma missão.');
            return;
        }
        onSave({
            astronautaId: Number(astronautaId),
            missaoId: Number(missaoId),
        });
        setAstronautaId('');
        setMissaoId('');
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("select", { value: astronautaId, onChange: e => setAstronautaId(e.target.value), children: [_jsx("option", { value: "", children: "Selecione um astronauta" }), astronautas.map((a) => (_jsx("option", { value: a.id, children: a.nome }, a.id)))] }), _jsxs("select", { value: missaoId, onChange: e => setMissaoId(e.target.value), children: [_jsx("option", { value: "", children: "Selecione uma miss\u00E3o" }), missoes.map((m) => (_jsx("option", { value: m.id, children: m.nome }, m.id)))] }), _jsx("button", { type: "submit", children: "Vincular" })] }));
};
export default ParticipacaoForm;
