import { useCallback } from "react";
import { Divider, useColorMode, VStack } from "@chakra-ui/react";
import { Task } from "./Task";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useTask } from "../../hooks/useTask";
import { NewTaskDialog } from "./NewTaskDialog";

export const TaskList: React.FC = () => {
  const { colorMode } = useColorMode();
  const { tasks, defineTasks } = useTask();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      if (tasks !== undefined) {
        const [reorderedItem] = tasks.splice(result.source.index, 1);
        tasks.splice(result.destination.index, 0, reorderedItem);
        tasks.forEach((option, index) => {
          option.order = index + 1;
        });

        defineTasks([...tasks]);
      }
    },
    [defineTasks, tasks]
  );

  const showDivider = () => {
    return (
      tasks?.find((task) => task.done === false) &&
      tasks?.find((task) => task.done === true)
    );
  };

  return (
    <VStack marginTop={2} spacing={2}>
      <NewTaskDialog />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks
                ?.filter((tasks) => tasks.done === false)
                .map((task, index) => {
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
      {showDivider() ? <Divider /> : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="finished_tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks
                ?.filter((tasks) => tasks.done === true)
                .map((task, index) => {
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
    </VStack>
  );
};
