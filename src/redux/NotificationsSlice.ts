import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import Notification from 'types/Objects/Notification';
import { AppState } from './RootReducer';

const notificationsInitialState: Notification[] = new Array<Notification>()

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.push(payload)
    },
    removeNotification: (state, { payload }: PayloadAction<{ id: string }>) => {
      const notificationToRemoveIndex = current(state).findIndex(notification => notification.id === payload.id)

      if (notificationToRemoveIndex > -1) {
        state.splice(notificationToRemoveIndex, 1);
      }
    }
  }
})

export const selectNotifications = (state: AppState) => state.notifications;

export const {
  addNotification: addNotificationActionCreator,
  removeNotification: removeNotificationActionCreator
} = notificationsSlice.actions;

export default notificationsSlice.reducer