import React, { useRef, useState, KeyboardEvent } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useTask } from "../../hooks/useTask";
import { FiCornerDownLeft } from "react-icons/fi";
import { ITask } from "../../service/api/task/Task";

type IEditTaskDialogProps = Pick<ITask, "id" | "done" | "title">;

export const EditTaskDialog: React.FC<IEditTaskDialogProps> = ({
  id,
  done,
  title,
}) => {
  const { handleChangeTitle } = useTask();

  const [taskTitle, setTaskTile] = useState(title);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputFocus = useRef<HTMLInputElement>(null);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      save();
      onClose();
    }
  };

  const ChangeTitle = (title: string) => {
    setTaskTile(title);
  };

  const save = () => {
    handleChangeTitle(id, taskTitle);
    onClose();
  };

  const cancelEdit = () => {
    setTaskTile(title);
    onClose();
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Edit task"
        placement="top"
        bg="gray.300"
        color="black"
      >
        <IconButton
          disabled={done}
          fontSize="18px"
          colorScheme="#26C485"
          aria-label={"delete task"}
          onClick={onOpen}
          icon={<EditIcon />}
          variant="ghost"
        />
      </Tooltip>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={inputFocus}
        onClose={cancelEdit}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Edit task: {title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody onKeyDown={handleKeyboardEvent}>
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                children={<Icon color={"gray.400"} as={FiCornerDownLeft} />}
              />
              <Input
                ref={inputFocus}
                isTruncated
                // width="80"
                value={taskTitle}
                onChange={(e) => ChangeTitle(e.target.value)}
              />
            </InputGroup>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={cancelEdit}>
              Cancel
            </Button>
            <Button colorScheme="green" ml={3} onClick={save}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
