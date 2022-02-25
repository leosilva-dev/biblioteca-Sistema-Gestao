import React, { useEffect, useState } from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Pomodoro } from "../shared/components/Pomodoro/Pomodoro";
import { TaskList } from "../shared/components/task/TaskList";

const TOTAL_SECONDS_AMOUNT = 15 * 60 - 895;

export const Home: React.FC = () => {
  const [secondsAmount, setSecondsAmount] = useState(TOTAL_SECONDS_AMOUNT);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        setSecondsAmount((old) => old - 1);
      }, 1000);
    }
  }, [isCounting, secondsAmount]);

  const handleStartStop = () => {
    setIsCounting((old) => !old);
  };

  return (
    <HStack>
      <VStack>
        <TaskList />
      </VStack>
      <VStack>
        <Pomodoro secondsAmount={secondsAmount} message={"work"} />
      </VStack>
    </HStack>
  );
};
