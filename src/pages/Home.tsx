import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Pomodoro } from "./Pomodoro";

export const Home: React.FC = () => {
  const toast = useToast();
  const [currentPomoIsDone, setCurrentPomoIsDone] = useState(false);

  useEffect(() => {
    currentPomoIsDone &&
      toast({
        title: "Your pomo is done!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  }, [currentPomoIsDone, toast]);

  return (
    <>
      <Pomodoro
        minutes={0.1}
        type={"work"}
        defineAsDone={setCurrentPomoIsDone}
      />
    </>
  );
};
