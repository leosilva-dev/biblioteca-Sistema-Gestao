import React, { useEffect, useState } from "react";
import {
  Button,
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

const TOTAL_SECONDS_AMOUNT = 15 * 60 - 895;

export const Home: React.FC = () => {
  const toast = useToast();
  const [secondsAmount, setSecondsAmount] = useState(TOTAL_SECONDS_AMOUNT);
  const [isCounting, setIsCounting] = useState(false);

  // const [currentPomoIsDone, setCurrentPomoIsDone] = useState(false);
  // const [type, setType] = useState("work" || "short-break" || "long-break");

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        setSecondsAmount((old) => old - 1);
      }, 1000);
    } else {
      toast({
        title: "Your pomo is done!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsCounting(false);
    }
  }, [isCounting, secondsAmount]);

  const handleStartStop = () => {
    setIsCounting((old) => !old);
  };

  return (
    <Wrap>
      <WrapItem>
        <Center>
          {/* <Tabs align="center" variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Work</Tab>
              <Tab>Short Break</Tab>
              <Tab>Long Break</Tab>
            </TabList>
            <TabPanels>
              <TabPanel> */}
          <Pomodoro
            secondsAmount={secondsAmount}
            type={"work"}
            // defineAsDone={setCurrentPomoIsDone}
          />
          <Button onClick={() => handleStartStop()}>
            {isCounting ? "Pausar" : "Iniciar"}
          </Button>
          {/* </TabPanel>
              <TabPanel>
                <Pomodoro
                  secondsAmount={secondsAmount}
                  type={"work"}
                  // defineAsDone={setCurrentPomoIsDone}
                />
              </TabPanel>
              <TabPanel>
                <Pomodoro
                  secondsAmount={secondsAmount}
                  type={"work"}
                  // defineAsDone={setCurrentPomoIsDone}
                />
              </TabPanel>
            </TabPanels>
          </Tabs> */}
        </Center>
      </WrapItem>
    </Wrap>
  );
};
