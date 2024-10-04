import { useEffect, useState } from "react";
import userService from "../services/user"
import { useParams } from "react-router-dom";

export default function User() {
  const id = useParams().id;
  const [fetchedUser, setFetchedUser]= useState([])

  useEffect(() => {
    userService.getUser(id).then(data => setFetchedUser(data))
  }, [id])

  if(!fetchedUser) return <p>Loading...</p>

  if(fetchedUser.error) return <p>An error ocurred when fetching the user</p>

  return ( 
    <div>
      <h2>{fetchedUser.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {fetchedUser?.blogs?.length > 0 ? fetchedUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>) : <p>No blogs found</p>}
      </ul>
    </div>
  )
}
