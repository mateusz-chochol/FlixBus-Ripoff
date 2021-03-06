import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Hidden,
  Button,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as SendFeedbackSvg } from 'svgs/send_feedback.svg';
import SendIcon from '@material-ui/icons/Send';
import { useNotifications } from 'components/Misc/Notifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentGrid: {
      height: "calc(100vh - 75px)",
      maxWidth: '100vw',
    },
    paper: {
      width: '100vw',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundColor: 'whitesmoke'
    },
  }),
);

const SendFeedbackPage: React.FC = () => {
  const classes = useStyles();
  const { showSuccess } = useNotifications();
  const [mail, setMail] = useState<string>('');

  const handleSendButtonClick = () => {
    if (mail.length > 0) {
      setMail('');
      showSuccess('Mail successfully sent to nowhere.')
    }
  }

  return (
    <Paper square className={classes.paper}>
      <Box display="flex">
        <Grid container alignItems='center' justify='center' className={classes.parentGrid}>
          <Hidden smDown>
            <Grid item xs={6}>
              <Box paddingY={5} paddingX={10}>
                <Typography variant='h4' gutterBottom>
                  Email
                </Typography>
                <Box paddingBottom={2}>
                  <Typography variant='subtitle1' gutterBottom>
                    Wanna share a tip or report a bug or just waste some time filling out the form that doesn't do anything? Try sending an email below.
                  </Typography>
                </Box>
                <TextField
                  multiline
                  inputProps={{
                    rowsMin: 10
                  }}
                  variant="filled"
                  fullWidth
                  value={mail}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMail(event.target.value)}
                />
                <Box display='flex' paddingTop={1} justifyContent='flex-end'>
                  <Button
                    color='primary'
                    variant='text'
                    disableElevation
                    endIcon={<SendIcon />}
                    onClick={handleSendButtonClick}
                  >
                    Send to nowhere
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' justifyItems='center' alignItems='center' flexDirection='column' maxHeight="80vh" paddingRight={5}>
                <Box paddingY={8}>
                  <Typography variant='h1' color='textSecondary' align='left'>Send feedback</Typography>
                </Box>
                <SendFeedbackSvg width='95%' height='100%' />
              </Box>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Box paddingTop={2} paddingBottom={2} paddingX={6}>
                <Typography variant='h4' gutterBottom>
                  Email
                </Typography>
                <Box paddingBottom={2}>
                  <Typography variant='subtitle1' gutterBottom>
                    Wanna share a tip or report a bug or just waste some time filling out the form that doesn't do anything? Try sending a mail below.
                  </Typography>
                </Box>
                <TextField
                  multiline
                  inputProps={{
                    rowsMin: 10
                  }}
                  variant="filled"
                  fullWidth
                  value={mail}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMail(event.target.value)}
                />
                <Box display='flex' paddingTop={1} justifyContent='flex-end'>
                  <Button
                    color='primary'
                    variant='text'
                    disableElevation
                    endIcon={<SendIcon />}
                    onClick={handleSendButtonClick}
                  >
                    Send to nowhere
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='center' paddingLeft={7} paddingRight={5} paddingBottom={3}>
                <SendFeedbackSvg width='85%' height='100%' />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Paper >
  )
}

export default SendFeedbackPage;