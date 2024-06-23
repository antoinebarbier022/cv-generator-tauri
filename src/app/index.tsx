import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";

import { Alert, Button, Container, Input, Typography } from "@mui/joy";
import { Command } from "@tauri-apps/api/shell";
import { resolveResource } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [message, setMessage] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: message }));
  }

  return (
    <Container>
      <Typography level="h1">Frog CV generator!</Typography>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <Input
          id="greet-input"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter a name..."
        />

        <Button
          onClick={async () => {
            const resourceDataSchemaPath = await resolveResource(
              "resources/schema.json"
            );
            const resourceDataPath = await resolveResource("resources");
            const resourceTemplatePath = await resolveResource(
              "resources/CV_Nom_Prenom_Capability.pptx"
            );
            const test = JSON.parse(await readTextFile(resourceDataSchemaPath));
            console.log(test);
            console.log(resourceDataPath);
            console.log(resourceTemplatePath);
            const command = Command.sidecar("binaries/main");
            /**
             * [
              "--data-folder",
              resourceDataPath,
              "--template",
              resourceTemplatePath,
              "--output-folder",
              resourceDataPath,
            ]
             */
            const output = await command.execute();
            setMessage(output.stderr);
            console.log(output);
          }}
        >
          Greet
        </Button>
        <Alert color="danger">{message}</Alert>
      </form>

      <p>{greetMsg}</p>
    </Container>
  );
}

export default App;
