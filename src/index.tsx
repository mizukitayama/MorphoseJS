import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg.path.plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";
import CodeEditor from "./components/code-editor";


const App = () => {
  const ref = useRef<any>();
  const refIframe = useRef<any>();
  const [input, setInput] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      //download and initialize esbuild from unpkg.com site
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    };

    refIframe.current.srcdoc = html;

    //transpile and bundle at the same time using esbuild
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    refIframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try {
              eval(event.data); //execute the code
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = "<div style='color: red;'><h5>Runtime error!</h5>" + err + "</div>";
              console.error(err)
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)}
        />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe title="code-preview" ref={refIframe} sandbox="allow-scripts" />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<App />);
