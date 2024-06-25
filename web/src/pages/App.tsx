// src/pages/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, Center, VStack, Container } from "@chakra-ui/react";
import HomePage from './index'; 
import BuyCrypto from '../components/BuyCrypto';
import useScript from '../useScript';

const App: React.FC = () => {
  useScript("https://js.stripe.com/v3/");
  useScript("https://crypto-js.stripe.com/crypto-onramp-outer.js");

  return (
    <ChakraProvider>
      <Container maxW="container.md" centerContent>
        <Center>
          <VStack spacing={6}>
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* using HomePage */}
              <Route path="/simple" element={<BuyCrypto />} />
            </Routes>
          </VStack>
        </Center>
      </Container>
    </ChakraProvider>
  );
};

export default App;
