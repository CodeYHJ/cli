import inquirer = require("inquirer");
import { vue } from "./vue";
import { react } from "./react";
// import { download_webpack } from "../clone/download";
export const home = () =>
  inquirer
    .prompt({
      type: "list",
      message: "请选择框架",
      name: "main",
      choices: [
        { name: "Vue", value: "vue" },
        { name: "React", value: "react" },
      ],
    })
    .then((res) => {
      const { main } = res;
      if (main === "vue") {
        // download_webpack()
        vue();
      }
      if (main === "react") {
        console.log("react");
        react();
      }
    });
