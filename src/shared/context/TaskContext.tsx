import React, { createContext, useCallback, useEffect, useState } from "react";
import { ITask, taskService } from "../service/api/task/Task";

interface ITaskContextData {
  secondsAmount: number;
  decreaseSecondsAmount: () => void;
  isCounting: boolean;
  message: string;
  tasks: ITask[] | undefined;
  defineTasks: (tasks: ITask[]) => void;
  handleCreateTask: () => void;
  handleDeleteTask: (id: string) => void;
  handleCheckTask: (id: string) => void;
  handleChangeTitle: (id: string, value: string) => void;
  startTask: (id: string) => void;
  pauseTask: (id: string) => void;
}
export const TaskContext = createContext<ITaskContextData>(
  {} as ITaskContextData
);

const TOTAL_SECONDS_AMOUNT = 15 * 60 - 895;

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [secondsAmount, setSecondsAmount] = useState(TOTAL_SECONDS_AMOUNT);
  const [isCounting, setIsCounting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const tasksDB = taskService.getAll();
    if (tasksDB != null) {
      setTasks(tasksDB);
    }
  }, [setTasks]);

  const decreaseSecondsAmount = () => {
    setSecondsAmount((old) => old - 1);
  };

  const handleCreateTask = useCallback(() => {
    const newTask: ITask = {
      id: Math.random().toString(),
      order: tasks.length + 1,
      title: "",
      done: false,
      isRunning: false,
    };
    const allTasks = [...tasks, newTask];
    allTasks.sort((a, b) => {
      return a.order - b.order;
    });
    setTasks([...allTasks]);
  }, [tasks]);

  const handleDeleteTask = useCallback(
    (id: string) => {
      const result = tasks.filter((task) => task.id !== id);
      setTasks(result);
    },
    [tasks]
  );

  const handleCheckTask = useCallback(
    (id: string) => {
      const taskChecked = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      if (taskChecked !== undefined) {
        taskChecked.done = !taskChecked.done;
        const allTasks = [...result, taskChecked];
        allTasks.sort((a, b) => {
          return a.order - b.order;
        });

        setTasks([...allTasks]);
      }
    },
    [tasks, setTasks]
  );

  const handleChangeTitle = useCallback(
    (id: string, value: string) => {
      const task = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      if (task !== undefined) {
        task.title = value;
        const allTasks = [...result, task];
        allTasks.sort((a, b) => {
          return a.order - b.order;
        });
        setTasks([...allTasks]);
      }
    },
    [tasks]
  );

  const handleChangeRunning = useCallback(
    (id: string) => {
      const taskChecked = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      result.forEach((task) => (task.isRunning = false));
      if (taskChecked !== undefined) {
        taskChecked.isRunning = !taskChecked.isRunning;
        const allTasks = [...result, taskChecked];
        allTasks.sort((a, b) => {
          return a.order - b.order;
        });

        setTasks([...allTasks]);
      }
    },
    [tasks]
  );

  const defineTasks = (tasks: ITask[]) => {
    setTasks([...tasks]);
  };

  const startTask = (id: string) => {
    setIsCounting(true);
    setSecondsAmount(TOTAL_SECONDS_AMOUNT);
    const startedTask = tasks.find((task) => task.id === id);
    if (startedTask !== undefined) {
      setMessage(startedTask?.title);
      handleChangeRunning(id);
    }
  };

  const pauseTask = (id: string) => {
    setIsCounting(false);
    setSecondsAmount(0);
    const pausedTask = tasks.find((task) => task.id === id);
    setMessage("");
    if (pausedTask !== undefined) {
      handleChangeRunning(id);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        secondsAmount: secondsAmount,
        isCounting: isCounting,
        message: message,
        decreaseSecondsAmount: decreaseSecondsAmount,
        tasks: tasks,
        defineTasks: defineTasks,
        handleCreateTask: handleCreateTask,
        handleDeleteTask: handleDeleteTask,
        handleCheckTask: handleCheckTask,
        handleChangeTitle: handleChangeTitle,
        startTask: startTask,
        pauseTask: pauseTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
