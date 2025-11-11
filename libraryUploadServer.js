const express = require('express');
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 4545;

const LIBRARY_ROOT = path.join(__dirname, 'assets', 'library');
const UPLOADS_DIR = path.join(LIBRARY_ROOT, 'uploads');
const CATALOG_PATH = path.join(LIBRARY_ROOT, 'catalog.json');
const COMPLAINT_LOG = path.join(LIBRARY_ROOT, 'complaints.log');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            await fs.mkdir(UPLOADS_DIR, { recursive: true });
            cb(null, UPLOADS_DIR);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.txt';
        const safeName = `${createSlug(file.originalname.replace(ext, ''))}-${Date.now()}${ext}`;
        cb(null, safeName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const allowed = ['.txt', '.md', '.html', '.epub', '.pdf'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) {
            return cb(new Error(`Unsupported file type: ${ext}`));
        }
        cb(null, true);
    }
});

function createSlug(input) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 80) || randomUUID();
}

async function loadCatalog() {
    try {
        const raw = await fs.readFile(CATALOG_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return { updatedAt: new Date().toISOString(), books: [] };
        }
        throw err;
    }
}

async function saveCatalog(catalog) {
    catalog.updatedAt = new Date().toISOString();
    await fs.writeFile(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
}

function runCopyrightChecks(metadata) {
    const issues = [];
    if (!metadata.sourceUrl) {
        issues.push('Provide a verifiable source URL.');
    }
    if (!metadata.copyrightStatus) {
        issues.push('Select a copyright status (public_domain or creative_commons).');
    } else if (!['public_domain', 'creative_commons', 'licensed'].includes(metadata.copyrightStatus)) {
        issues.push('Unsupported copyright status.');
    }

    if (metadata.copyrightStatus === 'public_domain') {
        const year = Number(metadata.publicationYear);
        if (Number.isFinite(year) && year >= 1929) {
            issues.push('Publication year suggests the work may still be under copyright in the U.S.');
        }
    }

    if (metadata.copyrightStatus === 'creative_commons' && !metadata.license) {
        issues.push('Creative Commons uploads must include a specific license (e.g., CC BY-SA 4.0).');
    }

    if (metadata.copyrightStatus === 'licensed' && !metadata.rightsNotes) {
        issues.push('Licensed uploads must include written permission details in rightsNotes.');
    }

    return issues;
}

async function appendComplaintLog(entry) {
    const line = `[${new Date().toISOString()}] ${entry}\n`;
    await fs.appendFile(COMPLAINT_LOG, line, 'utf8');
}

function generateExcerpt(text) {
    if (!text) return '';
    const trimmed = text.trim().replace(/\s+/g, ' ');
    return trimmed.length > 400 ? `${trimmed.slice(0, 397)}…` : trimmed;
}

function buildBookRecord(data) {
    const id = createSlug(data.title || randomUUID());
    return {
        id,
        title: data.title || 'Untitled Manuscript',
        author: data.author || 'Unknown Author',
        sectLesson: data.sectLesson || 'Unassigned Lesson',
        lore: data.lore || 'Awaiting lore steward annotation.',
        formatNotes: data.formatNotes || 'Uploaded manuscript awaiting format review.',
        excerpt: data.excerpt,
        excerptSource: data.excerptSource,
        file: data.file,
        ttsLang: data.ttsLang || 'en-US',
        copyrightStatus: data.copyrightStatus,
        publicationYear: data.publicationYear || null,
        license: data.license || null,
        sourceUrl: data.sourceUrl || '',
        rightsNotes: data.rightsNotes || '',
        status: data.status || 'pending_review',
        origin: data.origin || 'upload',
        createdAt: new Date().toISOString(),
        suspension: null,
        complaints: []
    };
}

app.post('/library/upload', upload.single('manuscript'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Upload a manuscript file.' });
        }

        const metadata = {
            title: req.body.title,
            author: req.body.author,
            sectLesson: req.body.sectLesson,
            lore: req.body.lore,
            formatNotes: req.body.formatNotes,
            copyrightStatus: req.body.copyrightStatus,
            publicationYear: req.body.publicationYear,
            license: req.body.license,
            sourceUrl: req.body.sourceUrl,
            rightsNotes: req.body.rightsNotes,
            ttsLang: req.body.ttsLang
        };

        const warnings = runCopyrightChecks(metadata);
        if (warnings.length) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ error: 'Upload blocked by rights checks.', warnings });
        }

        const catalog = await loadCatalog();
        const relativeFilePath = path.relative(__dirname, req.file.path).replace(/\\/g, '/');
        let excerptText = req.body.excerpt;

        if (!excerptText) {
            try {
                const raw = await fs.readFile(req.file.path, 'utf8');
                excerptText = generateExcerpt(raw);
            } catch (err) {
                console.warn(`Unable to auto-generate excerpt for ${req.file.path}:`, err.message);
                excerptText = 'Excerpt pending steward review.';
            }
        }

        const record = buildBookRecord({
            ...metadata,
            excerpt: excerptText,
            excerptSource: relativeFilePath,
            file: relativeFilePath
        });

        catalog.books.push(record);
        await saveCatalog(catalog);

        return res.status(201).json({
            message: 'Upload received and queued for review.',
            book: record
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Upload failed.', details: err.message });
    }
});

app.post('/library/review/:id/activate', async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await loadCatalog();
        const book = catalog.books.find((entry) => entry.id === id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        book.status = 'active';
        if (req.body.sectLesson) book.sectLesson = req.body.sectLesson;
        if (req.body.lore) book.lore = req.body.lore;
        if (req.body.formatNotes) book.formatNotes = req.body.formatNotes;
        book.suspension = null;

        await saveCatalog(catalog);
        res.json({ message: 'Book activated for public view.', book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to activate book.', details: err.message });
    }
});

app.post('/library/complaint', async (req, res) => {
    try {
        const { bookId, complainant, reason } = req.body;
        if (!bookId || !reason) {
            return res.status(400).json({ error: 'Complaint requires bookId and reason.' });
        }

        const catalog = await loadCatalog();
        const book = catalog.books.find((entry) => entry.id === bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        if (book.status !== 'suspended') {
            book.suspension = {
                id: randomUUID(),
                reason,
                complainant: complainant || 'anonymous',
                raisedAt: new Date().toISOString()
            };
            book.status = 'suspended';
        }

        book.complaints.push({
            id: randomUUID(),
            reason,
            complainant: complainant || 'anonymous',
            createdAt: new Date().toISOString()
        });

        await saveCatalog(catalog);
        await appendComplaintLog(`Book ${book.id} suspended. Reason: ${reason}. Reporter: ${complainant || 'anonymous'}`);

        res.json({ message: 'Book suspended pending review.', book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to file complaint.', details: err.message });
    }
});

app.post('/library/complaint/:id/resolve', async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await loadCatalog();
        const book = catalog.books.find((entry) => entry.id === id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        book.status = req.body.nextStatus || 'pending_review';
        book.suspension = null;

        await saveCatalog(catalog);
        await appendComplaintLog(`Book ${book.id} reinstated with status ${book.status}.`);

        res.json({ message: 'Book status updated after complaint review.', book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to resolve complaint.', details: err.message });
    }
});

app.get('/library/catalog', async (req, res) => {
    try {
        const catalog = await loadCatalog();
        res.json(catalog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to read catalog.', details: err.message });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`📚 Library steward server ready on http://localhost:${PORT}`);
});
