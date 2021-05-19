export default interface PaymentCardProps {
  paymentMethod: string,
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>,
}