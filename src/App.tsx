import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { BibliotecaProvider } from "./shared/context/BibliotecaContext";
import { LayoutPageDefault } from "./shared/layout/LayoutPageDefault";
import { myTheme } from "./shared/theme/Theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <BibliotecaProvider>
        <BrowserRouter>
          <LayoutPageDefault>
            <AppRoutes />
          </LayoutPageDefault>
        </BrowserRouter>
      </BibliotecaProvider>
    </ChakraProvider>
  );
}

export default App;
