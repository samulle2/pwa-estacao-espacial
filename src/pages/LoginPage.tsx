import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Correção definitiva para o borderRadius
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: typeof theme.shape.borderRadius === 'number' 
    ? theme.shape.borderRadius * 2 
    : 16,
  boxShadow: theme.shadows[4],
}));

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate('/');
    } catch (error) {
      setErro('Falha no login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <StyledPaper elevation={3}>
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Login
          </Typography>
          
          {erro && (
            <Typography 
              color="error" 
              sx={{ mb: 2, textAlign: 'center' }}
            >
              {erro}
            </Typography>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-mail"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            
            {/* Solução definitiva sem Grid */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2
            }}>
              <Link 
                component="button" 
                variant="body2"
                onClick={() => alert('Funcionalidade ainda não implementada')}
              >
                Esqueceu a senha?
              </Link>
              <Link 
                component={RouterLink} 
                to="/registro" 
                variant="body2"
              >
                Não tem conta? Registre-se
              </Link>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default LoginPage;