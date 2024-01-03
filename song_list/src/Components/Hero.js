import React from 'react';
import { Box, Flex, Text,Button } from 'rebass';

function Hero({ onAddButtonClick }) {
    return (
        <Box
            sx={{
                backgroundImage: `url(/Assets/hero-bg.png)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '60vh',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <Flex
                as="header"
                p={3}
                px={4}
                alignItems="center"
                color="white"
            >
                <Box>
                    <Text as='h1'>Songs</Text>
                </Box>
                <Box ml="auto" mr='5rem'>
                    <nav>
                        <Flex flexWrap='wrap'  as='ul' sx={{color:"white", listStyle: 'none', display: 'flex', gap: '16px' , mr:'2rem'}}>
                            <li><Text as='a' href="/" sx = {{color:"white"}}>Home</Text></li>
                            <li><Text as='a' href="/" sx = {{color:"white"}}>About</Text></li>
                        </Flex>
                    </nav>
                </Box>
            </Flex>
            <Flex flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                <Text as='h1' sx={{ color: 'white' }}>Welcome...</Text>
                <Text as='p' sx={{ color: 'white', my:3 }}> You can add delete and update any song</Text>
                <Button onClick={onAddButtonClick}
                  sx={{ backgroundColor: 'white', color: 'black', my: 2, mx: 4, borderRadius: '100%' }}
                >
                  Add Song
                </Button>
            </Flex>
        </Box>
    );
}

export default Hero;
