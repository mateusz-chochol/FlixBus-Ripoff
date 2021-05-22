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
  Typography,
  Divider,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

  const handleLogoutButtonClick = async () => {
    try {
      await logout();

      showSuccess('Successfully logged out.')

      if (history.location.pathname === routes.profilePage || history.location.pathname === routes.tripsPage) {
        history.push(routes.mainPage);
      }
    }
    catch {
      showError('Failed to log out.');
    }
  }

  const handleProfileButtonClick = () => {
    history.push(routes.profilePage);
    setMenuAnchorEl(null);
  }

  const handleTripsButtonClick = () => {
    history.push(routes.tripsPage);
    setMenuAnchorEl(null);
  }

  useEffect(() => {
    return () => setMenuAnchorEl(null);
  }, [currentUser])

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
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={() => setMenuAnchorEl(null)}
        >
          <Box display='flex' flexDirection='column' width='200px'>
            <MenuItem onClick={handleProfileButtonClick}>
              <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                <Typography>Profile</Typography>
                <PersonIcon color='action' />
              </Box>
            </MenuItem>
            <Divider variant='middle' />
            <MenuItem onClick={handleTripsButtonClick}>
              <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                <Typography>Trips</Typography>
                <DirectionsBusIcon color='action' />
              </Box>
            </MenuItem>
            <Divider variant='middle' />
            <MenuItem onClick={handleLogoutButtonClick}>
              <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                <Typography>Logout</Typography>
                <ExitToAppIcon color='action' />
              </Box>
            </MenuItem>
          </Box>
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
        <Button className={classes.button} onClick={() => history.push(routes.loginPage)}>
          Login
        </Button>
        <Button className={classes.button} onClick={() => history.push(routes.signupPage)}>
          Signup
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AccountOptions
