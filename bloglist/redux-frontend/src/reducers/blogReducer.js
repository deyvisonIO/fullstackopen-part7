import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      console.log("state:", state)
      const index = state.findIndex(i => i.id === action.payload.id)
      state[index] = { ...action.payload, user: state[index].user }
      state.sort((a,b) => b.votes - a.votes)
    },
    removeBlog(state,action) {
      return state.filter(i => i.id !== action.payload.id)
    }
  },
})


export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer
