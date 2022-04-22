import React from "react";
import { Box, Button, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBiblioteca } from "../../hooks/useBiblioteca";

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useBiblioteca();

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
            onClick={() => navigate("/Home")}
            cursor={"pointer"}
          >
            Biblioteca
          </Box>
        </HStack>
        <Flex alignItems={"center"}>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Flex>
      </Flex>
    </Box>
  );
};
