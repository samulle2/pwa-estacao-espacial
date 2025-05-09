import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ParticipacaoForm from '../components/ParticipacaoForm';

const ParticipacoesPage: React.FC = () => {
  const [participacoes, setParticipacoes] = useState<any[]>([]);

  const fetchParticipacoes = async () => {
    try {
      const res = await api.get('/participacoes');
      setParticipacoes(res.data);
    } catch (error) {
      console.error('Erro ao buscar participações:', error);
      alert('Erro ao buscar participações.');
    }
  };

  useEffect(() => {
    fetchParticipacoes();
  }, []);

  const handleSave = async (dados: { astronautaId: number; missaoId: number }) => {
    try {
      await api.post('/participacoes', dados);
      alert('Participação criada com sucesso!');
      fetchParticipacoes();
    } catch (error) {
      console.error('Erro ao salvar participação:', error);
      alert('Erro ao salvar participação.');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja excluir esta participação?');
    if (!confirmar) return;

    try {
      await api.delete(`/participacoes/${id}`);
      alert('Participação excluída com sucesso!');
      fetchParticipacoes();
    } catch (error) {
      console.error('Erro ao excluir participação:', error);
      alert('Erro ao excluir participação.');
    }
  };

  return (
    <div>
      <h2>Participações</h2>
      <ParticipacaoForm onSave={handleSave} />
      <ul>
        {participacoes.map((p: any) => (
          <li key={p.id}>
            {p.astronauta?.nome} participa da missão "{p.missao?.nome}"
            <button onClick={() => handleDelete(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipacoesPage;
