import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AstronautaForm from '../components/AstronautaForm';
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

const AstronautasPage: React.FC = () => {
  const [astronautas, setAstronautas] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth();

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Astronautas
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editing ? 'Editar Astronauta' : 'Adicionar Novo Astronauta'}
        </Typography>
        <AstronautaForm onSave={handleSave} initialData={editing} />
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Lista de Astronautas
      </Typography>
      <List>
        {astronautas.map((a) => (
          <ListItem key={a.id} divider>
            <ListItemText 
              primary={a.nome} 
              secondary={`${a.especialidade} - ${new Date(a.data_nascimento).toLocaleDateString('pt-BR')}`} 
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => setEditing(a)}>
                <EditIcon />
              </IconButton>
              {usuario?.isAdmin && (
                <IconButton edge="end" onClick={() => handleDelete(a.id)}>
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

export default AstronautasPage;