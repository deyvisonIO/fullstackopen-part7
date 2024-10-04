import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../services/user"
import { Link } from "react-router-dom";


export default function Users() {
  const user = useSelector(state => state.user)
  const [users, setUsers]= useState([])

  useEffect(() => {
    userService.getAll().then(data => setUsers(data))
  }, [])

  if(!users) return <p>loading...</p>

  return ( 
    <>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <h2>Users</h2>
      <div>
        {users.length > 0 && (
          <table>
            <tr>
              <th></th>   
              <th>blogs created</th>   
            </tr> 
            {users.map(user => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user?.blogs?.length || 1}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
     
  )
}
