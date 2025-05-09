import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Props {
  onSave: (dados: { astronautaId: number; missaoId: number }) => void;
}

const ParticipacaoForm: React.FC<Props> = ({ onSave }) => {
  const [astronautaId, setAstronautaId] = useState('');
  const [missaoId, setMissaoId] = useState('');
  const [astronautas, setAstronautas] = useState<any[]>([]);
  const [missoes, setMissoes] = useState<any[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [resAstronautas, resMissoes] = await Promise.all([
          api.get('/astronautas'),
          api.get('/missoes'),
        ]);
        setAstronautas(resAstronautas.data);
        setMissoes(resMissoes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar astronautas ou missões.');
      }
    };
    carregar();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <select value={astronautaId} onChange={e => setAstronautaId(e.target.value)}>
        <option value="">Selecione um astronauta</option>
        {astronautas.map((a: any) => (
          <option key={a.id} value={a.id}>{a.nome}</option>
        ))}
      </select>

      <select value={missaoId} onChange={e => setMissaoId(e.target.value)}>
        <option value="">Selecione uma missão</option>
        {missoes.map((m: any) => (
          <option key={m.id} value={m.id}>{m.nome}</option>
        ))}
      </select>

      <button type="submit">Vincular</button>
    </form>
  );
};

export default ParticipacaoForm;
