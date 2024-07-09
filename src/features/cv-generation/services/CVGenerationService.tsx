import { save } from "@tauri-apps/api/dialog";
import {
  appDataDir,
  downloadDir,
  join,
  resolveResource,
} from "@tauri-apps/api/path";
import { ChildProcess, Command } from "@tauri-apps/api/shell";

export const CVGenerationService = {
  getPathToSave: async (): Promise<string> => {
    const defaultFileName = "test_cv";
    const filePath = await save({
      defaultPath: (await downloadDir()) + "/" + defaultFileName + ".pptx",
      title: "Sauvegarder",
    });
    if (!filePath) {
      throw Error("Filepath is wrong");
    }
    return filePath;
  },
  generate: async ({
    filePath,
  }: {
    filePath: string;
  }): Promise<ChildProcess> => {
    const appDataDirPath = await appDataDir();
    const outputFolderPath = filePath.replace(filePath, "");
    const outputFileName = filePath
      .replace(outputFolderPath, "")
      .replace(".pptx", "");
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
      outputFolderPath,
      "--output-filename",
      outputFileName,
    ]);
    const output = await command.execute();
    return output;
  },
};
