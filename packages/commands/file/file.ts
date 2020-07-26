import fs from "fs";
import path from "path";
import { PlatFormType, LibeType } from "../col/db";
import { currentPath } from "../../utils/index";
import JSONStream from "JSONStream";
export enum FileType {
  /**
   * 存在
   */
  EXIST = 1,
  /**
   * 不存在
   */
  UNEXIST = 2,
  /**
   * 文件
   */
  FILE = 3,
  /**
   * 文件夹
   */
  DIR = 4,
}
export type DependType = {
  isRoot: boolean;
  path: string;
  isDir: boolean;
  platFormtype?: PlatFormType;
  libType?: LibeType;
  children: DependType[];
};
export class FileFn {
  /**
   * 检测目标路径是否存在文件or文件夹
   * @param filePath
   */
  static hasFileorDir(filePath: string) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return FileType.EXIST;
    } catch (error) {
      return FileType.UNEXIST;
    }
  }
  /**
   * 目标路径是否文件夹
   * @param dirPath
   */
  static isDir(dirPath: string) {
    try {
      const stat = fs.statSync(dirPath);
      if (stat.isDirectory()) {
        return FileType.DIR;
      } else {
        return FileType.UNEXIST;
      }
    } catch (error) {
      throw error;
    }
  }
  /**
   * 目标路径是否文件
   * @param filePath
   */
  static isFile(filePath: string) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        return FileType.FILE;
      } else {
        return FileType.UNEXIST;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 生成目标template文件夹对应静态JSON文件
   * @param targetPath
   */
  static generateDepend2JSON(
    rootPath: string,
    projectName: string = "root",
    platFormtype?: PlatFormType,
    libType?: LibeType
  ) {
    const tree = {
      isRoot: false,
      isDir: false,
      path: rootPath,
      children: [],
    } as DependType;
    const files = fs.readdirSync(rootPath, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    if (projectName === "root") {
      tree.isRoot = true;
      tree.isDir = true;
      tree.path = rootPath;
      tree.children = [];
      tree.platFormtype = platFormtype;
      tree.libType = libType;
    }
    if (files.length) {
      files.forEach((file) => {
        const fileTree = {} as DependType;
        const isDirectory = file.isDirectory();
        const name = file.name;
        const filePath = path.resolve(rootPath, name);
        fileTree.isDir = isDirectory;
        fileTree.path = filePath;
        fileTree.children = [];
        if (isDirectory) {
          const subTree = this.generateDepend2JSON(filePath, name);
          // console.log(tree, "33333", subTree);

          fileTree.children.push(subTree);
        }
        tree.children.push(fileTree);
      });
    }
    return tree;
  }

  /**
   * 写入str
   * @param str
   * @param targetPath
   */
  static writeString(
    str: string | Buffer,
    platFormtype: PlatFormType,
    libType: LibeType
  ) {
    const targetPath = this.templetePath(platFormtype, libType);
    return new Promise((resolve, reject) => {
      if (this.hasFileorDir(targetPath) === FileType.UNEXIST) {
        fs.appendFile(targetPath, "", (err) => {
          if (err) {
            reject(err);
          }
        });
      }
      resolve(str);
    })
      .then((str) => {
        const jsonStream = JSONStream.stringifyObject();
        const writeStream = fs.createWriteStream(targetPath);
        jsonStream.pipe(writeStream);
        jsonStream.write(str);
        jsonStream.end();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static templetePath(platFormtype: PlatFormType, libType: LibeType) {
    const targetPath = (str: string) =>
      path.resolve(currentPath(), `packages/template/${str}Map.json`);
    if (platFormtype === PlatFormType.VITE) {
      if (libType === LibeType.REACT) {
        return targetPath("vite_react");
      } else {
        return targetPath("vite_vue");
      }
    } else {
      if (libType === LibeType.REACT) {
        return targetPath("webpack_react");
      } else {
        return targetPath("webpack_vue");
      }
    }
  }
}
