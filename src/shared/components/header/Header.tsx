import React from "react";
import { Box, Button, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { useBiblioteca } from "../../hooks/useBiblioteca";

export const Header = () => {
  const { logout, loggedUserType } = useBiblioteca();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box
            fontWeight={"bold"}
            fontSize={18}
            fontFamily={"Helvetica"}
            cursor={"pointer"}
          >
            {`Biblioteca - ${
              loggedUserType === "bibliotecario" ? "Bibliotecário" : "Leitor"
            }`}
          </Box>
        </HStack>
        <Flex alignItems={"center"}>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Flex>
      </Flex>
    </Box>
  );
};
