import React, {
  useState,
  useEffect
} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {
  IconButton,
  MenuItem,
  Menu,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useNotifications } from '../Misc/Notifications';

const AccountOptions: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { currentUser, logout } = useAuth();
  const { showError, showSuccess } = useNotifications();
  const history = useHistory();
  const open = Boolean(menuAnchorEl);

  useEffect(() => {
    return () => setMenuAnchorEl(null);
  }, [currentUser])

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess('Successfully logged out')
      history.push('/');
    }
    catch {
      showError('Failed to log out');
    }
  }

  return (
    currentUser ? <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event: React.MouseEvent<HTMLElement>) => { setMenuAnchorEl(event.currentTarget) }}
        color="inherit"
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => { setMenuAnchorEl(null) }}
      >
        <MenuItem onClick={() => { setMenuAnchorEl(null) }}>Profile</MenuItem>
        <MenuItem onClick={() => { setMenuAnchorEl(null) }}>Trips</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </> : <>
        <ButtonGroup
          aria-label="button group"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
        >
          <Button onClick={() => { history.push('/login') }}>
            Log In
          </Button>
          <Button onClick={() => { history.push('/signup') }}>
            Sign Up
          </Button>
        </ButtonGroup>
      </>
  )
}

export default AccountOptions
