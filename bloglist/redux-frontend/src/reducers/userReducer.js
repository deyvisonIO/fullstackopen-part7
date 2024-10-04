import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(window.localStorage.getItem("user")),
  reducers: {
    setUser(state, action) {
      return JSON.stringify(action.payload)
    },
    logout() {
      return null
    }
  }
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
