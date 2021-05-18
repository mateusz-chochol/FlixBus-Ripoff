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
} from '@material-ui/core';
import PassengersForTrip from 'types/Objects/PassengersForTrip';
import CartTrip from 'types/Objects/CartTrip';
import Passenger from 'types/Objects/Passenger';

interface PassengersCardProps {
  selectedCartTrip?: CartTrip,
  passengersForTrips: PassengersForTrip[],
  setPassengersForTrips: (value: React.SetStateAction<PassengersForTrip[]>) => void,
}

const PassengersCard: React.FC<PassengersCardProps> = ({ selectedCartTrip, passengersForTrips, setPassengersForTrips }) => {
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
  }, [selectedCartTrip])

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant='h4' color="textSecondary" gutterBottom>
            Passengers
          </Typography>
          <Grid container direction='column'>
            {passengers?.map(({ index, firstName, lastName }) => {
              return (
                <Box paddingY={2}>
                  <Grid key={`${index}-${selectedCartTrip?.trip.id}`} item container justify='space-evenly'>
                    <Grid item xs={12}>
                      <Typography variant='h6' color='textSecondary'>{index + 1}.</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        value={firstName}
                        fullWidth
                        variant='outlined'
                        label='First name'
                        onChange={(event) => handleFirstNameChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        value={lastName}
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