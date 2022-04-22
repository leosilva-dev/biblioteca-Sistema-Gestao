import {
  Flex,
  Box,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { StatusTag } from "../shared/components/status-tag/StatusTag";
import { useBiblioteca } from "../shared/hooks/useBiblioteca";

export const LeitorMain: React.FC = () => {
  const { livros, handleEfetuarReserva } = useBiblioteca();

  return (
    <Flex minH={"100vh"} align={"start"} justify={"center"} bg={"white"}>
      <Box>
        <Heading size="md">{"Livros"}</Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Tipo</Th>
                <Th>Status</Th>
                <Th isNumeric>Ano de publicação</Th>
                <Th>Autores</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {livros
                .sort((a, b) => {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                })
                .map((livro) => (
                  <Tr key={livro.id}>
                    <Td>{livro.title}</Td>
                    <Td>{livro.tipo}</Td>
                    <Td>
                      <StatusTag status={livro.status} />
                    </Td>
                    <Td>{livro.anoPublicacao}</Td>
                    <Td>{livro.autores}</Td>
                    <Td>
                      <Button
                        colorScheme={"teal"}
                        onClick={() => handleEfetuarReserva(livro.id)}
                      >
                        Reservar
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
};
