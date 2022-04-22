import React, { createContext, useCallback, useState } from "react";
import { Feedback } from "../util/feedback/Feedback";

export interface IUser {
  id: string;
  name: string;
  username: string;
  senha: string;
  perfil: UserType;
}

type UserType = "bibliotecario" | "leitor";

export interface ILivro {
  id: string;
  title: string;
  tipo: string;
  autores: string;
  anoPublicacao: string;
  status: StatusType;
}

export type StatusType = "disponivel" | "reservado" | "emprestado";

interface IBibliotecaContextData {
  isLoggedIn: boolean;
  users: IUser[];
  livros: ILivro[];
  loggedUserType: UserType;
  handleLogin: (username: string, senha: string) => void;
  logout: () => void;
  handleEfetuarReserva: (idLivro: string) => void;
  updateLivro: (idLivro: string, livroToUpdate: ILivro) => void;
  getLivroById: (idLivro: string) => ILivro | undefined;
}
export const BibliotecaContext = createContext<IBibliotecaContextData>(
  {} as IBibliotecaContextData
);

export const BibliotecaProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserType, setLoggedUserType] = useState<UserType>(
    {} as UserType
  );
  const [users] = useState<IUser[]>([
    {
      id: "1",
      name: "Leonardo Silva",
      username: "leo",
      senha: "123",
      perfil: "bibliotecario",
    },
    {
      id: "2",
      name: "Camila Silva",
      username: "camilasilva",
      senha: "321",
      perfil: "leitor",
    },
  ]);
  const [livros, setLivros] = useState<ILivro[]>([
    {
      id: "1",
      title: "O Senhor dos Anéis",
      tipo: "Fantasia",
      autores: "J.R.R. Tolkien",
      anoPublicacao: "1954",
      status: "disponivel",
    },
    {
      id: "2",
      title: "O Hobbit",
      tipo: "Fantasia",
      autores: "J.R.R. Tolkien",
      anoPublicacao: "1937",
      status: "reservado",
    },
    {
      id: "3",
      title: "Game of Thrones",
      tipo: "Ficção",
      autores: "George R.R. Martin",
      anoPublicacao: "1996",
      status: "disponivel",
    },
    {
      id: "4",
      title: "A série de HQs",
      tipo: "Ficção",
      autores: "George R.R. Martin",
      anoPublicacao: "1996",
      status: "disponivel",
    },
    {
      id: "5",
      title: "Steve Jobs",
      tipo: "Biografia",
      autores: "Walter Isaacson",
      anoPublicacao: "2011",
      status: "emprestado",
    },
  ]);

  const handleLogin = useCallback(
    (username: string, password: string): boolean => {
      const user = users.find(
        (user) => user.username === username && user.senha === password
      );

      if (user) {
        setIsLoggedIn(true);
        setLoggedUserType(user.perfil);
        Feedback("Login realizado com sucesso!", "success");
        return true;
      }

      Feedback("Não foi possível realizar o login", "error");
      return false;
    },

    [users]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const handleEfetuarReserva = useCallback(
    (livroId: string) => {
      const livroParaReservar = livros.find((livro) => livro.id === livroId);
      if (livroParaReservar) {
        const livrosRestantes = livros.filter((livro) => livro.id !== livroId);

        if (livroParaReservar.status === "disponivel") {
          livroParaReservar.status = "reservado";
          livrosRestantes.forEach((livro) => {
            if (livro.status === "reservado") {
              livro.status = "disponivel";
            }
          });
          setLivros(
            [...livrosRestantes, livroParaReservar].sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            })
          );

          Feedback("Livro reservado com sucesso!", "success");
        } else {
          Feedback("Livro indisponível para reserva!", "error");
        }
      } else {
        Feedback("Livro não encontrado!", "error");
      }
    },
    [livros]
  );

  const updateLivro = useCallback(
    (livroId: string, livroToUpdate: ILivro) => {
      const livroParaAtualizar = livros.find((livro) => livro.id === livroId);
      const livrosRestantes = livros.filter((livro) => livro.id !== livroId);

      if (livroParaAtualizar) {
        livroParaAtualizar.id = livroToUpdate.id;
        livroParaAtualizar.title = livroToUpdate.title;
        livroParaAtualizar.tipo = livroToUpdate.tipo;
        livroParaAtualizar.autores = livroToUpdate.autores;
        livroParaAtualizar.anoPublicacao = livroToUpdate.anoPublicacao;
        livroParaAtualizar.status = livroToUpdate.status;

        const allLivros = [...livrosRestantes, livroParaAtualizar];

        setLivros([...allLivros]);

        Feedback("Livro atualizado com sucesso!", "success");
      } else {
        Feedback("Livro não encontrado!", "error");
      }
    },
    [livros]
  );

  const getLivroById = useCallback(
    (livroId: string) => {
      const livro = livros.find((livro) => livro.id === livroId);
      return livro;
    },
    [livros]
  );

  return (
    <BibliotecaContext.Provider
      value={{
        isLoggedIn,
        users,
        livros,
        handleLogin,
        logout,
        loggedUserType,
        handleEfetuarReserva,
        updateLivro,
        getLivroById,
      }}
    >
      {children}
    </BibliotecaContext.Provider>
  );
};
