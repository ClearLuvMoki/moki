const fs = require("node:fs");
const path = require("node:path");
const yaml = require("yaml");

const configPath = path.join(process.cwd(), "_config.yml");
const outputPath = path.join(process.cwd(), "src/config/generated.ts");

const config = yaml.parse(fs.readFileSync(configPath, "utf8"));

const content = `// Auto-generated from _config.yml — do not edit manually
import type { BlogConfig } from "@/types/config";

export const blogConfig = ${JSON.stringify(config, null, 2)} as BlogConfig;
`;

fs.writeFileSync(outputPath, content);
console.log("Generated src/config/generated.ts from _config.yml");
