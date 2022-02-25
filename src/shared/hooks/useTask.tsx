import { useContext } from "react";

import { TaskContext } from "../context/TaskContext";

export const useTask = () => {
  const context = useContext(TaskContext);

  return context;
};
