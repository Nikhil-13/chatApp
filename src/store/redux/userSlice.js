import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = [];
      for (const key in action.payload) {
        state.users.push(action.payload[key]);
      }
    },
  },
});

export const {addUsers} = userSlice.actions;
export const selectUser = state => state.user.user;
export default userSlice.reducer;
