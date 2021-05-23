import React from "react";
import {
  Box,
  Typography,
  TextField,
} from '@material-ui/core';
import NewPasswordFormsProps from 'types/Props/ProfilePage/NewPasswordFormsProps';

export const NewPasswordForms: React.FC<NewPasswordFormsProps> = ({
  newPassword,
  setNewPassword,
  confirmedPassword,
  setConfirmedPassword,
}) => {
  return (
    <>
      <Box paddingX={2} paddingTop={3}>
        <Typography variant='h5' align='center' color='textSecondary'>Change password</Typography>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
        <TextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          variant='outlined'
          color='secondary'
          fullWidth
          label='New password'
          type='password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
        <TextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          variant='outlined'
          color='secondary'
          fullWidth
          label='Confirm new password'
          type='password'
          value={confirmedPassword}
          onChange={(event) => setConfirmedPassword(event.target.value)}
        />
      </Box>
    </>
  )
}

export default NewPasswordForms