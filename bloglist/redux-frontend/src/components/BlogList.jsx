import { useEffect } from "react";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import Notification from "./Notification";

import blogService from "../services/blogs";

import { notify } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogs,
  addBlog,
  updateBlog,
  removeBlog,
} from "../reducers/blogReducer";
import { Flex } from "antd";

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  function submitBlog(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const url = formData.get("url");

    if (!title || !author || !url) {
      return;
    }

    const userData = blogService.create(title, author, url, user.token);
    userData.then((data) => {
      if (data.error) {
        dispatch(notify({ content: data.error, type: "error" }));
        return;
      }

      dispatch(addBlog(data));
      dispatch(notify({ content: "Blog created!", type: "success" }));
    });
  }

  function handleBlogRemoval(id, title, author) {
    if (!confirm(`Remove blog ${title} by ${author}`)) return;

    const blogData = blogService.remove(id, user.token);
    blogData.then((data) => {
      if (data.error) {
        dispatch(notify({ content: data.error, type: "error" }));
        return;
      }
      dispatch(removeBlog(data));
    });
  }

  function likeBlog(id, likes) {
    if (!id) return;
    const newBlogData = blogService.addLike(id, likes + 1, user.token);
    newBlogData.then((data) => {
      if (data.error) {
        dispatch(notify({ content: data.error, type: "error" }));
        return;
      }
      dispatch(updateBlog(data));
    });
  }

  return (
    <div>
      <Notification />

      <Togglable buttonLabel="create">
        <BlogForm submitBlog={submitBlog} />
      </Togglable>
      <Flex
        className="blogs"
        vertical
        gap={10}
      >
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              handleBlogRemoval={handleBlogRemoval}
              username={user.username}
            />
          ))
        ) : (
          <p>No blogs to show</p>
        )}
      </Flex>
    </div>
  );
}
