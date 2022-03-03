import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { TaskProvider } from "./shared/context/TaskContext";
import { LayoutPageDefault } from "./shared/layout/LayoutPageDefault";
import { myTheme } from "./shared/theme/Theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <BrowserRouter>
        <LayoutPageDefault>
          <TaskProvider>
            <AppRoutes />
          </TaskProvider>
        </LayoutPageDefault>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
