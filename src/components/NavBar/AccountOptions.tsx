import React, {
  useState,
  useEffect
} from 'react';
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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useNotifications } from 'components/Misc/Notifications';
import { routes } from 'routes';
import { useDispatch } from 'react-redux';
import { clearTransactionsActionCreator } from 'redux/TransactionsSlice';

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
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { currentUser, userTokenResult, logout } = useAuth();
  const { showError, showSuccess } = useNotifications();
  const history = useHistory();
  const open = Boolean(menuAnchorEl);

  const handleLogoutButtonClick = async () => {
    try {
      await logout();

      dispatch(clearTransactionsActionCreator());

      showSuccess('Successfully logged out.');
    }
    catch {
      showError('Failed to log out.');
    }
  }

  const handleProfileButtonClick = () => {
    history.push(routes.profilePage);
    setMenuAnchorEl(null);
  }

  const handleYourTripsButtonClick = () => {
    history.push(routes.yourTripsPage);
    setMenuAnchorEl(null);
  }

  const handleAdminPanelButtonClick = () => {
    history.push(routes.adminPage);
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
          onClick={(event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget)}
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
            <Typography gutterBottom variant='subtitle2' color='textSecondary' align='center'>Account balance: {currentUser.balance}$</Typography>
            <Divider />
            <MenuItem onClick={handleProfileButtonClick}>
              <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                <Typography>Profile</Typography>
                <PersonIcon color='action' />
              </Box>
            </MenuItem>
            <MenuItem onClick={handleYourTripsButtonClick}>
              <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                <Typography>Your trips</Typography>
                <DirectionsBusIcon color='action' />
              </Box>
            </MenuItem>
            {userTokenResult?.claims.admin &&
              <MenuItem onClick={handleAdminPanelButtonClick}>
                <Box display='flex' justifyContent='space-between' width='100%' padding={1}>
                  <Typography>Admin panel</Typography>
                  <SupervisorAccountIcon color='action' />
                </Box>
              </MenuItem>
            }
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
