import React, { useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { ToggleMode } from "../shared/components/toggleMode/ToggleMode";

export const Config: React.FC = () => {
  useEffect(() => {
    document.title = "PomoTask - Configurantion";
  }, []);
  return (
    <VStack padding={2}>
      <Text fontSize="2xl">Config page</Text>
      <ToggleMode />
    </VStack>
  );
};
