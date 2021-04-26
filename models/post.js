const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    label: String,
    year: String,
    title: String,
    artist: String,
    likes: [likesSchema]
  })
 

module.exports = mongoose.model('Post', postSchema);