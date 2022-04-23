import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { signOut } from '../../services/AuthenticatorService';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import { getPayload } from '../../helpers/AuthenticatorHelper';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const userLogged = {
    avatar: '#',
  };
  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPayload();
      setUserName(response.userName);
    };
    if (!isLoadData) {
      setLoadData(true);
      fetchData().then();
    }
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut);
    window.location.href = '/login';
  };

  const goProfile = () => {
    navigate('/admin/trocar-senha');
    handleClose();
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Usuário">
            <Avatar
              onClick={handleClick}
              sx={{
                height: 45,
                width: 45,
                ml: 1,
              }}
            ></Avatar>
          </Tooltip>
          <div>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
              <MenuItem>
                <ListItemIcon>
                  <Avatar
                    src={userLogged?.avatar || '#'}
                    sx={{
                      height: 50,
                      width: 50,
                    }}
                  ></Avatar>
                </ListItemIcon>
                <ListItemText sx={{ p: 2 }}>{userName || 'Usuário'}</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={goProfile}>
                <ListItemIcon>
                  <PersonIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
