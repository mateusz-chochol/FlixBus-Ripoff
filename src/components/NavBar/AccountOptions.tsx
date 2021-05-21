import React, {
  useState,
  useEffect
} from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {
  IconButton,
  MenuItem,
  Menu,
  Button,
  ButtonGroup,
  Box,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { useNotifications } from 'components/Misc/Notifications';
import { routes } from 'routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '&&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }),
);

const AccountOptions: React.FC = () => {
  const classes = useStyles();
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
      showSuccess('Successfully logged out.')
      history.push(routes.mainPage);
    }
    catch {
      showError('Failed to log out.');
    }
  }

  return (
    currentUser ? <>
      <Box display='flex' justifyContent='flex-end'>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(event: React.MouseEvent<HTMLElement>) => { setMenuAnchorEl(event.currentTarget) }}
          color="inherit"
        >
          <AccountCircle />
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
      </Box>
    </> : <>
      <ButtonGroup
        variant="contained"
        color="primary"
        disableElevation
        fullWidth
        disableRipple
        disableFocusRipple
      >
        <Button className={classes.button} onClick={() => { history.push(routes.loginPage) }}>
          Login
        </Button>
        <Button className={classes.button} onClick={() => { history.push(routes.singupPage) }}>
          Signup
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AccountOptions
