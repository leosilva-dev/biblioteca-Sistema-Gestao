import React from "react";
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FiCheckCircle, FiSettings, FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box
            fontWeight={"bold"}
            fontSize={18}
            fontFamily={"Helvetica"}
            onClick={() => history.push("/")}
            cursor={"pointer"}
          >
            <Icon as={FiCheckCircle} /> PomoTask
          </Box>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton
            aria-label="Config"
            fontSize="18px"
            colorScheme="#26C485"
            onClick={() => history.push("/Profile")}
            icon={<Icon as={FiUser} />}
            variant="ghost"
          />
          <IconButton
            aria-label="Config"
            fontSize="18px"
            colorScheme="#26C485"
            onClick={() => history.push("/Config")}
            icon={<Icon as={FiSettings} />}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  );
};
