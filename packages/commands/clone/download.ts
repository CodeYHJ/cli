// const download = require("download-git-repo");
import { gitClone } from "./index";
export const download_webpack = () => {
  return new Promise((resolve, reject) => {
    // download("direct:https://github.com/CodeYHJ/template.git#master",`packages/template`,{clone:true},(err:Error,res:any)=>{
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(res);
    //   }
    // })
    gitClone(
      "direct:https://github.com/CodeYHJ/template.git#master",
      `packages/template`,
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
      "direct:https://github.com/CodeYHJ/template.git#master",
      `packages/template/vite/${target}`,
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
