import React from "react";
import { VStack } from "@chakra-ui/react";
import { Pomodoro } from "../shared/components/Pomodoro/Pomodoro";
import { TaskList } from "../shared/components/task/TaskList";

export const Home: React.FC = () => {
  return (
    <VStack>
      <Pomodoro />
      <TaskList />
    </VStack>
  );
};
