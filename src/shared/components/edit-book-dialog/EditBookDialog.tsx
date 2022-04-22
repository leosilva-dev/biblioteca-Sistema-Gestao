import React, { useRef, useState, KeyboardEvent, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useBiblioteca } from "../../hooks/useBiblioteca";

interface IEditBookDialogProps {
  livroId: string;
}

export const EditBookDialog: React.FC<IEditBookDialogProps> = ({ livroId }) => {
  const { updateLivro, getLivroById } = useBiblioteca();

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

  const [id] = useState(getLivroById(livroId)?.id);
  const [title, setTitle] = useState(getLivroById(livroId)?.title);
  const [tipo, setTipo] = useState(getLivroById(livroId)?.tipo);
  const [status, setStatus] = useState(getLivroById(livroId)?.status);
  const [statusRadio, setStatusRadio] = useState(
    String(getLivroById(livroId)?.status)
  );
  const [anoPublicacao, setAnoPublicacao] = useState(
    getLivroById(livroId)?.anoPublicacao
  );
  const [autores, setAutores] = useState(getLivroById(livroId)?.autores);

  useEffect(() => {
    if (statusRadio === "disponivel") {
      setStatus("disponivel");
    }
    if (statusRadio === "emprestado") {
      setStatus("emprestado");
    }
    if (statusRadio === "reservado") {
      setStatus("reservado");
    }
  }, [statusRadio]);

  const save = () => {
    if (
      id !== undefined &&
      title !== undefined &&
      tipo !== undefined &&
      status !== undefined &&
      anoPublicacao !== undefined &&
      autores !== undefined
    ) {
      updateLivro(id, {
        id,
        title,
        tipo,
        status,
        anoPublicacao,
        autores,
      });
    }

    onClose();
  };

  const cancelEdit = () => {
    onClose();
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Editar livro"
        placement="top"
        bg="gray.300"
        color="black"
      >
        <IconButton
          fontSize="18px"
          colorScheme="#26C485"
          aria-label={"open"}
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
          <AlertDialogHeader>Editar livro: {title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody onKeyDown={handleKeyboardEvent}>
            <Box marginBottom={5}>
              <Input
                isTruncated
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box marginBottom={5}>
              <Input
                isTruncated
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Box>
            <Box marginBottom={5}>
              <Input
                isTruncated
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
              />
            </Box>
            <Box marginBottom={5}>
              <Input
                isTruncated
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              />
            </Box>
            <Box marginBottom={5}>
              <RadioGroup value={statusRadio} onChange={setStatusRadio}>
                <HStack spacing="24px">
                  <Radio value="disponivel">Disponivel</Radio>
                  <Radio value="reservado">Reservado</Radio>
                  <Radio value="emprestado">Emprestado</Radio>
                </HStack>
              </RadioGroup>
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={cancelEdit}>
              Cancelar
            </Button>
            <Button colorScheme="teal" ml={3} onClick={save}>
              Salvar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
