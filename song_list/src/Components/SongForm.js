import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from 'rebass';
import styled from 'styled-components';

const DEFAULT_IMAGE_URL = './Assets/hero-bg.png';

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled(Button)`
  background-color: #0070f3;
  color: white;
  margin: 10px;
  &:hover {
    background-color: #0051bb;
  }
`;

const SongForm = ({ onSubmit, onCancel, initialValues }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setArtist(initialValues.artist || "");
      setImageUrl(initialValues.imageUrl || "");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const finalImageUrl = imageUrl.trim() === '' ? DEFAULT_IMAGE_URL : imageUrl;

    onSubmit({ title, artist, imageUrl: finalImageUrl });
  };


  return (
    <Box p={3} backgroundColor='purple' sx={{ borderRadius: '4px' }}>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column'>
          <Text as='label' htmlFor='title'>Title:</Text>
          <StyledInput id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Text as='label' htmlFor='artist'>Artist:</Text>
          <StyledInput id='artist' type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
          <Text as='label' htmlFor='imageUrl'>Image URL:</Text>
          <StyledInput id='imageUrl' type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <Flex justifyContent='space-between'>
            <StyledButton type="submit">Submit</StyledButton>
            <Button sx={{backgroundColor:'black', color:'white'}} type="button" onClick={onCancel} variant='outline'>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default SongForm;
