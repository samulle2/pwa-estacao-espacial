import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  Menu as MuiMenu, 
  MenuItem, 
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const MenuBar: React.FC = () => {
  const { usuario, logout, carregando } = useAuth();
  const navigate = useNavigate();
  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNavAnchorEl(event.currentTarget);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setNavAnchorEl(null);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleNavMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MuiMenu
            anchorEl={navAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(navAnchorEl)}
            onClose={handleNavMenuClose}
          >
            <MenuItem component={Link} to="/" onClick={handleNavMenuClose}>Astronautas</MenuItem>
            <MenuItem component={Link} to="/missoes" onClick={handleNavMenuClose}>Missões</MenuItem>
            <MenuItem component={Link} to="/modulos" onClick={handleNavMenuClose}>Módulos</MenuItem>
            <MenuItem component={Link} to="/participacoes" onClick={handleNavMenuClose}>Participações</MenuItem>
          </MuiMenu>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestão Espacial
          </Typography>
        </Box>

        {usuario ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && usuario.isAdmin && (
              <Typography variant="caption" sx={{ mr: 1, color: 'gold' }}>
                (Admin)
              </Typography>
            )}
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            
            <MuiMenu
              id="menu-appbar"
              anchorEl={userAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(userAnchorEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem component={Link} to="/perfil" onClick={handleUserMenuClose}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </MuiMenu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/registro">Registro</Button>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default MenuBar;