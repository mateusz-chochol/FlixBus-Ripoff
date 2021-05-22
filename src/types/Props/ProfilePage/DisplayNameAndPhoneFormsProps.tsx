export default interface DisplayNameAndPhoneFormsProps {
  displayName: string,
  setDisplayName: React.Dispatch<React.SetStateAction<string>>,
  phoneNumber: string,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  separateLines?: boolean,
}