import { TitleBar } from "../features/titlebar/components/TitleBar";
import { AppProvider } from "./AppProvider";
import { AppRouter } from "./AppRouter";
import {useErrors} from "../features/errors/useErrors.tsx";

const App = () => {
  useErrors()
  return (
    <AppProvider>
      <TitleBar />
      <AppRouter />
    </AppProvider>
  );
};

export default App;
