import React from "react";
import {
  Center,
  useColorMode,
  WrapItem,
  Wrap,
  HStack,
  Button,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const ToggleMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Wrap marginLeft={2.5}>
      <WrapItem>
        <Center w="80px" h="40px">
          <HStack spacing="12px">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </HStack>
        </Center>
      </WrapItem>
    </Wrap>
  );
};
