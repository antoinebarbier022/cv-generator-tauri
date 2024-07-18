import { open } from "@tauri-apps/api/dialog";
import {
  BaseDirectory,
  createDir,
  exists,
  readBinaryFile,
  readTextFile,
  writeBinaryFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir, extname, join, pictureDir } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { emptyInitialContentResume } from "../../../constants/emptyInitialContentResume";
import { UserData } from "../types/storage";

const CONTENT_DATA_FILE = `data.json`;

export const StorageService = {
  getContentData: async (): Promise<UserData> => {
    const existFile = await exists(CONTENT_DATA_FILE, {
      dir: BaseDirectory.AppData,
    });
    if (!existFile) {
      return emptyInitialContentResume;
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
    // if appDir doesn't exist
    try {
      const isAppDataDirPath = await exists(await appDataDir());
      if (!isAppDataDirPath) {
        await createDir(await appDataDir());
      }
    } catch (e) {
      console.error(e);
    }

    await writeTextFile(
      { path: CONTENT_DATA_FILE, contents: JSON.stringify(values) },
      { dir: BaseDirectory.AppData }
    );
    const data = await readTextFile(CONTENT_DATA_FILE, {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(data) as UserData;
  },

  getImageProfile: async (pictureFilePath: string): Promise<string> => {
    if (!pictureFilePath) {
      return "";
    }
    try {
      const data = convertFileSrc(pictureFilePath);
      return data;
    } catch {
      return "";
    }
  },

  setImageProfile: async (): Promise<string | null> => {
    const filePath = await open({
      defaultPath: await pictureDir(),
    });
    if (filePath === null) {
      return null;
    }
    const extension = await extname(filePath as string);
    const picture = await readBinaryFile(filePath as string);

    // if appDir doesn't exist
    try {
      const isAppDataDirPath = await exists(await appDataDir());
      if (!isAppDataDirPath) {
        await createDir(await appDataDir());
      }
    } catch (e) {
      console.error(e);
    }

    await writeBinaryFile(
      {
        path: `profile.${extension}`,
        contents: picture,
      },
      { dir: BaseDirectory.AppData }
    );
    return await join(await appDataDir(), `profile.${extension}`);
  },
};
