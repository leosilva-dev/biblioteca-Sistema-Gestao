import React from "react";
import { useBiblioteca } from "../shared/hooks/useBiblioteca";
import { BibliotecarioMain } from "./BibliotecarioMain";
import { LeitorMain } from "./LeitorMain";

export const Home: React.FC = () => {
  const { loggedUserType } = useBiblioteca();

  return (
    <>
      {loggedUserType === "bibliotecario" && <BibliotecarioMain />}
      {loggedUserType === "leitor" && <LeitorMain />}
    </>
  );
};
