import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ParticipacaoForm from '../components/ParticipacaoForm';
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
import DeleteIcon from '@mui/icons-material/Delete';

const ParticipacoesPage: React.FC = () => {
  const [participacoes, setParticipacoes] = useState<any[]>([]);
  const { usuario } = useAuth();

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Participações
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vincular Astronauta a Missão
        </Typography>
        <ParticipacaoForm onSave={handleSave} />
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Lista de Participações
      </Typography>
      <List>
        {participacoes.map((p: any) => (
          <ListItem key={p.id} divider>
            <ListItemText 
              primary={`${p.astronauta?.nome} participa da missão "${p.missao?.nome}"`} 
            />
            {usuario?.isAdmin && (
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(p.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ParticipacoesPage;