import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">Astronautas</Link>
      <Link style={styles.link} to="/missoes">Missões</Link>
      <Link style={styles.link} to="/modulos">Módulos</Link>
      <Link style={styles.link} to="/participacoes">Participações</Link>

    </nav>
  );
};

const styles = {
  nav: {
    background: '#222',
    padding: '10px',
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  }
};

export default Menu;
