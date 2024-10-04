const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog"
  }
})

const Comment = mongoose.model('Comment', commentSchema)

mongoose.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Comment 
