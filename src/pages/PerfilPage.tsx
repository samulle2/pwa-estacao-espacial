import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper
} from '@mui/material';

const PerfilPage: React.FC = () => {
  const { usuario, logout } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, [usuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/usuario/perfil', { nome, email });
      setMensagem('Perfil atualizado com sucesso!');
    } catch (error) {
      setMensagem('Erro ao atualizar perfil.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 3, width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Perfil do Usuário
          </Typography>
          
          {mensagem && (
            <Typography 
              color={mensagem.includes('sucesso') ? "success.main" : "error.main"} 
              sx={{ mb: 2, textAlign: 'center' }}
            >
              {mensagem}
            </Typography>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '48%' }}
              >
                Atualizar
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '48%' }}
                onClick={logout}
              >
                Sair
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PerfilPage;