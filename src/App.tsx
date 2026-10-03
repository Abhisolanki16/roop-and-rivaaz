import { StoreProvider } from "./context/StoreContext";
import StoreApp from "./app/page";

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
