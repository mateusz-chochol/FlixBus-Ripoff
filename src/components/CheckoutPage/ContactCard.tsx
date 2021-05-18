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
                  color='secondary'
                  fullWidth
                  variant='outlined'
                  label='Mail'
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  color='secondary'
                  fullWidth
                  variant='outlined'
                  label='Phone number'
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