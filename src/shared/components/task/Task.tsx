import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Input,
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

export const Task: React.FC<ITask> = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const {
    handleDeleteTask,
    handleCheckTask,
    handleChangeTitle,
    startTask,
    isCounting,
  } = useTask();

  return (
    <HStack
      padding={2}
      style={{ background: props.isRunning ? "" /* "#26C485" */ : "" }}
    >
      <Box cursor={"grabbing"}>
        <DragHandleIcon />
      </Box>

      <Checkbox
        size={"lg"}
        isChecked={props.done}
        onChange={() => handleCheckTask(props.id)}
      />
      <Tooltip
        hasArrow
        label={"Start task"}
        placement="top"
        bg="gray.300"
        color="black"
      >
        <IconButton
          disabled={props.isRunning || props.done}
          fontSize="18px"
          colorScheme="telegram"
          aria-label={"play"}
          onClick={() => startTask(props.id)}
          icon={<Icon as={FiPlay} />}
          variant="ghost"
        />
      </Tooltip>
      {props.done ? (
        <Text isTruncated width="80" paddingLeft="4" fontSize="md" as="del">
          {props.title}
        </Text>
      ) : (
        <Input
          isTruncated
          width="80"
          value={props.title}
          onChange={(e) => handleChangeTitle(props.id, e.target.value)}
        />
      )}

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
              handleDeleteTask(props.id);
            }}
            icon={<CheckIcon />}
            variant="ghost"
          />
        </Tooltip>
      ) : props.isRunning ? (
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
            disabled={props.isRunning}
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
