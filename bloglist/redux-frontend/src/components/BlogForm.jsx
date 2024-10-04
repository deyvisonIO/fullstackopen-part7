import { Button, Form, Input } from "antd";

function BlogForm({submitBlog}) {

  return (
    <Form onSubmit={submitBlog}>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">title:</label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Type your title"
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <Input
          id="author"
          name="author"
          type="text"
          placeholder="Type your author"
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <Input id="url" name="url" type="url" placeholder="Type your url" />
      </div>

      <Button type="submit">create</Button>
    </Form>
  );
}

export default BlogForm;
