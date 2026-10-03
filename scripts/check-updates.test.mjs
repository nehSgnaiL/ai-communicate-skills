import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { checkUpdates } from '../skills/communicate-clearly/scripts/check-updates.mjs';

function blob(name, content) {
  const bytes = Buffer.from(content);
  return {
    path: `skills/communicate-clearly/${name}`, type: 'blob', mode: '100644',
    sha: createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'),
  };
}

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'communicate-clearly-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) await writeFile(path.join(root, name), content);
  return root;
}

const response = tree => async () => ({ ok: true, json: async () => ({ tree }) });

test('matches UTF-8 content and ignores other upstream skills', async t => {
  const root = await fixture(t, { 'SKILL.md': 'Clear writing 中文\n' });
  const fetchImpl = response([blob('SKILL.md', 'Clear writing 中文\n'), { path: 'skills/other/SKILL.md' }]);
  assert.deepEqual(await checkUpdates({ root, fetchImpl }), { added: [], changed: [], removed: [] });
});

test('reports added, changed and removed files', async t => {
  const root = await fixture(t, { 'SKILL.md': 'local edit', 'old.md': 'old' });
  const fetchImpl = response([blob('SKILL.md', 'upstream'), blob('new.md', 'new')]);
  assert.deepEqual(await checkUpdates({ root, fetchImpl }), {
    added: ['new.md'], changed: ['SKILL.md'], removed: ['old.md'],
  });
});

test('fails instead of claiming current on network or incomplete responses', async () => {
  await assert.rejects(checkUpdates({ fetchImpl: async () => ({ ok: false, status: 403 }) }), /HTTP 403/);
  await assert.rejects(checkUpdates({ fetchImpl: async () => { throw new Error('offline'); } }), /offline/);
  await assert.rejects(checkUpdates({ fetchImpl: async () => ({ ok: true, json: async () => ({ tree: [], truncated: true }) }) }), /incomplete/);
  await assert.rejects(checkUpdates({ fetchImpl: response([]) }), /not found/);
});
