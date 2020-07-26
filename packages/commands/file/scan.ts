import { FileFn, FileType } from "./file";
import { localDB } from "../col/db";
import path from "path";
export const scan = () => {
  const { projectName, rootPath } = localDB.commit();
  const projectPath = path.resolve(rootPath, projectName);
  if (FileType.EXIST === FileFn.hasFileorDir(projectPath)) {
    throw new Error("存在重复文件或文件夹");
  }
};
