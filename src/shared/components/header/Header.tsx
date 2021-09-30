import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { ToggleMode } from "../toggleMode/ToggleMode";

interface IMenuLinks {
  name: string;
  route: string;
}
const MenuLinks: IMenuLinks[] = [
  //   { name: "Pomodoro", route: "/" },
  //   { name: "Lançamentos", route: "/lancamentos" },
  //   { name: "Tipos de lançamentos", route: "/tipos" },
  //   { name: "Tags", route: "/tags" },
];

const NavLink = (menulink: IMenuLinks) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("primary", "primary"),
        borderColor: "primary",
        color: "white",
      }}
      href={menulink.route}
    >
      {menulink.name}
    </Link>
  );
};

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight={"bold"} fontSize={18} fontFamily={"Helvetica"}>
              Pomodoro <AddIcon />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {MenuLinks.map((link) => (
                <NavLink key={link.name} name={link.name} route={link.route} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ToggleMode />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {MenuLinks.map((link) => (
                <NavLink key={link.name} name={link.name} route={link.route} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
