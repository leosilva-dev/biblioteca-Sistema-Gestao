import React, { useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";

export const Config: React.FC = () => {
  useEffect(() => {
    document.title = "PomoTask - Configurantion";
  }, []);
  return (
    <VStack>
      <Text fontSize="2xl">Config page</Text>
    </VStack>
  );
};
