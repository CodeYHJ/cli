import { currentPath } from "../../utils/index";
// import { download_webpack } from "../clone/download";
import { PlatFormType, LibeType, localDB } from "../col/db";
import { FileFn, FileType } from "../file/file";
import { deepClone } from "../../utils/index";
// import { scan } from "../file/scan";
import path from "path";
/**
 * 创建vite_vue
 */
export const create_vite_vue = async () => {
  console.log("create:", currentPath());
};
/**
 * 创建webpack_vue
 */
export const create_webpack_vue = async () => {
  console.log("create:", currentPath());
  // await download_webpack("vue");
};
/**
 * 创建vite_react
 */
export const create_vite_react = async () => {
  console.log("create:", currentPath());

};
/**
 * 创建webpack_reat
 */
export const create_webpack_react = async () => {
  console.log("create:", currentPath());
  // 检测
  const { projectName, rootPath, platFormtype, libType } = localDB.commit();
  const projectPath = path.resolve(rootPath, projectName);
  const fileType = FileFn.hasFileorDir(projectPath)
  if (FileType.EXIST === fileType) {
    throw new Error("存在重复文件或文件夹");
  }


  // 获取json文件path
  const jsonPath = getJSONPath(platFormtype, libType);

  // 获取json-Object
  const templateJsonStr = await FileFn.read2Object(jsonPath).catch(err => {
    console.log(err, '8888888')
  })

  // 获取template文件path
  let root = getRootPath();
  FileFn.copy2targetPath(root,templateJsonStr);
};


/**
 * 生成模板路径
 */
export const generateAllTemplatePath = () => {
  const viteReactPath = "packages/template/vite/react";
  const viteVuePath = "packages/template/vite/vue";
  const webpackReactPath = "packages/template/webpack/react";
  const webpackVuePath = "packages/template/webpack/vue";
  return [
    {
      platFormtype: PlatFormType.VITE,
      libType: LibeType.REACT,
      path: viteReactPath,
    },
    {
      platFormtype: PlatFormType.VITE,
      libType: LibeType.VUE,
      path: viteVuePath,
    },
    {
      platFormtype: PlatFormType.WEBPACK,
      libType: LibeType.REACT,
      path: webpackReactPath,
    },
    {
      platFormtype: PlatFormType.WEBPACK,
      libType: LibeType.VUE,
      path: webpackVuePath,
    },
  ];

};

/**
* 生成模板
*/
export const generateTemplate = () => {
  const pathList = generateAllTemplatePath();
  const complatePath = pathList.filter(
    ({ path }) => FileFn.hasFileorDir(path) === FileType.EXIST
  );
  complatePath.forEach(({ path, platFormtype, libType }) => {

    const dirDependObj = FileFn.generateDepend2JSON(
      path,
      undefined,
      platFormtype,
      libType
    );
    const clone = deepClone(dirDependObj)
    FileFn.writeString(JSON.stringify(clone), platFormtype, libType);
  });
};

/**
 * 生成templateJson文件路径
 * @param platFormtype 
 * @param libType 
 */
export const getJSONPath = (platFormtype: PlatFormType, libType: LibeType) => {
  const generatorPath = (faleName: string) => path.resolve(getTemplateDirPath(), faleName)
  if (platFormtype === PlatFormType.WEBPACK) {
    if (libType === LibeType.REACT) {
      return generatorPath('webpack_reactMap.json')

    } else {
      return generatorPath('webpack_vueMap.json')

    }
  } else {
    if (libType === LibeType.REACT) {
      return generatorPath('vite_reactMap.json')

    } else {
      return generatorPath('vite_vueMap.json')

    }

  }

}

/**
 * 获取相对于当前模块的template文件夹Path
 */
export const getTemplateDirPath = () => path.resolve(__dirname, '../../template')

/**
 * 获取相对于当前模块的root Path
 */
export const getRootPath = ()=> path.resolve(__dirname, '../../..')
/**
 * 生成对应template文件夹路径
 * @param platFormtype 
 * @param libType 
 */
export const getTemplatePath = (platFormtype: PlatFormType, libType: LibeType) => {
  const generatorPath = (faleName: string) => path.resolve(getTemplateDirPath(), faleName)
  if (platFormtype === PlatFormType.WEBPACK) {
    if (libType === LibeType.REACT) {
      return generatorPath('webpack/react')

    } else {
      return generatorPath('webpack/vue')

    }
  } else {
    if (libType === LibeType.REACT) {
      return generatorPath('vite/react')

    } else {
      return generatorPath('vite/vue')

    }

  }

}
