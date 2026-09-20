import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { values: { version } } = parseArgs({
  options: { version: { type: "string" } },
});

if (version !== undefined && !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
  throw new Error("Use --version with an exact version such as 1.1.1.");
}

const faces = [
  {
    family: "Hanken Grotesk",
    file: "hanken-grotesk-latin.woff2",
    style: "normal",
    weight: "100 900",
  },
  {
    family: "Hanken Grotesk",
    file: "hanken-grotesk-latin-italic.woff2",
    style: "italic",
    weight: "100 900",
  },
  {
    family: "Space Mono",
    file: "space-mono-regular.woff2",
    style: "normal",
    weight: "400",
  },
  {
    family: "Space Mono",
    file: "space-mono-bold.woff2",
    style: "normal",
    weight: "700",
  },
];

const fontCss = await Promise.all(
  faces.map(async ({ family, file, style, weight }) => {
    const data = await readFile(resolve(root, "assets/fonts", file), "base64");

    return `@font-face {
  font-family: "${family}";
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url("data:font/woff2;charset=utf-8;base64,${data}") format("woff2");
}`;
  }),
);

const source = await readFile(resolve(root, "src/theme.css"), "utf8");

// Lift the source header to the top of the build so the shipped file opens on
// the licence rather than on a hundred kilobytes of base64.
const header = source.match(/^\/\*[\s\S]*?\*\/\n\n/);

if (!header) {
  throw new Error("src/theme.css is missing its leading licence comment.");
}

const banner = `${header[0].trimEnd().replace(
  /\n \*\/$/,
  "\n *\n * Generated from src/theme.css. Edit that file, then run: npm run build\n */",
)}`;

if (version !== undefined) {
  const manifestPath = resolve(root, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const args = ["version", version, "--no-git-tag-version", "--ignore-scripts", "--allow-same-version"];

  // Let npm keep package.json and package-lock.json in sync without a commit or tag.
  if (process.env.npm_execpath) {
    execFileSync(process.execPath, [process.env.npm_execpath, ...args], { cwd: root, stdio: "inherit" });
  } else {
    execFileSync("npm", args, { cwd: root, stdio: "inherit" });
  }

  manifest.version = version;
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

await writeFile(
  resolve(root, "theme.css"),
  [banner, fontCss.join("\n\n"), source.slice(header[0].length)].join("\n\n"),
);
