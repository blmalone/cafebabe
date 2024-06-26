import React from 'react';
import { Box, Center, Text, Flex } from "@chakra-ui/react";

// TODO: add a page for registration for a coffee shop
// This would involve deploying a proxy contract for the new shop
const Register: React.FC = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={4}borderRadius="lg" textAlign="center">
        <Text fontSize="4xl">🚧 Coffee Shop Registration coming soon! 🚧 </Text>
      </Box>
    </Flex>
  );
};

export default Register;
