const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });

  response.json(blogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate("user", { username: 1, name: 1, id: 1 }).populate("comments", { content: 1 });

  response.json(blog)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;


  if(!user) {
    response.status(400).json({ error: "User not found!"})
    return;
  }

  if(!(body.title) || !(body.author)) {
    response.status(400).json({ error: "title or author missing or already registered"});
    return;
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user._id
  });



  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();


  await savedBlog.populate("user", {username: 1, name: 1, id: 1});

  response.status(201).json(savedBlog)

})

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id;
  const content = request.body.content;

  if(!id) {
    response.status(400).json({ error: "provide an blog id to delete"});
    return;
  }

  const blog = await Blog.findById(id)

  if(!blog) {
    response.status(400).json({ error: "blog not found!"});
    return;
  }

  const comment = new Comment({
    content,
    blog: blog._id
  })



  const newComment = await comment.save()

  blog.comments = blog.comments.concat(newComment._id)
  const savedBlog = await blog.save()

  await savedBlog.populate("comments", { content: 1 });

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const user = request.user;


  if(!user) {
    response.status(404).json({ error: "found no user with this id!"});
    return;
  }

  if(!id) {
    response.status(400).json({ error: "provide an blog id to delete"});
    return;
  }

  const blog = await Blog.findById(id);

  if(!blog) {
    response.status(400).json({ error: "blog not found!"});
    return;
  }

  if(blog.user.toString() !== user._id.toString()) {
    response.status(400).json({ error: "user doesn't own blog post"});
    return;
  }

  const result = await Blog.findByIdAndDelete(id);
  await User.updateMany(
            { blogs: blog._id },
            { $pull: { blogs: blog._id }}
  );
  await Comment.deleteMany({ blog: blog._id})
  response.status(200).json(result);
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const likes = request.body.likes;
  const user = request.user;


  if(!user) {
    response.status(404).json({ error: "found no user with this id"});
    return;
  }

  if(!id) {
    response.status(400).json({ error: "provide an id"});
    return;
  }

  if(!likes) {
    response.status(400).json({ error: "provide an likes"});
    return;
  }

  const result = await Blog.findByIdAndUpdate(id, { likes }, { new: true});

  response.status(200).json(result)
})

module.exports = blogsRouter