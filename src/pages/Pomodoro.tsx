import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  VStack,
} from "@chakra-ui/react";

interface IPomodoro {
  secondsAmount: number;
  message?: string;
}

export const Pomodoro: React.FC<IPomodoro> = ({ secondsAmount, message }) => {
  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  return (
    <VStack>
      <Box>
        <CircularProgress value={0} size="500px" thickness="1px" capIsRound>
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
