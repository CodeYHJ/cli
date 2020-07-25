#!/usr/bin/env node
import program = require("commander");
import { createDB, localDB } from "./commands/col/db";
import { home } from "./commands/question";
program.version(require("../package").version, "-v, --versiom");

program
  .command("create <projectName>")
  .description("create a project")
  .action((projectName) => {
    createDB();
    localDB?.add("name", projectName);
    home();
  });

program.parse(process.argv);
