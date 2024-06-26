// src/pages/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Center, VStack, Container } from "@chakra-ui/react";
import HomePage from "./index";
import Register from "../components/Register";
import useScript from "../useScript";

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
              <Route path="/register" element={<Register />} />
            </Routes>
          </VStack>
        </Center>
      </Container>
    </ChakraProvider>
  );
};

export default App;
