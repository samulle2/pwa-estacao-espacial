import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ModuloForm from '../components/ModuloForm';
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth

const ModulosPage: React.FC = () => {
  const [modulos, setModulos] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth(); // Obtenha o usuário do contexto

  const fetchModulos = async () => {
    try {
      const res = await api.get('/modulos');
      setModulos(res.data);
    } catch (error) {
      console.error('Erro ao buscar módulos:', error);
      alert('Erro ao buscar módulos.');
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmar = confirm('Deseja excluir este módulo?');
    if (!confirmar) return;

    try {
      await api.delete(`/modulos/${id}`);
      alert('Módulo excluído com sucesso!');
      fetchModulos();
    } catch (error) {
      console.error('Erro ao excluir módulo:', error);
      alert('Erro ao excluir módulo.');
    }
  };

  const handleSave = async (dados: any) => {
    if (!dados.nome || !dados.funcao || !dados.missao_id) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      if (editing) {
        await api.put(`/modulos/${editing.id}`, dados);
        alert('Módulo atualizado com sucesso!');
        setEditing(null);
      } else {
        await api.post('/modulos', dados);
        alert('Módulo criado com sucesso!');
      }
      fetchModulos();
    } catch (error) {
      console.error('Erro ao salvar módulo:', error);
      alert('Erro ao salvar módulo.');
    }
  };

  return (
    <div>
      <h2>Módulos</h2>
      <ModuloForm onSave={handleSave} initialData={editing} />
      <ul>
        {modulos.map((m) => (
          <li key={m.id}>
            {m.nome} - {m.funcao} (Missão: {m.missao?.nome || 'sem vínculo'})
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

export default ModulosPage;