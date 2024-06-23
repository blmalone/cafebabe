import React from "react";
import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { getCoinbaseWalletProvider } from "../providers";

interface SelectWalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
  connectWithProvider: (provider: any) => void;
}

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({
  isOpen,
  closeModal,
  connectWithProvider,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                connectWithProvider(getCoinbaseWalletProvider());
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/cbw.png"
                  alt="Coinbase Wallet Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectWalletModal;
