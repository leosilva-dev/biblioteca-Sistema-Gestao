import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Feedback } from "../shared/util/feedback/Feedback";
import { useBiblioteca } from "../shared/hooks/useBiblioteca";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin, logout, isLoggedIn } = useBiblioteca();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    logout();
  };

  const valide = () => {
    if (!username.length) {
      Feedback("Informe um username válido", "error");
      return false;
    }
    if (password.length < 3) {
      Feedback("A senha precisa conter pelo menos três caracteres", "error");
      return false;
    }

    Feedback("Acessando sua conta...", "info");
    return true;
  };

  const goToHome = () => {
    navigate("/home");
  };

  const signIn = () => {
    valide() && handleLogin(username, password) && goToHome();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      {!isLoggedIn ? (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Faça o seu login</Heading>
          </Stack>
          <Box bg={"gray.50"} boxShadow={"lg"} rounded={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack>
                  <Button
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => signIn()}
                  >
                    Entrar
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Stack align={"center"}>
          <Text
            fontSize={"lg"}
          >{`Você já está logado, deseja se conetar à outra conta?`}</Text>
          <HStack>
            <Button
              size="md"
              bg={"blue.500"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
              onClick={() => navigate("/home")}
            >
              Votar para o perfil
            </Button>
            <Button
              bg={"red.500"}
              color={"white"}
              _hover={{
                bg: "red.700",
              }}
              onClick={() => handleLogout()}
            >
              Sair
            </Button>
          </HStack>
        </Stack>
      )}
    </Flex>
  );
};
