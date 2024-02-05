import React from 'react';
import { Box, Text } from 'rebass';

const Footer = () => {
  return (
    <Box
      as="footer"
      p={3}
      mt={4}
      backgroundColor='black'
      color='white'
      textAlign='center'
    >
      <Text fontSize={1}>&copy; 2024 Addis Software. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
