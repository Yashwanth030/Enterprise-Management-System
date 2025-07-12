// redux/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  },
  reducers: {
   addNotification: (state, action) => {
  state.notifications.unshift({
    id: Date.now(),
    message: action.payload.message,
    read: false,
    time: new Date().toLocaleString(),
    role: action.payload.role,   // ✅ must be added
    type: action.payload.type    // ✅ must be added
  });
},

    markAsRead: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.notifications[index].read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
