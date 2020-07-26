import inquirer = require("inquirer");
import { create_webpack_vue, cover } from "../action/index";
import { localDB } from "../col/db";

export const vue = () =>
  inquirer
    .prompt({
      type: "list",
      message: "请选择action",
      name: "action",
      choices: [
        { name: "新建项目", value: "create" },
        { name: "覆盖旧项目", value: "cover" },
      ],
    })
    .then((res) => {
      const { action } = res;
      if (action === "create") {
        create_webpack_vue();
        console.log(localDB);
      }
      if (action === "cover") {
        cover();
      }
    });
