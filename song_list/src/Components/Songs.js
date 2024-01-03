import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, removeSong, addSong, getSongsFetch } from "../songState";
import SongForm from "./SongForm";
import { nanoid } from "nanoid";
import { Box, Image, Text, Button, Flex } from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Hero from "./Hero";

function Songs() {
  const songs = useSelector(state => state.songs.songs);
  const loading = useSelector(state => state.songs.isLoading);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const handleAdd = () => {
    setShowForm(true);
    setSelectedSong(null);
  };

  const handleEdit = (song) => {
    setShowForm(true);
    setSelectedSong(song);
  };

  const handleFormSubmit = (data) => {
    const id = nanoid();

    if (selectedSong) {
      dispatch(updateSong({ id: selectedSong.id, ...data }));
    } else {
      dispatch(addSong({ id, ...data }));
    }

    setShowForm(false);
    setSelectedSong(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedSong(null);
  };

  const handleRemove = (id) => {
    dispatch(removeSong(id));
  };

  const slicer = Math.ceil(songs.length / 2);
  const songs1 = songs.slice(0, slicer);
  const songs2 = songs.slice(slicer);

  return (
    <>
      <Hero onAddButtonClick={handleAdd} />
      <Box as='h1' sx={{ my: '3rem' }}>Trending Songs</Box>

      {loading ? (
        <Flex>
          <Box as='div'>Loading...</Box>
        </Flex>
      ) : (
        <Flex justifyContent='space-around' width='full' flexWrap='wrap'>
          <Box as='ul'
              sx={{
                listStyleType: "none",
                background: 'linear-gradient(-45deg, purple , blue)',
                borderRadius: '1rem',
                width: 'full'
              }} >
              {Array.isArray(songs) ? (
                songs1.map((song) => (
                  <Box as='li' key={song.id} sx={{ margin: '2rem' }} >
                    <Flex justifyContent='space-between' flexDirection="row" alignItems='center' width='full'>
                      <Image
                        src={song.imageUrl || '/Assets/hero-bg.png'}
                        sx={{ width: ['30px', '50px'], height: ['30px', '50px'], borderRadius: '50%', marginRight: '2rem' }}
                      />
                      <Flex flexDirection="column" justifyContent='space-evenly'>
                        <Box>
                          <Text>{song.title}</Text>
                        </Box>
                        <Box>
                          <Text>{song.artist}</Text>
                        </Box>
                      </Flex>
                      <Flex justifyContent='space-around'>

                          <Button 
                            onClick={() => handleEdit(song)}
                            sx={{ backgroundColor: 'black', color: 'white', my: 2, ml: 4, mr:2 }}
                            >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>

                          <Button
                            onClick={() => handleRemove(song.id)}
                            sx={{ backgroundColor: 'red', color: 'white', my: 2, mr: 4, ml:2}}
                            >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>

                      </Flex>
                      
                    </Flex>
                    <Box as='hr' sx={{ bg: 'black', height: '2px', color: 'black', marginTop: '15px' }} />
                  </Box>
                ))
              ) : null}
            </Box>
            <Box as='ul'
              sx={{
                listStyleType: "none",
                background: 'linear-gradient(-45deg, purple , blue)',
                borderRadius: '1rem',
                width: 'full'
              }} >
              {Array.isArray(songs) ? (
                songs2.map((song) => (
                  <Box as='li' key={song.id} sx={{ margin: '2rem' }} >
                    <Flex justifyContent='space-between' flexDirection="row" alignItems='center' width='full'>
                      <Image
                        src={song.imageUrl || 'placeholderImageUrl'}
                        sx={{ width: ['30px', '50px'], height: ['30px', '50px'], borderRadius: '50%', marginRight: '2rem' }}
                      />
                      <Flex flexDirection="column" justifyContent='space-evenly'>
                        <Box>
                          <Text>{song.title}</Text>
                        </Box>
                        <Box>
                          <Text>{song.artist}</Text>
                        </Box>
                      </Flex>
                      <Flex justifyContent='space-around'>

                          <Button 
                            onClick={() => handleEdit(song)}
                            sx={{ backgroundColor: 'black', color: 'white', my: 2, ml: 4, mr:2 }}
                            >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>

                          <Button
                            onClick={() => handleRemove(song.id)}
                            sx={{ backgroundColor: 'red', color: 'white', my: 2, mr: 4, ml:2}}
                            >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>

                      </Flex>
                      
                    </Flex>
                    <Box as='hr' sx={{ bg: 'black', height: '2px', color: 'black', marginTop: '15px' }} />
                  </Box>
                ))
              ) : null}
            </Box>
          </Flex>
      )}

      {/* Popup Form */}
      {showForm && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <SongForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialValues={selectedSong}
          />
        </Box>
      )}
    </>
  );
}

export default Songs;
