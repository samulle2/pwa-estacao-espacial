import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

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
      // Recarregar dados do usuário
      const res = await api.get('/usuario/perfil');
      if (res.data) {
        // Atualizar contexto (seria melhor implementar refresh no contexto)
        setNome(res.data.nome);
        setEmail(res.data.email);
      }
    } catch (error) {
      setMensagem('Erro ao atualizar perfil.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Perfil do Usuário</h2>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
          Atualizar
        </button>
        <button onClick={logout} style={{ padding: '10px 20px', background: '#f44336' }}>
          Sair
        </button>
      </form>
    </div>
  );
};

export default PerfilPage;