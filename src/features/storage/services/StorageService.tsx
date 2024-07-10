import { open } from "@tauri-apps/api/dialog";
import {
  BaseDirectory,
  exists,
  readBinaryFile,
  readTextFile,
  writeBinaryFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir, extname, join, pictureDir } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { UserData } from "../types/storage";

const CONTENT_DATA_FILE = `data.json`;

export const StorageService = {
  getContentData: async (): Promise<UserData> => {
    const existFile = await exists(CONTENT_DATA_FILE, {
      dir: BaseDirectory.AppData,
    });
    if (!existFile) {
      throw new Error("File does not exist");
    }

    const data = await readTextFile(CONTENT_DATA_FILE, {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(data) as UserData;
  },
  setContentData: async ({
    values,
  }: {
    values: UserData;
  }): Promise<UserData> => {
    try {
      await writeTextFile(
        { path: CONTENT_DATA_FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
      const data = await readTextFile(CONTENT_DATA_FILE, {
        dir: BaseDirectory.AppData,
      });
      return JSON.parse(data) as UserData;
    } catch (e) {
      throw new Error("Error when update the data storage");
    }
  },
  getImageProfile: async (): Promise<string> => {
    const extension = localStorage.getItem("profile_picture_extension");
    const data = convertFileSrc(
      await join(await appDataDir(), `profile.${extension}`)
    );
    return data;
  },
  setImageProfile: async (): Promise<void> => {
    const filePath = await open({
      defaultPath: await pictureDir(),
    });
    if (filePath) {
      try {
        const extension = await extname(filePath as string);
        const picture = await readBinaryFile(filePath as string);
        localStorage.setItem("profile_picture_extension", extension);
        await writeBinaryFile(
          {
            path: `profile.${extension}`,
            contents: picture,
          },
          { dir: BaseDirectory.AppData }
        );
      } catch (e) {
        throw new Error("Error set profile image to storage");
      }
    }
  },
};
