#!/usr/bin/env node
const program = require("commander");

program.version(require("../package").version, "-v, --versiom");

// const minimist = require("minimist"); //解析命令

const chalk = require("chalk"); //提示

const { cleanArgs } = require("../packages/commands/utils");

const cuttentPath = process.cwd();

program
  .command("init <fileName>")
  .alias("i")
  .option("-c, --cach", "cach the file")
  .description("create a file")
  .action((fileName, argCmd) => {
    const options = cleanArgs(argCmd);
    options.cuttentPath = cuttentPath;
    require("../packages/commands/vuepress")(fileName, options);
  });

program.arguments("<command>").action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

program.parse(process.argv);
