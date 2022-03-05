import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useTask } from "../../hooks/useTask";
import { FiXCircle, FiCoffee } from "react-icons/fi";
import { RepeatClockIcon } from "@chakra-ui/icons";

export const Pomodoro: React.FC = () => {
  const {
    isCounting,
    currentTask,
    secondsAmount,
    AbandonTask,
    startTask,
    defaultTime,
  } = useTask();

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const percentage = () => {
    return (100 * (defaultTime - secondsAmount)) / defaultTime;
  };

  return (
    <VStack>
      <Box>
        <CircularProgress
          color="primary"
          value={percentage()}
          size="400px"
          thickness={currentTask.isRunning ? "1px" : "0px"}
          capIsRound
        >
          <CircularProgressLabel>
            {currentTask.isRunning ? (
              `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`
            ) : (
              <VStack alignItems={"center"}>
                <Icon boxSize="50" as={FiCoffee} />
                <Text fontSize="2xl" as="em">
                  Just enjoying a coffee...
                </Text>
              </VStack>
            )}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      {currentTask.isRunning && (
        <HStack>
          {isCounting ? (
            <Tooltip
              hasArrow
              label="Abandon task"
              placement="top"
              bg="gray.300"
              color="black"
            >
              <IconButton
                fontSize="18px"
                colorScheme="telegram"
                aria-label={"play or pause"}
                onClick={() => AbandonTask(currentTask.id)}
                icon={<Icon as={FiXCircle} />}
                variant="ghost"
              />
            </Tooltip>
          ) : (
            <Tooltip
              hasArrow
              label="Restart task"
              placement="top"
              bg="gray.300"
              color="black"
            >
              <IconButton
                fontSize="18px"
                colorScheme="telegram"
                aria-label={"restart"}
                onClick={() => startTask(currentTask.id)}
                icon={<RepeatClockIcon />}
                variant="ghost"
              />
            </Tooltip>
          )}

          <Text isTruncated fontSize="xl">
            {currentTask.title}
          </Text>
        </HStack>
      )}
    </VStack>
  );
};
