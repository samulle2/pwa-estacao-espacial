import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ModuloForm from '../components/ModuloForm';
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

const ModulosPage: React.FC = () => {
  const [modulos, setModulos] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { usuario } = useAuth();

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Módulos
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editing ? 'Editar Módulo' : 'Adicionar Novo Módulo'}
        </Typography>
        <ModuloForm onSave={handleSave} initialData={editing} />
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Lista de Módulos
      </Typography>
      <List>
        {modulos.map((m) => (
          <ListItem key={m.id} divider>
            <ListItemText 
              primary={m.nome} 
              secondary={`${m.funcao} - Missão: ${m.missao?.nome || 'sem vínculo'}`} 
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

export default ModulosPage;