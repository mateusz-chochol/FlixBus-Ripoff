import { useDispatch } from 'react-redux';
import { addNotificationActionCreator } from '../redux/NotificationsSlice';
import { v1 as uuid } from 'uuid';

interface NotificationsFunctions {
  showError: (message: string, persist?: boolean) => void,
  showSuccess: (message: string, persist?: boolean) => void,
  showWarning: (message: string, persist?: boolean) => void,
  showInfo: (message: string, persist?: boolean) => void,
}

export const useNotifications = () => {
  const dispatch = useDispatch();

  const functions: NotificationsFunctions = {
    showError: (message: string, persist?: boolean) => {
      dispatch(addNotificationActionCreator({ id: uuid(), message, variant: 'error', persist: persist ?? true }));
    },
    showSuccess: (message: string, persist?: boolean) => {
      dispatch(addNotificationActionCreator({ id: uuid(), message, variant: 'success', persist: persist ?? false }));
    },
    showWarning: (message: string, persist?: boolean) => {
      dispatch(addNotificationActionCreator({ id: uuid(), message, variant: 'warning', persist: persist ?? true }));
    },
    showInfo: (message: string, persist?: boolean) => {
      dispatch(addNotificationActionCreator({ id: uuid(), message, variant: 'info', persist: persist ?? true }));
    }
  };

  return functions;
}