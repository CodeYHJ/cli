// import { generateAllPath, generate, pathFn } from "../index";
import { pathFn } from "../index";

import { PlatFormType, LibeType } from "../../commands/col/db";
import { FileFn } from "../../commands/file/file";
describe("测试工具函数", () => {
  // test("generateAllPath函数必须返回Array<string>", () => {
  //   const list = generateAllPath();
  //   const viteReactPath = pathFn("packages/template/vite/react");
  //   const viteVuePath = pathFn("packages/template/vite/vue");
  //   const webpackReactPath = pathFn("packages/template/webpack/react");
  //   const webpackVuePath = pathFn("packages/template/webpack/vue");
  //   const testResult = [
  //     {
  //       platFormtype: PlatFormType.VITE,
  //       libType: LibeType.REACT,
  //       path: viteReactPath,
  //     },
  //     {
  //       platFormtype: PlatFormType.VITE,
  //       libType: LibeType.VUE,
  //       path: viteVuePath,
  //     },
  //     {
  //       platFormtype: PlatFormType.WEBPACK,
  //       libType: LibeType.REACT,
  //       path: webpackReactPath,
  //     },
  //     {
  //       platFormtype: PlatFormType.WEBPACK,
  //       libType: LibeType.VUE,
  //       path: webpackVuePath,
  //     },
  //   ];
  //   expect(list).toEqual(testResult);
  // });
  test("generateDepend2JSON函数", () => {
    const test = {
      platFormtype: PlatFormType.WEBPACK,
      libType: LibeType.REACT,
      path: pathFn("packages/template/webpack/react"),
    };
    const obj = FileFn.generateDepend2JSON(
      test.path,
      undefined,
      test.platFormtype,
      test.libType
    );
    console.log(obj.children[0].children[0].children[0]);
  });
  // test("generate函数", () => {
  //   generate();
  //   // console.log(a);
  //   expect(true);
  // });
});
