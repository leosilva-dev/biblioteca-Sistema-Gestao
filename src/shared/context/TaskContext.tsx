import React, { createContext, useCallback, useEffect, useState } from "react";
import { ITask, taskService } from "../service/api/task/Task";

interface ITaskContextData {
  secondsAmount: number;
  decreaseSecondsAmount: () => void;
  isCounting: boolean;
  tasks: ITask[] | undefined;
  currentTask: ITask;
  defineTasks: (tasks: ITask[]) => void;
  handleCreateTask: (title: string) => void;
  handleDeleteTask: (id: string) => void;
  handleCheckTask: (id: string) => void;
  handleChangeTitle: (id: string, value: string) => void;
  startTask: (id: string) => void;
  AbandonTask: (id: string) => void;
  defineIsCounting: (value: boolean) => void;
}
export const TaskContext = createContext<ITaskContextData>(
  {} as ITaskContextData
);

const TOTAL_SECONDS_AMOUNT = 15 * 60 - 895;

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);
  const [secondsAmount, setSecondsAmount] = useState(TOTAL_SECONDS_AMOUNT);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const tasksDB = taskService.getAll();
    if (tasksDB != null) {
      setTasks(tasksDB);
    }
  }, [setTasks]);

  const decreaseSecondsAmount = () => {
    setSecondsAmount((old) => old - 1);
  };

  const defineIsCounting = (value: boolean) => {
    setIsCounting(value);
  };

  const handleCreateTask = useCallback(
    (title: string) => {
      const newTask: ITask = {
        id: Math.random().toString(),
        order: tasks.length + 1,
        title: title,
        done: false,
        isRunning: false,
      };

      const allTasks = [...tasks, newTask];
      allTasks.sort((a, b) => {
        return a.order - b.order;
      });
      setTasks([...allTasks]);
    },
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      const result = tasks.filter((task) => task.id !== id);
      setTasks(result);
    },
    [tasks]
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
    (id: string, newState: boolean) => {
      const taskChecked = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      result.forEach((task) => (task.isRunning = false));
      if (taskChecked !== undefined) {
        taskChecked.isRunning = newState;
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
      setCurrentTask(startedTask);

      handleChangeRunning(id, true);
      if (startedTask.done) {
        handleCheckTask(startedTask.id);
      }
    }
  };

  const AbandonTask = useCallback(
    (id: string) => {
      setIsCounting(false);
      const pausedTask = tasks.find((task) => task.id === id);
      if (pausedTask !== undefined) {
        handleChangeRunning(id, false);
      }
    },
    [handleChangeRunning, tasks]
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
        if (taskChecked.done) {
          AbandonTask(taskChecked.id);
        }
        setTasks([...allTasks]);
      }
    },
    [tasks, AbandonTask]
  );

  return (
    <TaskContext.Provider
      value={{
        secondsAmount: secondsAmount,
        isCounting: isCounting,
        decreaseSecondsAmount: decreaseSecondsAmount,
        tasks: tasks,
        currentTask: currentTask,
        defineTasks: defineTasks,
        handleCreateTask: handleCreateTask,
        handleDeleteTask: handleDeleteTask,
        handleCheckTask: handleCheckTask,
        handleChangeTitle: handleChangeTitle,
        startTask: startTask,
        AbandonTask: AbandonTask,
        defineIsCounting: defineIsCounting,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
