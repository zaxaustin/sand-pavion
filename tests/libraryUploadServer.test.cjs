const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const { once } = require('node:events');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'library-notes-'));
process.env.LIBRARY_ROOT = tempDir;
process.env.LIBRARY_NOTES_PATH = path.join(tempDir, 'notes.json');

let dependencyMissing = false;
let app;

try {
  ({ app } = require('../libraryUploadServer.js'));
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND' && /'express'/.test(error.message)) {
    dependencyMissing = true;
  } else {
    throw error;
  }
}

test('public notes lifecycle is isolated per owner', async (t) => {
  if (dependencyMissing) {
    await fsp.rm(tempDir, { recursive: true, force: true });
    t.skip('Express dependency not installed; skipping integration tests.');
    return;
  }

  const server = app.listen(0);
  await once(server, 'listening');
  t.after(() => server.close());
  t.after(async () => {
    await fsp.rm(tempDir, { recursive: true, force: true });
  });

  const base = `http://127.0.0.1:${server.address().port}`;

  const getJson = async (response) => {
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    return response.json();
  };

  const initial = await getJson(await fetch(`${base}/library/notes/public`));
  assert.equal(initial.notes.length, 0);

  const payload = {
    ownerId: 'member-1',
    ownerName: 'Member One',
    title: 'Shared wisdom',
    content: 'The light you seek is the light you keep.',
    visibility: 'private',
    folderId: 'wisdom-garden'
  };

  const createdResponse = await fetch(`${base}/library/notes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });

  assert.equal(createdResponse.status, 201);
  const created = await getJson(createdResponse);
  assert.equal(created.note.ownerId, payload.ownerId);
  assert.equal(created.note.visibility, 'private');

  const privateCatalog = await getJson(await fetch(`${base}/library/notes/public`));
  assert.equal(privateCatalog.notes.length, 0);

  const toggleResponse = await fetch(`${base}/library/notes/${created.note.id}/visibility`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ownerId: payload.ownerId, visibility: 'public' })
  });

  assert.equal(toggleResponse.status, 200);
  const toggled = await getJson(toggleResponse);
  assert.equal(toggled.note.visibility, 'public');
  assert.ok(toggled.note.publishedAt);

  const publicCatalog = await getJson(await fetch(`${base}/library/notes/public`));
  assert.equal(publicCatalog.notes.length, 1);
  assert.equal(publicCatalog.notes[0].id, created.note.id);
  assert.equal(publicCatalog.notes[0].ownerName, payload.ownerName);
});
