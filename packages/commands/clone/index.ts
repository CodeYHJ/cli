import { spawn } from "child_process";

export const gitClone = (
  repo: string,
  targetPath: string,
  cb: (err?: Error, res?: any) => void
) => {
  const args = ["clone"];
  // args.push("--");
  args.push(repo);
  args.push(targetPath);
  var process = spawn("git", args);
  process.on("close", function (status: any) {
    if (status == 0) {
      cb && cb();
    } else {
      cb && cb(new Error("'git clone' failed with status " + status));
    }
  });
  process.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
};
