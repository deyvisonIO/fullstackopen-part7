import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd"

export default function Header() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  function logoutUser() {
    window.localStorage.removeItem("user");
    dispatch(logout());
  }

  return (
    <>
      <Flex gap={4}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user.username} logged in
        <Button Click={logoutUser}>logout</Button>
      </Flex>

      <h2>blog app</h2>
    </>
  )
  
}
