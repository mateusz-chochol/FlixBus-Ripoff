import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Fab,
  Grow,
  Tooltip,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useNotifications } from 'components/Misc/Notifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 'auto',
      boxShadow: 'none',
      background: 'gainsboro',
    },
    cardContent: {
      '&:last-child': {
        paddingBottom: 0,
      },
      paddingBottom: 0,
    },
    cardTypography: {
      whiteSpace: 'nowrap'
    },
    cardBox: {
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        height: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
      },
      paddingBottom: '12px'
    }
  }),
);

const TextCard: React.FC<{ cardTextTable: string[] }> = ({ cardTextTable }) => {
  const classes = useStyles();
  const { showSuccess, showError } = useNotifications();
  const [shouldDisplayButton, setShouldDisplayButton] = useState<boolean>(false);

  const handleCopyButtonClick = () => {
    const textToCopy = cardTextTable.join('\n');

    try {
      navigator.clipboard.writeText(textToCopy);

      showSuccess('Text copied to clipboard!');
    }
    catch {
      showError('Unable to copy the text to clipboard.');
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent
        className={classes.cardContent}
        onMouseOver={() => setShouldDisplayButton(true)}
        onMouseLeave={() => setShouldDisplayButton(false)}
      >
        <Box position='relative'>
          <Box position='absolute' right={0} top={0}>
            <Grow in={shouldDisplayButton} timeout={350}>
              <Tooltip title='Copy' arrow>
                <Fab size='small' onClick={handleCopyButtonClick}>
                  <FileCopyIcon fontSize='small' />
                </Fab>
              </Tooltip>
            </Grow>
          </Box>
          <Box className={classes.cardBox}>
            {cardTextTable.map((line, index) =>
              <Typography key={index} color="textSecondary" className={classes.cardTypography}>{line}</Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TextCard;