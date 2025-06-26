import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Menu: React.FC = () => {
  const { usuario, logout, carregando } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">Astronautas</Link>
      <Link style={styles.link} to="/missoes">Missões</Link>
      <Link style={styles.link} to="/modulos">Módulos</Link>
      <Link style={styles.link} to="/participacoes">Participações</Link>
      
      {usuario ? (
        <>
          <Link style={styles.link} to="/perfil">Perfil</Link>
          <button onClick={handleLogout} style={styles.link}>
            Sair
          </button>
          {usuario.isAdmin && <span style={{ color: 'gold' }}>(Admin)</span>}
        </>
      ) : (
        <>
          <Link style={styles.link} to="/login">Login</Link>
          <Link style={styles.link} to="/registro">Registro</Link>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    background: '#222',
    padding: '10px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
  }
};

export default Menu;