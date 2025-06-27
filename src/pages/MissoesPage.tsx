import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MissaoForm from '../components/MissaoForm';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MissoesPage: React.FC = () => {
  const [missoes, setMissoes] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth();

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Missões
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editing ? 'Editar Missão' : 'Adicionar Nova Missão'}
        </Typography>
        <MissaoForm onSave={handleSave} initialData={editing} />
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Lista de Missões
      </Typography>
      <List>
        {missoes.map((m) => (
          <ListItem key={m.id} divider>
            <ListItemText 
              primary={m.nome} 
              secondary={
                <div>
                  <div>{m.descricao}</div>
                  <div>
                    {new Date(m.data_inicio).toLocaleDateString('pt-BR')} → 
                    {new Date(m.data_fim).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              } 
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => setEditing(m)}>
                <EditIcon />
              </IconButton>
              {usuario?.isAdmin && (
                <IconButton edge="end" onClick={() => handleDelete(m.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MissoesPage;