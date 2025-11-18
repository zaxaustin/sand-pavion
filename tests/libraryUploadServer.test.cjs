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
  const startingPublicCount = Array.isArray(initial.notes) ? initial.notes.length : 0;

  const folderResponse = await fetch(`${base}/library/note-folders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ownerId: 'member-1', ownerName: 'Member One', name: 'Wisdom Garden' })
  });

  assert.equal(folderResponse.status, 201);
  const folderPayload = await getJson(folderResponse);

  const payload = {
    ownerId: 'member-1',
    ownerName: 'Member One',
    title: 'Shared wisdom',
    content: 'The light you seek is the light you keep.',
    visibility: 'private',
    folderId: folderPayload.folder.id
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
  assert.equal(privateCatalog.notes.length, startingPublicCount);

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
  assert.equal(publicCatalog.notes.length, startingPublicCount + 1);
  const newestNote = publicCatalog.notes.at(-1);
  assert.equal(newestNote.id, created.note.id);
  assert.equal(newestNote.ownerName, payload.ownerName);
});
