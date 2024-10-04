import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    content: "",
    type: ""
  },
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state 
    },
    clear() {
      return ""
    }
  }
})


export const {setNotification, clear} = notificationSlice.actions

export function notify(notification) {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(clear()), 5000)
  }
}

export default notificationSlice.reducer
