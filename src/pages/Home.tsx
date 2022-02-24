import React, { useEffect, useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { Pomodoro } from "./Pomodoro";

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
    <VStack>
      <Pomodoro secondsAmount={secondsAmount} message={"work"} />

      <Button onClick={() => handleStartStop()}>
        {isCounting ? "Pausar" : "Iniciar"}
      </Button>
    </VStack>
  );
};
