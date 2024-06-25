import { AppProvider } from "./AppProvider";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
