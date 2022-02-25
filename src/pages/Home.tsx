import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { Pomodoro } from "../shared/components/Pomodoro/Pomodoro";
import { TaskList } from "../shared/components/task/TaskList";

export const Home: React.FC = () => {
  return (
    <HStack>
      <VStack>
        <TaskList />
      </VStack>
      <VStack>
        <Pomodoro />
      </VStack>
    </HStack>
  );
};
