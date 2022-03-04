import React, { useEffect, useState } from "react";
import {
  Divider,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ToggleMode } from "../shared/components/toggleMode/ToggleMode";
import { useTask } from "../shared/hooks/useTask";

export const Config: React.FC = () => {
  const { defaultTime, defineDefaultTime } = useTask();

  useEffect(() => {
    document.title = "PomoTask - Configurantion";
  }, []);

  const [timeDefault, setTimeDefault] = useState(defaultTime);

  const ChangeTimeDefault = (time: number) => {
    setTimeDefault(time * 60);
    defineDefaultTime(time * 60);
    // console.log("setou " + time * 60);
  };

  return (
    <VStack paddingTop={2}>
      <Tabs size="md" variant="solid-rounded">
        <TabList>
          <Tab>App preferences</Tab>
          <Tab>Edit profile</Tab>
        </TabList>
        <TabPanels>
          <TabPanel width="500px">
            <HStack padding={2}>
              <Text fontSize="md">Set time in minutes </Text>
              <NumberInput width="20" defaultValue={timeDefault / 60} min={1}>
                <NumberInputField
                  onChange={(e) => ChangeTimeDefault(Number(e.target.value))}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Divider />
            <HStack padding={2}>
              <Text fontSize="md">Change color mode </Text>
              <ToggleMode />
            </HStack>
          </TabPanel>
          <TabPanel width="500px">
            <p>Edit profile...</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
