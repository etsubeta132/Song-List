const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Song = require('./Song.js');
const connectDB = require('./db');
const { v4: uuidv4 } = require('uuid');



const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

const initialSongs = [
    {
      songId:uuidv4(),
      title: 'Song 1',
      artist: 'Artist 1',
      imageUrl: ''
    },
    {
      songId:uuidv4(),
      title: 'Song 2',
      artist: 'Artist 2',
      imageUrl: '',
    },
    
  ];


Song.insertMany(initialSongs)
  .then((songs) => {
    console.log('Initial songs added successfully:', songs);
  })
  .catch((error) => {
    console.error('Error adding initial songs:', error);
  });

connectDB()


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});




app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
        console.log("fetched", songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/songs', async (req, res) => {
    const { title, artist, imageUrl } = req.body;
    const songId = uuidv4(); // Generate a unique UUID

    try {
        const newSong = new Song({
            songId,
            title,
            artist,
            imageUrl,
        });

        await newSong.save();
        res.status(201).json(newSong);
        console.log("added", newSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.put('/api/songs/:songId', async (req, res) => {
    const { songId } = req.params;
    const { title, artist, imageUrl } = req.body;
  
    try {
      const updatedSong = await Song.findOneAndUpdate(
        { songId },
        {
          title,
          artist,
          imageUrl,
        },
        { new: true }
      );
  
      if (!updatedSong) {
        console.log("Song not found");
        return res.status(404).json({ error: 'Song not found' });
      }
  
      res.json(updatedSong);
      console.log('Song updated successfully:', updatedSong);
    } catch (error) {
      console.error('Error updating song:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.delete('/api/songs/:songId', async (req, res) => {
    const { songId } = req.params;

    try {
        const deletedSong = await Song.findOneAndDelete({ songId });

        if (!deletedSong) {
            console.log("song not found");
            return res.status(404).json({ error: 'Song not found' });
        }

        res.json({ message: 'Song deleted successfully' });
        console.log('Song deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
