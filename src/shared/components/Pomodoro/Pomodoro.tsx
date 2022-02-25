import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  VStack,
} from "@chakra-ui/react";
import { useTask } from "../../hooks/useTask";

export const Pomodoro: React.FC = () => {
  const {
    isCounting,
    message,
    secondsAmount,
    decreaseSecondsAmount,
    defineIsCounting,
  } = useTask();

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        if (secondsAmount > 0) {
          decreaseSecondsAmount();
        }
      }, 1000);
    } else {
      defineIsCounting(false);
    }
  }, [decreaseSecondsAmount, defineIsCounting, isCounting, secondsAmount]);

  return (
    <VStack>
      <Box>
        <CircularProgress
          value={secondsAmount / 100}
          size="350px"
          thickness="1px"
          capIsRound
        >
          <CircularProgressLabel>{`${minutes
            .toString()
            .padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box fontWeight={"bold"} fontSize={18} fontFamily={"Helvetica"}>
        {message}
      </Box>
    </VStack>
  );
};
