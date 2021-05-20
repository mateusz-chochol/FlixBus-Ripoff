import React, {
  useState,
  useEffect
} from 'react';
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
import Passenger from 'types/Objects/Passenger';
import PassengersCardProps from 'types/Props/CheckoutPage/PassengersCardProps'

const PassengersCard: React.FC<PassengersCardProps> = ({
  selectedCartTrip,
  passengersForTrips,
  setPassengersForTrips,
  error,
  removeError,
}) => {
  const [passengers, setPassengers] = useState<Passenger[] | undefined>(passengersForTrips.find(passengersForTrip => passengersForTrip.cartTrip.trip.id === selectedCartTrip?.trip.id)?.passengers);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, passengerIndex: number) => {
    setPassengers(passengers => passengers?.map(passenger => {
      if (passenger.index === passengerIndex) {
        return {
          index: passenger.index,
          firstName: event.target.value,
          lastName: passenger.lastName
        }
      }

      return passenger;
    }));

    setPassengersForTrips(passengersForTrips.map(passengersForTrip => {
      if (passengersForTrip.cartTrip.trip.id === selectedCartTrip?.trip.id) {
        return {
          cartTrip: passengersForTrip.cartTrip,
          passengers: passengersForTrip.passengers.map(passenger => {
            if (passenger.index === passengerIndex) {
              return {
                index: passenger.index,
                firstName: event.target.value,
                lastName: passenger.lastName
              }
            }

            return passenger;
          })
        }
      }

      return passengersForTrip;
    }))
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, passengerIndex: number) => {
    setPassengers(passengers => passengers?.map(passenger => {
      if (passenger.index === passengerIndex) {
        return {
          index: passenger.index,
          firstName: passenger.firstName,
          lastName: event.target.value
        }
      }

      return passenger;
    }));

    setPassengersForTrips(passengersForTrips.map(passengersForTrip => {
      if (passengersForTrip.cartTrip.trip.id === selectedCartTrip?.trip.id) {
        return {
          cartTrip: passengersForTrip.cartTrip,
          passengers: passengersForTrip.passengers.map(passenger => {
            if (passenger.index === passengerIndex) {
              return {
                index: passenger.index,
                firstName: passenger.firstName,
                lastName: event.target.value
              }
            }

            return passenger;
          })
        }
      }

      return passengersForTrip;
    }))
  }

  useEffect(() => {
    setPassengers(passengersForTrips.find(passengersForTrip => passengersForTrip.cartTrip.trip.id === selectedCartTrip?.trip.id)?.passengers)
  }, [selectedCartTrip, passengersForTrips])

  return (
    <Card onMouseDown={() => removeError('passengers')}>
      <CardContent>
        <Box>
          <Typography variant='h4' color="textSecondary" gutterBottom>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              Passengers
              <Grow in={error} timeout={350}>
                <ErrorIcon color='error' />
              </Grow>
            </Box>
          </Typography>
          <Grid container direction='column'>
            {passengers?.map(({ index, firstName, lastName }) => {
              return (
                <Box paddingY={2} key={`${index}-${selectedCartTrip?.trip.id}`} >
                  <Grid item container justify='space-evenly'>
                    <Grid item xs={12}>
                      <Typography variant='h6' color='textSecondary'>{index + 1}.</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        value={firstName}
                        color='secondary'
                        fullWidth
                        variant='outlined'
                        label='First name'
                        onChange={(event) => handleFirstNameChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        value={lastName}
                        color='secondary'
                        fullWidth
                        variant='outlined'
                        label='Last name'
                        onChange={(event) => handleLastNameChange(event, index)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PassengersCard;