import { FileFn, FileType } from "../commands/file/file";
import path from "path";
import { PlatFormType, LibeType } from "../commands/col/db";

type targetType = string | number | boolean | symbol | object | Array<any>

/**
 * 获取允许命令的当前位置
 */
export const currentPath = () => process.cwd();


/**
 * 生成模板
 */
export const generate = () => {
  const pathList = generateAllPath();
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
 * 深克隆 对象中存在引用，JSON.stringify无法转换
 * @param target 
 * @param ref 
 */
export const deepClone = (target: targetType, ref:WeakSet<Object> = new WeakSet()):any => {
  const baseData = ["string", "number", "boolean", "symbol", "undefined"]
  let newValue;

  if (baseData.includes(typeof target)) {
    newValue = target
  } else if (target instanceof Array) {
    const cach = []
    ref.add(target)
    for (let i = 0; i < target.length; i++) {
      if (ref.has(target[i])) continue;
      const item = target[i]
      cach.push(deepClone(item, ref))
    }
    newValue = cach
  } else if (target instanceof Object) {
    let cach = {}
    ref.add(target)
    const oKeys= Object.keys(target)
    for (let i = 0; i < oKeys.length; i++) {
      const key = oKeys[i] 
      const value = (target as any)[key]  ;
      if (ref.has(value)) continue;
      (cach as any)[key] = deepClone(value, ref)
    }
    newValue = cach
  }

  return newValue;
}
/**
 * 生成模板路径
 */
export const generateAllPath = () => {
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
