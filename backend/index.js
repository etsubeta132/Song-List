const express  = require('express');
const axios = require('axios') ;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  

const PORT = 3001

app.use(express.json())

const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';

let songs = [
    { id: uuidv4(), title: 'perfect', artist: 'edsheeren' ,imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'},
    { id: uuidv4(), title: 'story of my life', artist: 'Artist 2', imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'},
    { id: uuidv4(), title: 'Selina', artist: 'Tamrat',imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'},
    { id: uuidv4(), title: 'perfect', artist: 'edsheeren' ,imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'},
    { id: uuidv4(), title: 'story of my life', artist: 'Artist 2', imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'},
    { id: uuidv4(), title: 'Selina', artist: 'Tamrat',imageUrl:'https://www.rollingstone.com/wp-content/uploads/2023/03/230117_Black_Tee_0005-1.jpg'}
  ];
  

app.get('/api/songs', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(songs);
    console.log(songs);
});


app.post('/api/songs',(req,res)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const newSong = {id:uuidv4(),...req.body}
    songs.push(newSong)
    res.status(201).json(newSong)
    console.log(newSong)

})

app.put('/api/songs/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const {id} = req.params
    const index = songs.findIndex((song)=> song.id === id)
    console.log(index)
    if (index != -1){
        songs[index] = {...songs[index],...req.body}
        res.json(songs[index])
    }else{
        res.status(404).json({error:'song not found'})
    }
})

app.delete('/api/songs/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    const { id } = req.params;
    songs = songs.filter((song) => song.id !== id); 
    res.json({ message: "Song deleted successfully" });
    console.log("Song deleted successfully");
});


app.listen(PORT,() => {
    
    console.log(`server is running on port ${PORT}`)
})