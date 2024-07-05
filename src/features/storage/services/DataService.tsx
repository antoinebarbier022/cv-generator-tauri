import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { UserData } from "../types/storage";

const FILE = `data.json`;

export const DataService = {
  get: async (): Promise<UserData> => {
    const existFile = await exists(FILE, { dir: BaseDirectory.AppData });
    if (!existFile) {
      throw new Error("File does not exist");
    }

    const data = await readTextFile(FILE, { dir: BaseDirectory.AppData });
    return JSON.parse(data) as UserData;
  },
  set: async ({ values }: { values: UserData }): Promise<UserData> => {
    try {
      await writeTextFile(
        { path: FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
      const data = await readTextFile(FILE, { dir: BaseDirectory.AppData });
      return JSON.parse(data) as UserData;
    } catch (e) {
      throw new Error("Error when update the data storage");
    }
  },
  generateCV: async ({ values }: { values: UserData }): Promise<UserData> => {
    try {
      await writeTextFile(
        { path: FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
      const data = await readTextFile(FILE, { dir: BaseDirectory.AppData });
      return JSON.parse(data) as UserData;
    } catch (e) {
      throw new Error("Error when update the data storage");
    }
  },
};
