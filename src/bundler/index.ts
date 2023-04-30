import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg.path.plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";

let service: esbuild.Service;

const bundler = async (rawCode: string) => {
  if (!service) { //assign just one time
    service = await esbuild.startService({
      worker: true,
      //download and initialize esbuild from unpkg.com site
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
  //transpile and bundle at the same time using esbuild
  const result = await service.build({
	entryPoints: ["index.js"],
	bundle: true,
	write: false,
	plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
	define: {
	  "process.env.NODE_ENV": '"production"',
	  global: "window",
	},
  });
  return result.outputFiles[0].text;
};

export default bundler;