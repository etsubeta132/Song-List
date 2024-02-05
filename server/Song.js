const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songId: { type: String, required: true, unique: true, primaryKey: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  imageUrl: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
