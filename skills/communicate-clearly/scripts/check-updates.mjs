#!/usr/bin/env node
// Compare this installed skill with its upstream Git tree without changing files.
import { createHash } from 'node:crypto';
import { readdir, readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = 'nehSgnaiL/ai-communicate-skills';
const prefix = 'skills/communicate-clearly/';
const skillRoot = fileURLToPath(new URL('../', import.meta.url));

async function localFiles(root, directory = root) {
  const files = new Map();
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const [name, hash] of await localFiles(root, filename)) files.set(name, hash);
    } else if (entry.isFile()) {
      const content = await readFile(filename);
      const hash = createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
      files.set(path.relative(root, filename).split(path.sep).join('/'), hash);
    } else {
      throw new Error(`Unsupported file type: ${filename}`);
    }
  }
  return files;
}

export async function checkUpdates({ root = skillRoot, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(
    `https://api.github.com/repos/${repository}/git/trees/main?recursive=1`,
    {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'communicate-clearly-update-check' },
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}; try again later or check repository access.`);
  const data = await response.json();
  if (data.truncated || !Array.isArray(data.tree)) throw new Error('GitHub returned an incomplete file tree.');
  const upstream = new Map();
  for (const entry of data.tree) {
    if (!entry.path.startsWith(prefix) || entry.type === 'tree') continue;
    if (entry.type !== 'blob' || !['100644', '100755'].includes(entry.mode) || !/^[a-f0-9]{40}$/.test(entry.sha)) {
      throw new Error(`Unsupported upstream entry: ${entry.path}`);
    }
    upstream.set(entry.path.slice(prefix.length), entry.sha);
  }
  if (!upstream.has('SKILL.md')) throw new Error('The upstream skill folder was not found.');
  const local = await localFiles(root);
  return {
    added: [...upstream.keys()].filter(name => !local.has(name)).sort(),
    changed: [...upstream.keys()].filter(name => local.has(name) && local.get(name) !== upstream.get(name)).sort(),
    removed: [...local.keys()].filter(name => !upstream.has(name)).sort(),
  };
}

if (process.argv[1] && await realpath(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 2) {
    console.log('Usage: node <skill-folder>/scripts/check-updates.mjs\nRead-only comparison with GitHub main. Exit codes: 0 matches, 1 differs, 2 check failed.');
    process.exitCode = process.argv.length === 3 && process.argv[2] === '--help' ? 0 : 2;
  } else {
    try {
      const result = await checkUpdates();
      const differs = Object.values(result).some(files => files.length);
      console.log(differs ? 'Skill files differ from GitHub main (upstream changes or local edits).' : 'Skill files match GitHub main.');
      for (const [label, files] of Object.entries(result)) {
        for (const filename of files) console.log(`${label}: ${filename}`);
      }
      if (differs) console.log('To update a CLI-installed copy: npx skills@latest update communicate-clearly --project (or --global).');
      process.exitCode = differs ? 1 : 0;
    } catch (error) {
      console.error(`Update check failed: ${error.message}`);
      process.exitCode = 2;
    }
  }
}
