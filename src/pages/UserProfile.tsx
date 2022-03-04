import React, { useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";

export const UserProfile: React.FC = () => {
  useEffect(() => {
    document.title = "PomoTask - User profile";
  }, []);
  return (
    <VStack>
      <Text fontSize="2xl">User profile</Text>
    </VStack>
  );
};
