// Reads every `repo:` in _data/futurelab.yml and records each repo's version in
// _data/futurelab_versions.json. The latest GitHub release wins; otherwise the
// version in package.json, then pyproject.toml, on the default branch is used. Versions are
// shortened to major.minor (0.2.0 -> 0.2), which the FutureLAB card titles show.
import { readFile, writeFile } from "node:fs/promises";

const IDEAS_PATH = new URL("../_data/futurelab.yml", import.meta.url);
const VERSIONS_PATH = new URL("../_data/futurelab_versions.json", import.meta.url);

const headers = { "User-Agent": "djzts.github.io-futurelab", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const shortVersion = (raw = "") => {
  const match = String(raw).match(/(\d+)\.(\d+)/) || String(raw).match(/(\d+)/);
  return match ? (match[2] === undefined ? `${match[1]}.0` : `${match[1]}.${match[2]}`) : null;
};

const fetchJson = async (url) => {
  const response = await fetch(url, { headers });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
};

const fetchVersion = async (repo) => {
  let release = null;
  try {
    release = await fetchJson(`https://api.github.com/repos/${repo}/releases/latest`);
  } catch (error) {
    console.warn(`${repo}: release lookup failed (${error.message}), falling back to package.json`);
  }
  const fromRelease = shortVersion(release?.tag_name);
  if (fromRelease) return { version: fromRelease, source: "release" };

  const raw = async (file) => {
    const response = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/${file}`, { headers: { "User-Agent": headers["User-Agent"] } });
    return response.ok ? response.text() : null;
  };

  const packageJson = await raw("package.json");
  const fromPackage = packageJson && shortVersion(JSON.parse(packageJson).version);
  if (fromPackage) return { version: fromPackage, source: "package.json" };

  // Python projects: version = "x.y.z" in pyproject.toml.
  const pyproject = await raw("pyproject.toml");
  const fromPyproject = shortVersion(pyproject?.match(/^version\s*=\s*["']([^"']+)["']/m)?.[1]);
  if (fromPyproject) return { version: fromPyproject, source: "pyproject.toml" };

  return null;
};

const ideas = await readFile(IDEAS_PATH, "utf8");
const repos = [...ideas.matchAll(/^\s+repo:\s*["']?([\w.-]+\/[\w.-]+)["']?\s*$/gm)].map((m) => m[1]);

let previous = {};
try {
  previous = JSON.parse(await readFile(VERSIONS_PATH, "utf8"));
} catch {}

const next = {};
for (const repo of repos) {
  try {
    const found = await fetchVersion(repo);
    if (found) next[repo] = found;
    else if (previous[repo]) next[repo] = previous[repo];
    console.log(`${repo}: ${found ? `v${found.version} (${found.source})` : "no version found"}`);
  } catch (error) {
    // Keep the last known version when GitHub is unreachable.
    if (previous[repo]) next[repo] = previous[repo];
    console.warn(`${repo}: ${error.message}`);
  }
}

await writeFile(VERSIONS_PATH, `${JSON.stringify(next, null, 2)}\n`);
