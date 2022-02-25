import { ChakraProvider } from "@chakra-ui/react";
import { Routes } from "./routes/Routes";
import { TaskProvider } from "./shared/context/TaskContext";
import { LayoutPageDefault } from "./shared/layout/LayoutPageDefault";
import { myTheme } from "./shared/theme/Theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <LayoutPageDefault>
        <TaskProvider>
          <Routes />
        </TaskProvider>
      </LayoutPageDefault>
    </ChakraProvider>
  );
}

export default App;
