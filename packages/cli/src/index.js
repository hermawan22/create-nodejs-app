/* eslint-disable no-console, no-sync */
const path = require("path");
const spawn = require("cross-spawn");
const fs = require("fs-extra");
const yargs = require("yargs");

process.on("unhandledRejection", (err) => {
  throw err;
});

const argv = yargs
  .version()
  .usage("Usage: $0 <project-directory>")
  .alias("help", "h")
  .alias("version", "v")
  .help()
  .example(
    "$0 todo-app",
    'Create "todo-app" project relative to current directory'
  )
  .strict().argv;
const projectDirectory = argv._[0];

if (projectDirectory) {
  const root = path.resolve(projectDirectory);
  const name = path.basename(root);
  const cwd = process.cwd();

  console.log(`Creating ${name} in ${root}.`);
  console.log();

  fs.ensureDirSync(projectDirectory);
  fs.copy(path.resolve(__dirname, "../templates"), root, {
    overwrite: false,
  })

  process.chdir(root);

  let target;
  if (path.isAbsolute(projectDirectory)) {
    target = root;
  } else {
    target = path.relative(cwd, root);
  }
  if (target !== "") {
    console.log(`  cd ${target}`);
  }
  console.log();
} else {
  yargs.showHelp();
}