import fs from "fs";
import path from "path";
import { PlatFormType, LibeType, localDB } from "../col/db";
import { currentPath } from "../../utils/index";
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
  templatePath: string;
  targetPath: string;
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
      templatePath: rootPath,
      targetPath: rootPath,
      children: [],
    } as DependType;
    const files = fs.readdirSync(rootPath, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    /**
     * 根
     */
    if (projectName === "root") {
      tree.isRoot = true;
      tree.isDir = true;
      tree.targetPath = "{{projectPath}}";
      tree.templatePath = rootPath;
      tree.children = [];
      tree.platFormtype = platFormtype;
      tree.libType = libType;
    } else {
      const targetPath = rootPath.match(/(react|vue).*/i);
      tree.targetPath = targetPath
        ? targetPath[0].replace(/^(react|vue)?/i, "{{projectPath}}")
        : "";
      const templatePath = rootPath.match(/packages.*/i);
      tree.templatePath = templatePath ? templatePath[0] : "";
      tree.isDir = files.length ? true : false;
    }

    /**
     * 子文件
     */
    if (files.length) {
      // console.log(files, "6666666", rootPath);

      files.forEach((file) => {
        const fileTree = {} as DependType;
        const isDirectory = file.isDirectory();
        fileTree.isDir = isDirectory;
        fileTree.isRoot = false;
        const name = file.name;
        if (name === "pages") {
          console.log(name);
          console.log(rootPath);
        }
        const filePath = path.join(rootPath, name);
        // 模板路径
        const targetPath = filePath.match(/(react|vue).*/i);
        fileTree.targetPath = targetPath
          ? targetPath[0].replace(/^(react|vue)?/i, "{{projectPath}}")
          : "";
        // 源模板路径
        const templatePath = filePath.match(/packages.*/i);
        fileTree.templatePath = templatePath ? templatePath[0] : "";
        fileTree.children = [];

        if (isDirectory) {
          const subTree = this.generateDepend2JSON(filePath, name);
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
        const writeStream = fs.createWriteStream(targetPath);
        writeStream.write(str);
        writeStream.end();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /**
   * 创建模板JSON
   * @param platFormtype
   * @param libType
   */
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
  /**
   * 读取文件返回Object
   * @param targetPath
   */
  // packages/template/webpack/react
  static read2Object(targetPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(targetPath, { encoding: "utf-8" }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * 把template复制到目标路径
   * @param rootPath
   * @param templateJsonStr
   */
  static copy2targetPath(rootPath: string, templateJsonStr: string) {
    const handleTemplatePath = (templatePath: string) =>
      path.join(rootPath, "/", templatePath);

    //创建文件夹
    const mkdir = (dirPath: string) => {
      return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    };
    // 复制文件
    const copyFile = (sourcePath: string, targetPath: string) => {
      return new Promise((resolve, reject) => {
        fs.copyFile(sourcePath, targetPath, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    };
    const copy = async (json: DependType) => {
      const children = json.children;
      if (json.isDir) {
        if (this.hasFileorDir(json.targetPath) === FileType.UNEXIST) {
          await mkdir(json.targetPath);
        }
      } else {
        await copyFile(handleTemplatePath(json.templatePath), json.targetPath);
      }
      if (children && children.length > 0) {
        children.forEach((item) => copy(item));
      }
    };
    const db = localDB.commit();
    const projectPath = JSON.stringify(
      path.resolve(db.rootPath, db.projectName)
    ).replace(/\"/g, "");
    const str = templateJsonStr.replace(/\{\{projectPath\}\}/g, projectPath);
    const json = JSON.parse(str) as DependType;
    copy(json);
  }
}
