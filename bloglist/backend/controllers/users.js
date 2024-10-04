const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate({ path: "blogs", select: "title", options: { limit: 0 }});

  res.status(200).json(user);
});

usersRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || username.length < 3 || password.length < 3) {
    res.status(400).json({ error: "username our password malformed" });
    return;
  }

  const isUsernameInDB = await User.findOne({ username });

  if (isUsernameInDB) {
    res.status(409).json({ error: "Username already registered" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.delete("/", async (req, res) => {
  const deleteResponse = await User.deleteMany({});

  res.status(200).json(deleteResponse);
});

module.exports = usersRouter;
