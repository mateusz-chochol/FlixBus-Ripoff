import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Box,
  Grow,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import ContactCardProps from 'types/Props/CheckoutPage/ContactCardProps';

const ContactCard: React.FC<ContactCardProps> = ({
  mail,
  setMail,
  phoneNumber,
  setPhoneNumber,
  error,
  removeError,
}) => {
  return (
    <Card onMouseDown={() => removeError('contact')}>
      <CardContent>
        <Box>
          <Typography variant='h4' color="textSecondary" gutterBottom>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              Contact
              <Grow in={error} timeout={350}>
                <ErrorIcon color='error' />
              </Grow>
            </Box>
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