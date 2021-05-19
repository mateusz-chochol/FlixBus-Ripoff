import React from 'react';
import {
  Card,
  CardContent,
  FormControl,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from '@material-ui/core';
import PaymentCardProps from 'types/Props/CheckoutPage/PaymentCardProps';

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentMethod, setPaymentMethod }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant='h4' color="textSecondary" gutterBottom>
            Payment
          </Typography>
          <Box paddingY={2} paddingX={2}>
            <FormControl>
              <RadioGroup value={paymentMethod} onChange={handleChange}>
                <FormControlLabel value="Paypal" control={<Radio />} label={
                  <Box paddingX={2}>
                    <Typography variant='button' color={paymentMethod === 'Paypal' ? 'secondary' : undefined}>Paypal</Typography>
                  </Box>
                } />
                <FormControlLabel value="Credit card" control={<Radio />} label={
                  <Box paddingX={2}>
                    <Typography variant='button' color={paymentMethod === 'Credit card' ? 'secondary' : undefined}>Credit card</Typography>
                  </Box>
                } />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PaymentCard;