import React, { useState } from "react";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Button,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import {
  CheckIcon,
  DeleteIcon,
  DragHandleIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { FiPlay } from "react-icons/fi";

import { ITask } from "../../service/api/task/Task";
import { useTask } from "../../hooks/useTask";
import { EditTaskDialog } from "./EditTaskDialog";

export const Task: React.FC<ITask> = ({
  done,
  id,
  isRunning,
  order,
  title,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { handleDeleteTask, handleCheckTask, startTask, isCounting } =
    useTask();

  return (
    <HStack padding={2}>
      <Box cursor={"grabbing"}>
        <DragHandleIcon />
      </Box>

      <Checkbox
        size={"lg"}
        isChecked={done}
        onChange={() => handleCheckTask(id)}
      />
      <Tooltip
        hasArrow
        label={"Start task"}
        placement="top"
        bg="gray.300"
        color="black"
      >
        <IconButton
          disabled={isRunning || done}
          fontSize="18px"
          colorScheme="telegram"
          aria-label={"play"}
          onClick={() => startTask(id)}
          icon={<Icon as={FiPlay} />}
          variant="ghost"
        />
      </Tooltip>
      {done ? (
        <Text isTruncated width="80" fontSize="md" as="del">
          {title}
        </Text>
      ) : (
        <Text isTruncated width="80" fontSize="md" as="abbr">
          {title}
        </Text>
        // <Input
        //   isTruncated
        //   width="80"
        //   value={title}
        //   onChange={(e) => handleChangeTitle(id, e.target.value)}
        // />
      )}
      <EditTaskDialog id={id} title={title} done={done} />

      {showConfirmDelete ? (
        <Tooltip
          hasArrow
          label="Confirm delete?"
          placement="top"
          bg="gray.300"
          color="black"
        >
          <IconButton
            fontSize="18px"
            colorScheme="red"
            aria-label={"delete task"}
            onClick={() => {
              handleDeleteTask(id);
            }}
            icon={<CheckIcon />}
            variant="ghost"
          />
        </Tooltip>
      ) : isRunning ? (
        <Button
          isLoading
          colorScheme="#26C485"
          variant="link"
          spinnerPlacement="start"
          spinner={isCounting ? <TimeIcon /> : <CheckIcon />}
        />
      ) : (
        <Tooltip
          hasArrow
          label="Delete task"
          placement="top"
          bg="gray.300"
          color="black"
        >
          <IconButton
            disabled={isRunning}
            fontSize="18px"
            colorScheme="#26C485"
            aria-label={"delete task"}
            onClick={() => {
              setShowConfirmDelete(true);
              setTimeout(() => {
                setShowConfirmDelete(false);
              }, 5000);
            }}
            icon={<DeleteIcon />}
            variant="ghost"
          />
        </Tooltip>
      )}
    </HStack>
  );
};
