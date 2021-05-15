import React from 'react';
import {
  Box,
  // Typography,
  Paper,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { ReactComponent as SendFeedbackSvg } from 'svgs/send_feedback.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
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
    fixedItem: {
      pointerEvents: 'none'
    },
  }),
);

const SendFeedbackPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 75px)"
        width="100vw"
      >
        <SendFeedbackSvg />
        {/* <Typography variant='h1'>
          <Box alignSelf='center' justifySelf='center'>Send feedback page</Box>
        </Typography> */}
      </Box>
    </Paper>
  )
}

export default SendFeedbackPage;