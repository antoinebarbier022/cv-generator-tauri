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
  resetContentData: async (): Promise<void> => {
    try {
      const suggestedAppDataPath = await appDataDir();
      const isExistAppDataDirPath = await exists(suggestedAppDataPath);

      if (!isExistAppDataDirPath) {
        await createDir(suggestedAppDataPath, { recursive: true });
      }
    } catch (error) {
      console.error("Error create folder appDataDir:", error);
      throw error;
    }

    try {
      await writeTextFile(
        {
          path: CONTENT_DATA_FILE,
          contents: JSON.stringify(emptyInitialContentResume),
        },
        { dir: BaseDirectory.AppData }
      );
    } catch (writeFileError) {
      console.error("Failed to reset content data file:", writeFileError);
      throw new Error("Failed to reset content data file");
    }
  },
  getContentData: async (): Promise<UserData> => {
    let data;
    try {
      const existFile = await exists(CONTENT_DATA_FILE, {
        dir: BaseDirectory.AppData,
      });

      if (!existFile) {
        console.warn(
          `File ${CONTENT_DATA_FILE} does not exist. Returning empty initial content.`
        );
        return emptyInitialContentResume;
      }

      data = await readTextFile(CONTENT_DATA_FILE, {
        dir: BaseDirectory.AppData,
      });
    } catch (error) {
      console.error("Error accessing the content data file:", error);
      return emptyInitialContentResume;
    }

    try {
      return JSON.parse(data) as UserData;
    } catch (jsonError) {
      console.error("Failed to parse JSON data:", jsonError);
      throw Error(`Failed to parse JSON data:${jsonError}`);
    }
  },

  setContentData: async ({
    values,
  }: {
    values: UserData;
  }): Promise<UserData> => {
    try {
      const suggestedAppDataPath = await appDataDir();
      const isExistAppDataDirPath = await exists(suggestedAppDataPath);

      if (!isExistAppDataDirPath) {
        await createDir(suggestedAppDataPath, { recursive: true });
      }
    } catch (error) {
      console.error("Error create folder appDataDir:", error);
      throw error;
    }

    try {
      await writeTextFile(
        { path: CONTENT_DATA_FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      );
    } catch (writeFileError) {
      console.error("Failed to write file:", writeFileError);
      throw new Error("Failed to write content data file");
    }
    return values;
  },

  getImageProfile: async (pictureFilePath: string): Promise<string> => {
    if (!Boolean(pictureFilePath)) {
      return "";
    }
    return convertFileSrc(pictureFilePath);
  },

  setImageProfile: async (): Promise<string | null> => {
    let filePath;
    try {
      filePath = await open({
        defaultPath: await pictureDir(),
        filters: [
          {
            name: "Image",
            extensions: ["png", "jpeg", "jpg", "HEIC", "webp"],
          },
        ],
      });

      if (filePath === null) {
        return null;
      }
    } catch (error) {
      console.error("Error open dialog:", error);
      throw error;
    }

    try {
      const suggestedAppDataPath = await appDataDir();
      const isExistAppDataDirPath = await exists(suggestedAppDataPath);
      if (!isExistAppDataDirPath) {
        await createDir(suggestedAppDataPath, { recursive: true });
      }
    } catch (error) {
      console.error("Error create folder appDataDir:", error);
      throw error;
    }

    try {
      const extension = await extname(filePath as string);
      const picture = await readBinaryFile(filePath as string);
      await writeBinaryFile(
        {
          path: `profile.${extension}`,
          contents: picture,
        },
        { dir: BaseDirectory.AppData }
      );
      return await join(await appDataDir(), `profile.${extension}`);
    } catch (error) {
      console.error("Error write image inside AppDataDir:", error);
      throw error;
    }
  },
};
