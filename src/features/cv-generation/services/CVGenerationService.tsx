import {
  appDataDir,
  downloadDir,
  join,
  resolveResource,
} from "@tauri-apps/api/path";
import { ChildProcess, Command } from "@tauri-apps/api/shell";

export const CVGenerationService = {
  generate: async (): Promise<ChildProcess> => {
    const appDataDirPath = await appDataDir();
    const command = Command.sidecar("binaries/main", [
      "--path-data",
      await join(appDataDirPath, "data.json"),
      "--path-img",
      await resolveResource(await join("resources", "IMG_9838.jpg")),
      "--path-template",
      await resolveResource(
        await join("resources", "CV_Nom_Prenom_Capability.pptx")
      ),
      "--output-folder",
      await downloadDir(),
    ]);
    const output = await command.execute();
    return output;
  },
};
