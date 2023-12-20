import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    pendingMessages: [],
    pendingToDelete: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = [];
      for (const key in action.payload) {
        state.users.push(action.payload[key]);
      }
    },

    addToPendingMessages: (state, action) => {
      state.pendingMessages.push(action.payload);
    },
    pendingToDeleteMessages: (state, action) => {
      state.pendingToDelete.push(action.payload);
    },
    clearPendingMessages: state => {
      state.pendingMessages = [];
    },
    clearPendingToDeleteMessages: state => {
      state.pendingToDelete = [];
    },
  },
});

export const {
  addUsers,
  addToPendingMessages,
  clearPendingMessages,
  pendingToDeleteMessages,
  clearPendingToDeleteMessages,
} = userSlice.actions;
export const selectUser = state => state.user.user;
export default userSlice.reducer;
