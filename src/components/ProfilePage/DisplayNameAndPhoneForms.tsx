import React from "react";
import {
  Box,
  TextField,
} from '@material-ui/core';
import DisplayNameAndPhoneFormsProps from 'types/Props/ProfilePage/DisplayNameAndPhoneFormsProps';

export const DisplayNameAndPhoneForms: React.FC<DisplayNameAndPhoneFormsProps> = ({
  displayName,
  setDisplayName,
  phoneNumber,
  setPhoneNumber,
  separateLines
}) => {
  if (separateLines) {
    return (
      <>
        <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
          <TextField
            variant='outlined'
            color='secondary'
            fullWidth
            label='Display name'
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
          <TextField
            variant='outlined'
            color='secondary'
            fullWidth
            label='Phone number'
            type='tel'
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Box>
      </>
    )
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' paddingTop={3} paddingBottom={2}>
      <Box paddingRight={1}>
        <TextField
          variant='outlined'
          color='secondary'
          fullWidth
          label='Display name'
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
      </Box>
      <Box paddingLeft={1}>
        <TextField
          variant='outlined'
          color='secondary'
          fullWidth
          label='Phone number'
          type='tel'
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </Box>
    </Box>
  )
}

export default DisplayNameAndPhoneForms