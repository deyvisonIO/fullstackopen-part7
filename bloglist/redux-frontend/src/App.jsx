import Login from "./components/Login";
import BlogList from "./components/BlogList";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Header from "./components/Header";
import BlogPage from "./components/BlogPage";

const App = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Login />
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />}/>
        <Route path="/blogs" element={<BlogList />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/users/:id" element={<User />}/>
        <Route path="/blogs/:id" element={<BlogPage />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
