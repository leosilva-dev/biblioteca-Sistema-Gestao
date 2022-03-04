import React, { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { Pomodoro } from "../shared/components/Pomodoro/Pomodoro";
import { TaskList } from "../shared/components/task/TaskList";

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = "PomoTask";
  }, []);
  return (
    <VStack>
      <Pomodoro />
      <TaskList />
    </VStack>
  );
};
