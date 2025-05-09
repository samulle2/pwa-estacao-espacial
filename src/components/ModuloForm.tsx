import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Props {
  onSave: (modulo: any) => void;
  initialData?: any;
}

const ModuloForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [funcao, setFuncao] = useState(initialData?.funcao || '');
  const [missaoId, setMissaoId] = useState(initialData?.missao_id || '');
  const [missoes, setMissoes] = useState<any[]>([]);

  useEffect(() => {
    api.get('/missoes').then(res => setMissoes(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do módulo" />
      <input value={funcao} onChange={e => setFuncao(e.target.value)} placeholder="Função" />
      <select value={missaoId} onChange={e => setMissaoId(e.target.value)}>
        <option value="">Selecione uma missão</option>
        {missoes.map((m: any) => (
          <option key={m.id} value={m.id}>{m.nome}</option>
        ))}
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ModuloForm;
