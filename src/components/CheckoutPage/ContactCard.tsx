import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';

const ContactCard: React.FC = () => {
  const [mail, setMail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant='h4' color="textSecondary" gutterBottom>
            Contact
          </Typography>
          <Box paddingY={2}>
            <Grid item container justify='space-evenly'>
              <Grid item xs={5}>
                <TextField
                  value={mail}
                  color='secondary'
                  fullWidth
                  variant='outlined'
                  label='Email'
                  type='email'
                  onChange={(event) => setMail(event.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={phoneNumber}
                  color='secondary'
                  fullWidth
                  variant='outlined'
                  label='Phone number'
                  type='tel'
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ContactCard;