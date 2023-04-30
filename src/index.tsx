import { createRoot } from "react-dom/client";
import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<App />);
