import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AstronautaForm from '../components/AstronautaForm';
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth

const AstronautasPage: React.FC = () => {
  const [astronautas, setAstronautas] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth(); // Obtenha o usuário do contexto

  const fetchAstronautas = async () => {
    try {
      const res = await api.get('/astronautas');
      setAstronautas(res.data);
    } catch (error) {
      console.error('Erro ao buscar astronautas:', error);
      alert('Erro ao buscar astronautas.');
    }
  };

  useEffect(() => {
    fetchAstronautas();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = confirm('Deseja excluir este astronauta?');
    if (!confirmar) return;

    try {
      await api.delete(`/astronautas/${id}`);
      alert('Astronauta excluído com sucesso!');
      fetchAstronautas();
    } catch (error) {
      console.error('Erro ao excluir astronauta:', error);
      alert('Erro ao excluir astronauta.');
    }
  };

  const handleSave = async (dados: any) => {
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
      } else {
        await api.post('/astronautas', dados);
        alert('Astronauta cadastrado com sucesso!');
      }
      fetchAstronautas();
    } catch (error) {
      console.error('Erro ao salvar astronauta:', error);
      alert('Erro ao salvar astronauta. Verifique o console.');
    }
  };

  return (
    <div>
      <h2>Astronautas</h2>
      <AstronautaForm onSave={handleSave} initialData={editing} />
      <ul>
        {astronautas.map((a) => (
          <li key={a.id}>
            {a.nome} - {a.especialidade} - {new Date(a.data_nascimento).toLocaleDateString()}
            <button onClick={() => setEditing(a)}>Editar</button>
            
            {/* Mostrar apenas para admins */}
            {usuario?.isAdmin && (
              <button onClick={() => handleDelete(a.id)}>Excluir</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AstronautasPage;