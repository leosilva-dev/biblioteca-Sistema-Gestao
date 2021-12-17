import React, { useEffect, useState } from "react";
import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Pomodoro } from "./Pomodoro";

export const Home: React.FC = () => {
  const toast = useToast();
  const [currentPomoIsDone, setCurrentPomoIsDone] = useState(false);
  const [time, setTime] = useState(0.1);
  const [type, setType] = useState("work" || "short-break" || "long-break");

  useEffect(() => {
    currentPomoIsDone &&
      toast({
        title: "Your pomo is done!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  }, [currentPomoIsDone, toast]);

  return (
    <Wrap>
      <WrapItem>
        <Center>
          <Tabs align="center" variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Work</Tab>
              <Tab>Short Break</Tab>
              <Tab>Long Break</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Pomodoro
                  minutes={time}
                  type={"work"}
                  defineAsDone={setCurrentPomoIsDone}
                />
              </TabPanel>
              <TabPanel>
                <Pomodoro
                  minutes={time}
                  type={"short-break"}
                  defineAsDone={setCurrentPomoIsDone}
                />
              </TabPanel>
              <TabPanel>
                <Pomodoro
                  minutes={time}
                  type={"long-break"}
                  defineAsDone={setCurrentPomoIsDone}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </WrapItem>
    </Wrap>
  );
};
