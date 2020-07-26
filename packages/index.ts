#!/usr/bin/env node
import program from "commander";
import { createDB } from "./commands/col/db";
import { home } from "./commands/question";
import { currentPath } from "./utils";

program.version(require("../package").version, "-v, --versiom");

program
  .command("create <projectName>")
  .description("create a project")
  .action((projectName) => {
    const rootPath = currentPath();
    const db = createDB();
    db.add("projectName", projectName);
    db.add("rootPath", rootPath);
    home();
  });

program.parse(process.argv);
