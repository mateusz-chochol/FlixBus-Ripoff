import { VariantType } from 'notistack';

export default interface Notification {
  id: string,
  message: string,
  variant: VariantType,
  persist: boolean,
}