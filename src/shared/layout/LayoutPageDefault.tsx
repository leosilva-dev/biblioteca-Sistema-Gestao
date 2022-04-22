import React, { useEffect } from "react";
import { Wrap, WrapItem, Center } from "@chakra-ui/react";

import { Header } from "../components/header/Header";
import { useLocation } from "react-router-dom";

export const LayoutPageDefault: React.FC = ({ children }) => {
  const location = useLocation();
  const pathToShowHeader = ["/"];

  useEffect(() => {
    document.title = "Biblioteca";
  }, []);

  return (
    <>
      {pathToShowHeader.includes(location.pathname) && <Header />}
      <Wrap
        marginRight={{ md: 100, sm: 30 }}
        marginLeft={{ md: 100, sm: 30 }}
        marginTop={{ md: 10, sm: 5 }}
        marginBottom={{ md: 30, sm: 5 }}
        justify={"center"}
        overflow={"hidden"}
        h={"full"}
        w={"auto"}
      >
        <WrapItem>
          <Center>{children}</Center>
        </WrapItem>
      </Wrap>
    </>
  );
};
