import { FileFn, FileType } from "../commands/file/file";
import path from "path";
import { PlatFormType, LibeType } from "../commands/col/db";

export const currentPath = () => process.cwd();

export const checkFile = () => {};

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
    FileFn.writeString(JSON.stringify(dirDependObj), platFormtype, libType);
  });
};
export const pathFn = (url: string) => path.resolve(currentPath(), url);
export const generateAllPath = () => {
  const viteReactPath = pathFn("packages/template/vite/react");
  const viteVuePath = pathFn("packages/template/vite/vue");
  const webpackReactPath = pathFn("packages/template/webpack/react");
  const webpackVuePath = pathFn("packages/template/webpack/vue");
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
