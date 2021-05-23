import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import TransactionsHistoryProps from 'types/Props/ProfilePage/TransactionsHistoryProps';

export const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ transactions, isLoading }) => {
  return (
    <Box paddingBottom={8}>
      {isLoading ?
        <Box display='flex' alignItems='center' justifyContent='center' paddingTop={5}>
          <CircularProgress color='secondary' thickness={1.5} size={75} />
        </Box> :
        (transactions.length > 0 ?
          <>
            <Box paddingX={2} paddingTop={3}>
              <Typography variant='h5' align='center' color='textSecondary'>Transactions history</Typography>
            </Box>
            <Box>
              <List>
                {transactions.map(transaction => {
                  return (
                    <ListItem key={transaction.id} divider>
                      <Grid container direction='column'>
                        <Grid item>
                          <Typography color='textSecondary'>id: <b>{transaction.id}</b></Typography>
                        </Grid>
                        <Grid item>
                          <Typography color='textSecondary'>date: <b>{transaction.date}</b></Typography>
                        </Grid>
                        <Grid item>
                          <Typography color='textSecondary'>cost: <b>{transaction.price}$</b></Typography>
                        </Grid>
                        <Grid item>
                          <Typography color='textSecondary'>trips: <b>{transaction.tripIds.length}</b></Typography>
                        </Grid>
                        <Grid item>
                          <Typography color='textSecondary'>total seats: <b>{transaction.tripIds.map(trip => trip.seats).reduce((acc, cur) => acc + cur)}</b></Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                })}
              </List>
              <Typography></Typography>
            </Box>
          </> :
          <Box paddingX={2} paddingY={3}>
            <Typography variant='h5' align='center' color='textSecondary'>Nothing in transactions history yet.</Typography>
          </Box>
        )
      }
    </Box>
  )
}

export default TransactionsHistory;