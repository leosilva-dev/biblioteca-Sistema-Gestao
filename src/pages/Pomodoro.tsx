import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { clearTimeout, setTimeout } from "timers";
// import { ArrowRightIcon } from "@chakra-ui/icons";

interface IPomodoro {
  secondsAmount: number;
  type: string;
  defineAsDone?: (value: boolean) => void;
}

export const Pomodoro: React.FC<IPomodoro> = ({
  secondsAmount,
  type,
  defineAsDone,
}) => {
  // const [timeInSeconds, setTimeInSeconds] = useState(minutes * 60);
  // const [percentualDecorrido, setPercentualDecorrido] = useState(0);
  // const formatted = moment.utc(timeInSeconds * 1000).format("mm:ss");
  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  // const percentualPorTempo = useMemo(() => {
  //   // return 100 / (secondsAmount * 60);
  // }, [secondsAmount]);

  const message = useMemo(() => {
    switch (type) {
      case "work":
        return "Work!";
      case "short-break":
        return "short-break!";
      case "long-break":
        return "long-break!";
    }
  }, [type]);

  // useEffect(() => {
  //   if (isCounting) {
  //     const time = setTimeout(() => {
  //       setTimeInSeconds(timeInSeconds - 1);
  //       setPercentualDecorrido(percentualDecorrido + percentualPorTempo);
  //     }, 1000);
  //     if (timeInSeconds === 0) {
  //       clearTimeout(time);
  //       defineAsDone(true);
  //     }
  //   }
  // }, [
  //   defineAsDone,
  //   isCounting,
  //   percentualDecorrido,
  //   percentualPorTempo,
  //   timeInSeconds,
  // ]);

  // const resetPomo = useCallback(() => {
  //   setIsCounting(false);
  //   setTimeInSeconds(minutes * 60);
  //   setPercentualDecorrido(0);
  // }, [minutes]);

  return (
    <VStack>
      <Box>
        <CircularProgress value={1} size="500px" thickness="1px" capIsRound>
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

      <Box>
        {/* {isCounting && (
          <Button onClick={() => resetPomo()}>
            <ArrowRightIcon />
          </Button>
        )} */}
      </Box>
    </VStack>
  );
};
