import { useContext } from "react";

import { BibliotecaContext } from "../context/BibliotecaContext";

export const useBiblioteca = () => {
  const context = useContext(BibliotecaContext);

  return context;
};
