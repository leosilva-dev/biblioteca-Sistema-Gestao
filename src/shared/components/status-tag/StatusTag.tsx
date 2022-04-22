import React from "react";
import { Tag } from "@chakra-ui/react";
import { StatusType } from "../../context/BibliotecaContext";

interface IStatusTagProps {
  status: StatusType;
}

export const StatusTag: React.FC<IStatusTagProps> = ({ status }) => {
  return (
    <>
      {status === "disponivel" && <Tag colorScheme={"green"}>Disponível</Tag>}
      {status === "emprestado" && <Tag colorScheme={"orange"}>Emprestado</Tag>}
      {status === "reservado" && <Tag colorScheme={"red"}>Reservado</Tag>}
    </>
  );
};
