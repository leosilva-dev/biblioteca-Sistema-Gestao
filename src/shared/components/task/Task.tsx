import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Input,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { FiPlay, FiPause } from "react-icons/fi";

import { ITask } from "../../service/api/task/Task";

interface ITaskProps extends ITask {
  handleDelete: (id: string) => void;
  handleCheck: (id: string) => void;
  handleChangeTitle: (id: string, value: string) => void;
  handleChangeRunning: (id: string) => void;
}

export const Task: React.FC<ITaskProps> = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const confirmDelete = () => {
    props.handleDelete(props.id);
  };

  return (
    <HStack padding={2}>
      {/* <span>{`${props.order}`}</span> */}
      <Box cursor={"grabbing"}>
        <DragHandleIcon />
      </Box>

      <Checkbox
        size={"lg"}
        isChecked={props.done}
        onChange={() => props.handleCheck(props.id)}
      />
      <IconButton
        fontSize="18px"
        colorScheme="telegram"
        aria-label={"play or pause"}
        onClick={() => props.handleChangeRunning(props.id)}
        icon={<Icon as={props.isRunning ? FiPause : FiPlay} />}
        variant="ghost"
      />
      <Input
        value={props.title}
        onChange={(e) => props.handleChangeTitle(props.id, e.target.value)}
      />
      {showConfirmDelete ? (
        <IconButton
          fontSize="18px"
          colorScheme="red"
          aria-label={"delete task"}
          onClick={() => {
            confirmDelete();
          }}
          icon={<CheckIcon />}
          variant="ghost"
        />
      ) : (
        <IconButton
          disabled={props.isRunning}
          fontSize="18px"
          colorScheme="whiteAlpha"
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
      )}
    </HStack>
  );
};
