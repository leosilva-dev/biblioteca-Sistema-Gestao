import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { EditBookDialog } from "../shared/components/edit-book-dialog/EditBookDialog";
import { StatusTag } from "../shared/components/status-tag/StatusTag";
import { useBiblioteca } from "../shared/hooks/useBiblioteca";

export const BibliotecarioMain: React.FC = () => {
  const { livros } = useBiblioteca();
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
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
                      <EditBookDialog livroId={livro.id} />
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
