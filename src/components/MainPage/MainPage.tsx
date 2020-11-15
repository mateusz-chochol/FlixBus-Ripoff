import React from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const MainPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
    >
      <Box minWidth="30%">
        <Paper elevation={4}>
          <TextField
            id="search-bar"
            label="Search destination"
            variant="filled"
            color="primary"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default MainPage;
