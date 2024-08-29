import { TitleBar } from "../features/titlebar/components/TitleBar";
import { AppProvider } from "./AppProvider";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <AppProvider>
      <TitleBar />
      <AppRouter />
    </AppProvider>
  );
};

export default App;
