export default interface ContactCardProps {
  mail: string,
  setMail: React.Dispatch<React.SetStateAction<string>>,
  phoneNumber: string,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  error: boolean,
  removeError: (value: string) => void
}