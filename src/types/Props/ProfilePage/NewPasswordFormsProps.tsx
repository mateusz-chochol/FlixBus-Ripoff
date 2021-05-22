export default interface NewPasswordFormsProps {
  newPassword: string,
  setNewPassword: React.Dispatch<React.SetStateAction<string>>,
  confirmedPassword: string,
  setConfirmedPassword: React.Dispatch<React.SetStateAction<string>>,
}