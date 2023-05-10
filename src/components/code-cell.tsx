import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  const initialValue = `import ReactDOM from 'react-dom';
import React from 'react';
const App = () => <h1></h1>
ReactDOM.render(<App />, document.querySelector("#root"))`

  useEffect(() => {
    //not to load preview too much
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      // console.log(output);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    return () => {
      //clear timeout every time input was changed
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialValue}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
