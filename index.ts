import { cli } from "cleye";

import packageJSON from "./package.json";

import { configCommand } from "./src/commands/config/index.js";
import { runCommand } from "./src/commands/run/index.js";
import { initCommand } from "./src/commands/init/index.js";

const extraArgs = process.argv.slice(2);

cli(
  {
    version: packageJSON.version,
    name: "devil",
    commands: [initCommand, runCommand, configCommand],
    flags: {},
    ignoreArgv: (type) => type === "unknown-flag" || type === "argument",
    help: { description: packageJSON.description },
  },
  async () => {
    // TODO
  },
  extraArgs
);
