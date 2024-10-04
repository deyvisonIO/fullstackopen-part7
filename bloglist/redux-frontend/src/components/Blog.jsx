import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function Blog({ blog, username, likeBlog, handleBlogRemoval }) {
  const [isAdditionalInformationVisible, setIsAdditionalInformationVisible] =
    useState(false);

  function toggleAdditionalInformationVisibility() {
    setIsAdditionalInformationVisible((prev) => !prev);
  }

  return (
    <div style={{ border: "2px solid black", padding: "5px 1px 5px 1px" }}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <Button onClick={toggleAdditionalInformationVisibility}>
          {isAdditionalInformationVisible ? "hide" : "view"}
        </Button>
      </div>
      {isAdditionalInformationVisible && (
        <>
          <div className="blogUrl">{blog.url}</div>
          <div className="blogLikes">
            likes {blog.likes}
            <Button onClick={() => likeBlog(blog.id, blog.likes)}>like</Button>
          </div>
          <div className="blogUser">{blog.user.username}</div>
          {username === blog.user.username && (
            <Button
              onClick={() =>
                handleBlogRemoval(blog.id, blog.title, blog.author)
              }
            >
              remove
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
