import React from 'react';
import { Box } from 'rebass';

const Modal = ({ children, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: '20px' }}>
          Close
        </button>
      </Box>
    </Box>
  );
};

export default Modal;
