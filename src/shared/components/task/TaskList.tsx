import { useCallback, useState, useEffect } from "react";
import { Button, useColorMode, VStack } from "@chakra-ui/react";
import { Task } from "./Task";
import { AddIcon } from "@chakra-ui/icons";
import { ITask, taskService } from "../../service/api/task/Task";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const tasksDB = taskService.getAll();
    if (tasksDB != null) {
      setTasks(tasksDB);
    }
  }, [setTasks]);

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

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const [reorderedItem] = tasks.splice(result.source.index, 1);
      tasks.splice(result.destination.index, 0, reorderedItem);
      tasks.forEach((option, index) => {
        option.order = index + 1;
      });

      setTasks([...tasks]);
    },
    [tasks]
  );

  return (
    <VStack marginTop={2} spacing={2}>
      <Button
        leftIcon={<AddIcon />}
        color="primary"
        variant="solid"
        onClick={handleCreateTask}
      >
        New task
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lines">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}`}
                    index={index}
                  >
                    {(provided, { isDragging }) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          background: isDragging
                            ? colorMode === "light"
                              ? "#FDFFFC"
                              : "#2D3748"
                            : "transparent",
                          borderRadius: 5,
                          paddingRight: isDragging ? 3 : 0,
                          paddingTop: isDragging ? 1.5 : 0,
                        }}
                      >
                        <Task
                          key={task.id}
                          id={task.id}
                          order={task.order}
                          title={task.title}
                          done={task.done}
                          isRunning={task.isRunning}
                          handleDelete={handleDeleteTask}
                          handleCheck={handleCheckTask}
                          handleChangeTitle={handleChangeTitle}
                          handleChangeRunning={handleChangeRunning}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* {tasks &&
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              order={task.order}
              title={task.title}
              done={task.done}
              handleDelete={handleDeleteTask}
              handleCheck={handleCheckTask}
              handleChangeTitle={handleChangeTitle}
            />
          );
        })} */}
    </VStack>
  );
};
