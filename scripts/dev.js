const { spawn, execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const configPath = path.join(process.cwd(), "_config.yml");

function generateConfig() {
  execSync("node scripts/generate-config.js", { stdio: "inherit" });
}

generateConfig();

fs.watch(configPath, () => {
  console.log("_config.yml changed, regenerating config...");
  generateConfig();
});

const next = spawn("npx", ["next", "dev", "--turbopack", "-p", "3020"], {
  stdio: "inherit",
  shell: true,
});

next.on("close", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  next.kill("SIGINT");
});

process.on("SIGTERM", () => {
  next.kill("SIGTERM");
});
