import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs"
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";

export default function BlogPage() {
  const id = useParams().id
  const user = useSelector(state => state.user)
  const [blog, setBlog] = useState()

  useEffect(() => {
    blogService.getBlog(id).then(data => setBlog(data))
  }, [id])


  function likeBlog(id, likes) {
    if (!id) return;
    const newBlogData = blogService.addLike(id, likes + 1, user.token);
    newBlogData.then((data) => {
      if (data.error) {
        return;
      }

      console.log(data)
      setBlog(data)
    });
  }

  function submitComment(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const comment = formData.get("comment")

    const newCommentRequest = blogService.addComment(blog.id, comment)
    newCommentRequest.then(data => setBlog(data))
  }

  if(!blog) return <p>loading...</p>


  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} <Button onClick={() => likeBlog(blog.id, blog.likes)}>like</Button></p>
      <p>added by {blog.user.username}</p>
      <div>
        <h2>Comments</h2>
        <Form onSubmit={submitComment}>
          <Input type="text" name="comment" />
          <Button type="submit">add comment</Button>
        </Form>
        <ul>
          {blog?.comments && blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div> 
  ) 
  
}
