import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login"
import Notification from "./Notification";

export default function Login() {
  const dispatch = useDispatch()
  function submitLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return;
    }

    const userData = loginService.login(username, password);
    userData.then((data) =>
      data.error
        ? dispatch(notify({ content: data.error, type: "error" }))
        : addUser(data),
    );
  }

  function addUser(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={submitLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type your username"
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Type your password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
