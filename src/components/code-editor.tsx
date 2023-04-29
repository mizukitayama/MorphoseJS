import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();

  //first displayed on screen
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
	editorRef.current = monacoEditor;
	//create an event listener which is called on change on editor
	monacoEditor.onDidChangeModelContent(() => {
		onChange(getValue());
	});
	monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

//   const onClickFormat = () => {
// 	const unformatted = editorRef.current.getModel().getValue();
// 	const formatted = prettier.format(unformatted, {
// 		parser: "babel",
// 		plugins: [parser],
// 		useTabs: false,
// 		semi: true,
// 		singleQuote: false
// 	})
// 	editorRef.current.setValue(formatted)
//   }

  return (
	<div>
		{/* <button onClick={onClickFormat}>Format</button> */}
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      height="500px"
      language="javascript"
      theme="light"
      options={{
        minimap: {enabled: false},
        wordWrap: "on",
        // showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 12,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
	</div>
  );
};

export default CodeEditor;
