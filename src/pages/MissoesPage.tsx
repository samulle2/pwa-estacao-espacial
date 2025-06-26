import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MissaoForm from '../components/MissaoForm';
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth

const MissoesPage: React.FC = () => {
  const [missoes, setMissoes] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth(); // Obtenha o usuário do contexto

  const fetchMissoes = async () => {
    try {
      const res = await api.get('/missoes');
      setMissoes(res.data);
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
      alert('Erro ao buscar missões.');
    }
  };

  useEffect(() => {
    fetchMissoes();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja excluir esta missão?');
    if (!confirmar) return;

    try {
      await api.delete(`/missoes/${id}`);
      alert('Missão excluída com sucesso!');
      fetchMissoes();
    } catch (error: any) {
      console.error('Erro ao excluir missão:', error);
      if (error.response?.status === 500) {
        alert('Não é possível excluir uma missão que possui módulos vinculados.');
      } else {
        alert('Erro ao excluir missão.');
      }
    }
  };

  const handleSave = async (dados: any) => {
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
      } else {
        await api.post('/missoes', dados);
        alert('Missão criada com sucesso!');
      }
      fetchMissoes();
    } catch (error) {
      console.error('Erro ao salvar missão:', error);
      alert('Erro ao salvar missão. Verifique os dados.');
    }
  };

  return (
    <div>
      <h2>Missões</h2>
      <MissaoForm onSave={handleSave} initialData={editing} />
      <ul>
        {missoes.map((m) => (
          <li key={m.id}>
            {m.nome} - {m.descricao} <br />
            {new Date(m.data_inicio).toLocaleDateString()} → {new Date(m.data_fim).toLocaleDateString()}
            <button onClick={() => setEditing(m)}>Editar</button>
            
            {/* Mostrar apenas para admins */}
            {usuario?.isAdmin && (
              <button onClick={() => handleDelete(m.id)}>Excluir</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissoesPage;