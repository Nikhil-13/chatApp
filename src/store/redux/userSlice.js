import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    pendingMessages: [],
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
    clearPendingMessages: (state, action) => {
      state.pendingMessages = [];
    },
  },
});

export const {addUsers, addToPendingMessages, clearPendingMessages} =
  userSlice.actions;
export const selectUser = state => state.user.user;
export default userSlice.reducer;
