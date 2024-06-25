// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Center, VStack, Container } from "@chakra-ui/react";
import Home from './Home';
import BuyCrypto from './BuyCrypto';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.md" centerContent>
          <Center>
            <VStack spacing={6}>
              {/* <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center">
                <Link to="/simple">
                  <Text fontSize="2xl" color="teal.500">Go to Simple Page</Text>
                </Link>
              </Box> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simple" element={<BuyCrypto />} />
              </Routes>
            </VStack>
          </Center>
        </Container>
      </Router>
    </ChakraProvider>
  );
};

export default App;