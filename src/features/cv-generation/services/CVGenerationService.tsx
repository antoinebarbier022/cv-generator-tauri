import { save } from "@tauri-apps/api/dialog";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import {
  appDataDir,
  downloadDir,
  join,
  resolveResource,
} from "@tauri-apps/api/path";
import { ChildProcess, Command } from "@tauri-apps/api/shell";

import { UserData } from "../../storage/types/storage";

export const CVGenerationService = {
  askOutputPath: async (): Promise<string | null> => {
    let data: UserData;
    try {
      data = JSON.parse(
        await readTextFile("data.json", {
          dir: BaseDirectory.AppData,
        })
      );
    } catch (error) {
      console.error("Error accessing the content data file:", error);
      throw Error(`Error accessing the content data file: ${error}`);
    }

    const defaultFileName =
      `CV_${data.lastname}_${data.firstname}_${data.entity}`.replace(/_$/, "");

    const filePath = await save({
      defaultPath: (await downloadDir()) + "/" + defaultFileName + ".pptx",
      title: "Sauvegarder",
    });
    if (!filePath) {
      console.warn("Filepath is wrong");
      return null;
    }
    return filePath;
  },
  generate: async (outputFilePath: string): Promise<ChildProcess> => {
    const appDataDirPath = await appDataDir();
    const outputFolderPath = outputFilePath.replace(outputFilePath, "");
    const outputFileName = outputFilePath
      .replace(outputFolderPath, "")
      .replace(".pptx", "");
    const command = Command.sidecar("binaries/main", [
      "--path-data",
      await join(appDataDirPath, "data.json"),
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
    if (output.stderr) {
      throw Error(output.stderr);
    }
    return output;
  },
};
