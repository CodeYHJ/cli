// const download = require("download-git-repo");
import { gitClone } from "./index";
export const download_webpack = (target: string) => {
  return new Promise((resolve, reject) => {
    gitClone(
      "https://github.com/CodeYHJ/template.git",
      `webpack/${target}`,
      function (err: Error | undefined, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
export const download_vite = (target: string) => {
  return new Promise((resolve, reject) => {
    gitClone(
      "https://github.com/CodeYHJ/template.git",
      `vite/${target}`,
      function (err: Error | undefined, res: any) {
        console.log(err ? "Error" : "Success");
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
