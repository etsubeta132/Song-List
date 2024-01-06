
  const mongoose = require('mongoose');

  const songSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: String,
  });
  
  const Song = mongoose.model('Song', songSchema);
  
  module.exports = Song;
    