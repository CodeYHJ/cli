import { currentPath } from "../../utils/index";
import { download_webpack } from "../clone/download";
export const create_webpack_react = async () => {
  console.log("create:", currentPath());
};
export const create_webpack_vue = async () => {
  console.log("create:", currentPath());
  await download_webpack("vue");
};
