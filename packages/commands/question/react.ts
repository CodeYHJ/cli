import inquirer  from "inquirer";
import { create_webpack_react, cover } from "../action/index";
import { scan } from "../file/scan";
import { localDB } from "../col/db";

export const react = () =>
  inquirer
    .prompt({
      type: "list",
      message: "请选择action",
      name: "action",
      choices: [
        { name: "新建项目 - vite", value: "create_vite" },
        { name: "新建项目 - webpack", value: "create_webpack" },
        { name: "覆盖旧项目 - vite", value: "cover_vite" },
        { name: "覆盖旧项目 - webpack", value: "cover_webpack" },
      ],
    })
    .then((res) => {
      const { action } = res;
      localDB.add("libType", 2);

      if (action === "create_vite") {
        localDB.add("platFormtype", 2);
        scan();
      }
      if (action === "create_webpack") {
        localDB.add("platFormtype", 1);
        create_webpack_react()
      }
      if (action === "cover_vite") {
        cover();
      }
      if (action === "cover_webpack") {
        cover();
      }
    });
