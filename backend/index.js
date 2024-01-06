const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { connectToDatabase } = require('./db'); 

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

let db;



connectToDatabase().then(database => {
  db = database;
});


app.get('/api/songs', async (req, res) => {
  try {
    const songs = await db.collection('songs').find().toArray();
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/songs', async (req, res) => {
  try {
    const newSong = { id: uuidv4(), ...req.body };
    await db.collection('songs').insertOne(newSong);
    res.status(201).json(newSong);

  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/songs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('songs').findOneAndUpdate(
      { id },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    res.json(result.value);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/songs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.collection('songs').findOneAndDelete({ id });
      if (result.value) {
        res.json({ message: 'Song deleted successfully' });
      } else {
        res.status(404).json({ error: 'Song not found' });
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

