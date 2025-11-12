import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  User,
  Home,
  Menu,
  X,
  Play,
  BookMarked,
  TrendingUp,
  Sparkles,
  Folder,
  FileText,
  Plus,
  PenSquare,
  Globe2,
  Lock,
  LogIn,
  LogOut,
  Filter,
  Search,
  Loader2,
  Users,
  Share2
} from 'lucide-react';

export default function SpiritualLibrary() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const rooms = [
    { id: 'hinduism', name: 'Hinduism', color: 'bg-orange-500', books: ['Bhagavad Gita', 'Upanishads', 'Vedas'] },
    { id: 'buddhism', name: 'Buddhism', color: 'bg-yellow-500', books: ['Dhammapada', 'Heart Sutra', 'Tibetan Book of the Dead'] },
    { id: 'comparative', name: 'Comparative Studies', color: 'bg-purple-500', books: ['Perennial Philosophy', 'World Religions', 'Mysticism East and West'] },
    { id: 'meditation', name: 'Meditation & Practice', color: 'bg-blue-500', books: ['Mindfulness Guide', 'Pranayama Techniques', 'Zen Practice'] }
  ];

  const tracks = [
    { level: 'Beginner', description: 'Introduction to Eastern Philosophy', lessons: 8 },
    { level: 'Intermediate', description: 'Deep Dive into Sacred Texts', lessons: 12 },
    { level: 'Advanced', description: 'Comparative Analysis & Practice', lessons: 15 }
  ];

  const aiPlugins = [
    {
      id: 'summary-scribe',
      title: 'Scribe of Echoes',
      purpose: 'Summarizes key passages and composes luminous recaps to close each study vigil.',
      rituals: [
        'Highlight a paragraph and request a three-sentence retelling anchored to guild lore.',
        'Schedule end-of-session reflections that gather questions for the next circle.',
        'Export offline-friendly summaries that can be stored with the steward archives.'
      ]
    },
    {
      id: 'koan-weaver',
      title: 'Koan Weaver',
      purpose: "Transforms readings into gentle, layered prompts that mimic a mentor's inquiry.",
      rituals: [
        'Offer one warm-up question, one paradox, and one action challenge per excerpt.',
        'Track which prompts a visitor resolves to adapt the next session’s depth.',
        'Blend multiple traditions to show the resonance between guild rooms.'
      ]
    },
    {
      id: 'guardian-of-voices',
      title: 'Guardian of Voices',
      purpose: 'Validates pronunciations and phonetic hints before a TTS session begins.',
      rituals: [
        'Surface transliteration notes for Sanskrit, Pāli, and Classical Chinese terms.',
        'Preview the speech synthesis voice and allow a visitor to tweak pacing offline.',
        'Flag verses that might require a human elder for sensitive interpretation.'
      ]
    }
  ];

  type NoteVisibility = 'private' | 'public';

  type Note = {
    id: string;
    folderId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    ownerId: string;
    ownerName: string;
    visibility: NoteVisibility;
    publishedAt?: string | null;
  };

  type FolderItem = {
    id: string;
    name: string;
  };

  type NotesState = {
    folders: FolderItem[];
    notes: Note[];
  };

  type CatalogBook = {
    id: string;
    title: string;
    author: string;
    sectLesson?: string;
    lore?: string;
    formatNotes?: string;
    excerpt?: string;
    file?: string;
    status?: string;
    ttsLang?: string;
    origin?: string;
  };

  const ensureNoteDefaults = (raw: any): Note => {
    const visibility: NoteVisibility = raw?.visibility === 'public' ? 'public' : 'private';
    const createdAt = raw?.createdAt || new Date().toISOString();

    return {
      id: raw?.id || `note-${randomId()}`,
      folderId: raw?.folderId || 'general-notes',
      title: raw?.title || 'Untitled note',
      content: raw?.content || '',
      createdAt,
      updatedAt: raw?.updatedAt,
      ownerId: raw?.ownerId || 'guild-guest',
      ownerName: raw?.ownerName || 'Guest Scribe',
      visibility,
      publishedAt: visibility === 'public' ? raw?.publishedAt || raw?.updatedAt || createdAt : null
    };
  };

  const normalizeNotesState = (state: NotesState): NotesState => ({
    folders: state.folders.map((folder) => ({ id: folder.id, name: folder.name })),
    notes: state.notes.map((note) => ensureNoteDefaults(note))
  });

  function randomId() {
    return Math.random().toString(36).slice(2, 10);
  }

  const notesStorageKey = 'spiritual-library-notes';

  const initialNotesState: NotesState = useMemo(
    () => ({
      folders: [
        {
          id: 'illumined-strategy',
          name: 'Illumined Strategy'
        }
      ],
      notes: [
        ensureNoteDefaults({
          id: 'business-quest-dashboard-inspiration',
          folderId: 'illumined-strategy',
          title: 'Business Quest Dashboard Inspiration',
          content: [
            'Highlights gathered from the Business Quest Dashboard study:',
            '• Quest categories: Business Fundamentals, Finance & Accounting, Marketing & Sales, Operations, Leadership & People, Legal & Compliance.',
            '• Featured books: The Lean Startup, Zero to One, The E-Myth Revisited, Profit First, and Building a StoryBrand.',
            '• Guild channels to revisit: Y Combinator, The Futur, Valuetainment, Minority Mindset, Accounting Stuff, and The Swedish Investor.'
          ].join('\n'),
          createdAt: '2024-01-01T00:00:00.000Z',
          ownerId: 'guild-stewards',
          ownerName: 'Guild Stewards',
          visibility: 'public',
          publishedAt: '2024-01-01T00:00:00.000Z'
        })
      ]
    }),
    []
  );

  const [notesState, setNotesState] = useState<NotesState>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(notesStorageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as NotesState;
          if (parsed?.folders && parsed?.notes) {
            return normalizeNotesState(parsed);
          }
        } catch (error) {
          console.warn('Unable to parse stored notes state', error);
        }
      }
    }
    return normalizeNotesState(initialNotesState);
  });

  const [activeFolderId, setActiveFolderId] = useState<string>(() => notesState.folders[0]?.id ?? '');
  const [activeNoteId, setActiveNoteId] = useState<string>(() => {
    const firstFolderId = notesState.folders[0]?.id;
    return notesState.notes.find((note) => note.folderId === firstFolderId)?.id ?? '';
  });
  const [newFolderName, setNewFolderName] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [sharedNotesLoading, setSharedNotesLoading] = useState(false);
  const [sharedNotesError, setSharedNotesError] = useState<string | null>(null);
  const [activeSharedNoteId, setActiveSharedNoteId] = useState('');
  const [sharedFilter, setSharedFilter] = useState('all');
  const [isEditingActiveNote, setIsEditingActiveNote] = useState(false);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [noteActionMessage, setNoteActionMessage] = useState<string | null>(null);
  const [noteActionKind, setNoteActionKind] = useState<'info' | 'success' | 'error'>('info');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isSyncingVisibility, setIsSyncingVisibility] = useState(false);
  const [catalogBooks, setCatalogBooks] = useState<CatalogBook[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [catalogFilter, setCatalogFilter] = useState('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(notesStorageKey, JSON.stringify(notesState));
    }
  }, [notesState]);

  useEffect(() => {
    if (!notesState.folders.some((folder) => folder.id === activeFolderId)) {
      const fallbackId = notesState.folders[0]?.id ?? '';
      setActiveFolderId(fallbackId);
    }
  }, [notesState, activeFolderId]);

  useEffect(() => {
    if (!activeFolderId) {
      setActiveNoteId('');
      return;
    }

    const availableNotes = notesState.notes.filter((note) => note.folderId === activeFolderId);
    if (!availableNotes.some((note) => note.id === activeNoteId)) {
      setActiveNoteId(availableNotes[0]?.id ?? '');
    }
  }, [notesState, activeFolderId, activeNoteId]);

  const deriveNameFromEmail = useCallback((email: string) => {
    const localPart = email.split('@')[0] ?? email;
    const cleaned = localPart.replace(/[^a-z0-9]+/gi, ' ').trim();
    if (!cleaned) {
      return 'Member';
    }
    return cleaned
      .split(' ')
      .filter(Boolean)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(' ');
  }, []);

  const refreshCatalog = useCallback(async () => {
    if (typeof window === 'undefined') return;
    setCatalogLoading(true);
    setCatalogError(null);
    try {
      const response = await fetch('/library/catalog');
      if (!response.ok) {
        throw new Error('Unable to load catalog.');
      }
      const payload = await response.json();
      const books = Array.isArray(payload.books) ? (payload.books as CatalogBook[]) : [];
      if (!isMountedRef.current) return;
      setCatalogBooks(books);
    } catch (error) {
      if (!isMountedRef.current) return;
      setCatalogError(error instanceof Error ? error.message : 'Unable to load catalog.');
      setCatalogBooks([]);
    } finally {
      if (isMountedRef.current) {
        setCatalogLoading(false);
      }
    }
  }, []);

  const refreshSharedNotes = useCallback(async () => {
    if (typeof window === 'undefined') return;
    setSharedNotesLoading(true);
    setSharedNotesError(null);
    try {
      const response = await fetch('/library/notes/public');
      if (!response.ok) {
        throw new Error('Unable to load shared notes.');
      }
      const payload = await response.json();
      const notesList = Array.isArray(payload.notes)
        ? (payload.notes as Note[]).map((entry) => ensureNoteDefaults({ ...entry, visibility: 'public' }))
        : [];
      if (!isMountedRef.current) return;
      setSharedNotes(notesList);
      setActiveSharedNoteId((prev) => {
        if (prev && notesList.some((note) => note.id === prev)) {
          return prev;
        }
        return notesList[0]?.id ?? '';
      });
    } catch (error) {
      if (!isMountedRef.current) return;
      setSharedNotesError(error instanceof Error ? error.message : 'Unable to load shared notes.');
      setSharedNotes([]);
      setActiveSharedNoteId('');
    } finally {
      if (isMountedRef.current) {
        setSharedNotesLoading(false);
      }
    }
  }, []);

  const syncNoteToServer = useCallback(
    async (note: Note) => {
      if (typeof window === 'undefined') return note;
      const response = await fetch('/library/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: note.id,
          ownerId: note.ownerId,
          ownerName: note.ownerName,
          title: note.title,
          content: note.content,
          visibility: note.visibility,
          folderId: note.folderId,
          createdAt: note.createdAt
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = payload?.error || 'Unable to save note to the commons.';
        throw new Error(message);
      }

      const payload = await response.json();
      return ensureNoteDefaults(payload.note ?? note);
    },
    []
  );

  const updateVisibilityOnServer = useCallback(
    async (noteId: string, ownerId: string, visibility: NoteVisibility) => {
      if (typeof window === 'undefined') {
        return ensureNoteDefaults({ id: noteId, ownerId, ownerName: currentUser?.name ?? 'Member', visibility });
      }

      const response = await fetch(`/library/notes/${noteId}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, visibility })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const message = payload?.error || 'Unable to update note visibility.';
        throw new Error(message);
      }

      const payload = await response.json();
      return ensureNoteDefaults(payload.note);
    },
    [currentUser?.name]
  );

  const updateLocalNote = useCallback(
    (noteId: string, next: Note | ((note: Note) => Note)) => {
      setNotesState((prev) => ({
        ...prev,
        notes: prev.notes.map((note) => {
          if (note.id !== noteId) {
            return note;
          }
          const resolved = typeof next === 'function' ? (next as (note: Note) => Note)(note) : next;
          return ensureNoteDefaults(resolved);
        })
      }));
    },
    []
  );

  const handleSignIn = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedEmail = authEmail.trim().toLowerCase();
      if (!trimmedEmail) {
        setAuthError('Enter an email address to continue.');
        return;
      }

      const memberName = deriveNameFromEmail(trimmedEmail);
      const member = { id: trimmedEmail, name: memberName, email: trimmedEmail };
      setCurrentUser(member);
      setIsLoggedIn(true);
      setAuthPassword('');
      setAuthError(null);
      setNoteActionMessage(`Welcome back, ${memberName}.`);
      setNoteActionKind('success');
    },
    [authEmail, deriveNameFromEmail]
  );

  const handleSignOut = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthPassword('');
    setAuthError(null);
    setNoteActionMessage('Signed out of your steward account.');
    setNoteActionKind('info');
  }, []);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  useEffect(() => {
    refreshSharedNotes();
  }, [refreshSharedNotes]);

  const handleAddFolder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) {
      setNoteActionMessage('Sign in to create personal folders.');
      setNoteActionKind('error');
      return;
    }

    const trimmed = newFolderName.trim();
    if (!trimmed) return;

    const newFolder: FolderItem = {
      id: `folder-${Date.now()}`,
      name: trimmed
    };

    setNotesState((prev) => ({
      ...prev,
      folders: [...prev.folders, newFolder]
    }));
    setActiveFolderId(newFolder.id);
    setNewFolderName('');
    setNoteActionMessage('Folder added to your archive.');
    setNoteActionKind('success');
  };

  const handleAddNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeFolderId) return;
    if (!currentUser) {
      setNoteActionMessage('Sign in to capture personal notes.');
      setNoteActionKind('error');
      return;
    }

    const title = newNoteTitle.trim();
    const content = newNoteContent.trim();
    if (!title || !content) {
      setNoteActionMessage('Provide a title and reflection before saving.');
      setNoteActionKind('error');
      return;
    }

    const newNote = ensureNoteDefaults({
      id: `note-${Date.now()}`,
      folderId: activeFolderId,
      title,
      content,
      createdAt: new Date().toISOString(),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      visibility: 'private'
    });

    setNotesState((prev) => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));
    setActiveNoteId(newNote.id);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNoteActionMessage('Note saved to your private archive.');
    setNoteActionKind('success');
  };

  const activeFolder = useMemo(
    () => notesState.folders.find((folder) => folder.id === activeFolderId),
    [notesState.folders, activeFolderId]
  );

  const folderNotes = useMemo(() => {
    return notesState.notes
      .filter((note) => note.folderId === activeFolderId)
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notesState.notes, activeFolderId]);

  const activeNote = useMemo(
    () => notesState.notes.find((note) => note.id === activeNoteId) ?? null,
    [notesState.notes, activeNoteId]
  );

  const canManageNotes = Boolean(currentUser);
  const canEditActiveNote = Boolean(activeNote && currentUser && activeNote.ownerId === currentUser.id);

  const sharedOwnerOptions = useMemo(() => {
    const entries = new Map<string, string>();
    sharedNotes.forEach((note) => {
      entries.set(note.ownerId, note.ownerName);
    });
    return Array.from(entries.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [sharedNotes]);

  const filteredSharedNotes = useMemo(() => {
    const base = sharedNotes.filter((note) => (sharedFilter === 'all' ? true : note.ownerId === sharedFilter));
    return base
      .slice()
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b.updatedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.updatedAt || a.createdAt).getTime()
      );
  }, [sharedNotes, sharedFilter]);

  const activeSharedNote = useMemo(
    () => filteredSharedNotes.find((note) => note.id === activeSharedNoteId) ?? null,
    [filteredSharedNotes, activeSharedNoteId]
  );

  const catalogLessons = useMemo(() => {
    const lessons = new Set<string>();
    catalogBooks
      .filter((book) => (book.status ? book.status === 'active' : true))
      .forEach((book) => {
        lessons.add(book.sectLesson || 'Unassigned Lesson');
      });
    return Array.from(lessons).sort((a, b) => a.localeCompare(b));
  }, [catalogBooks]);

  const filteredCatalogBooks = useMemo(() => {
    const query = catalogSearch.trim().toLowerCase();
    return catalogBooks
      .filter((book) => (book.status ? book.status === 'active' : true))
      .filter((book) => (catalogFilter === 'all' ? true : (book.sectLesson || 'Unassigned Lesson') === catalogFilter))
      .filter((book) => {
        if (!query) return true;
        const haystack = [book.title, book.author, book.sectLesson, book.lore, book.origin]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      });
  }, [catalogBooks, catalogFilter, catalogSearch]);

  const noteAlertClass = useMemo(() => {
    if (noteActionKind === 'error') {
      return 'border-red-200 bg-red-50 text-red-700';
    }
    if (noteActionKind === 'success') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }, [noteActionKind]);

  useEffect(() => {
    if (!activeNote) {
      setEditNoteTitle('');
      setEditNoteContent('');
      setIsEditingActiveNote(false);
      return;
    }

    setEditNoteTitle(activeNote.title);
    setEditNoteContent(activeNote.content);
    setIsEditingActiveNote(false);
  }, [activeNote?.id]);

  useEffect(() => {
    if (filteredSharedNotes.length === 0) {
      if (activeSharedNoteId) {
        setActiveSharedNoteId('');
      }
      return;
    }

    if (!filteredSharedNotes.some((note) => note.id === activeSharedNoteId)) {
      setActiveSharedNoteId(filteredSharedNotes[0].id);
    }
  }, [filteredSharedNotes, activeSharedNoteId]);

  const handleSaveActiveNoteEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeNote || !canEditActiveNote) {
      return;
    }

    const title = editNoteTitle.trim();
    const content = editNoteContent.trim();
    if (!title || !content) {
      setNoteActionMessage('Both title and content are required to update a note.');
      setNoteActionKind('error');
      return;
    }

    const nextNote = ensureNoteDefaults({
      ...activeNote,
      title,
      content,
      updatedAt: new Date().toISOString()
    });

    setIsSavingNote(true);
    setNoteActionMessage(null);

    try {
      updateLocalNote(activeNote.id, nextNote);
      if (activeNote.visibility === 'public') {
        const synced = await syncNoteToServer({ ...nextNote, visibility: 'public' });
        updateLocalNote(activeNote.id, synced);
        await refreshSharedNotes();
      }
      setNoteActionMessage('Note updated.');
      setNoteActionKind('success');
      setIsEditingActiveNote(false);
    } catch (error) {
      setNoteActionMessage(error instanceof Error ? error.message : 'Unable to save note.');
      setNoteActionKind('error');
    } finally {
      if (isMountedRef.current) {
        setIsSavingNote(false);
      }
    }
  };

  const handleToggleActiveNoteVisibility = async () => {
    if (!activeNote || !canEditActiveNote) {
      return;
    }

    const nextVisibility: NoteVisibility = activeNote.visibility === 'public' ? 'private' : 'public';
    setIsSyncingVisibility(true);
    setNoteActionMessage(null);

    try {
      let updatedNote: Note;
      if (nextVisibility === 'public') {
        updatedNote = await syncNoteToServer({ ...activeNote, visibility: 'public' });
      } else {
        updatedNote = await updateVisibilityOnServer(activeNote.id, activeNote.ownerId, nextVisibility);
      }

      updateLocalNote(activeNote.id, updatedNote);
      setNoteActionMessage(
        nextVisibility === 'public'
          ? 'Note shared with the commons catalog.'
          : 'Note returned to your private archive.'
      );
      setNoteActionKind('success');
      await refreshSharedNotes();
    } catch (error) {
      setNoteActionMessage(error instanceof Error ? error.message : 'Unable to update visibility.');
      setNoteActionKind('error');
    } finally {
      if (isMountedRef.current) {
        setIsSyncingVisibility(false);
      }
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-900 mb-4">Sacred Library</h1>
          <p className="text-xl text-amber-700">Journey Through Ancient Wisdom</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div 
            onClick={() => setCurrentPage('library')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
          >
            <BookOpen className="w-16 h-16 text-amber-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Enter the Library</h2>
            <p className="text-amber-700 text-center">Explore sacred texts and ancient wisdom</p>
          </div>

          <div 
            onClick={() => setCurrentPage('tracks')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
          >
            <TrendingUp className="w-16 h-16 text-amber-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Learning Tracks</h2>
            <p className="text-amber-700 text-center">Structured paths to deepen your understanding</p>
          </div>
        </div>

        {!isLoggedIn ? (
          <form onSubmit={handleSignIn} className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-amber-900 text-center">Join Our Community</h3>
            <p className="text-sm text-amber-700 text-center">
              Use your email to create a steward identity and unlock personal note keeping.
            </p>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-amber-800" htmlFor="home-email">
                Email address
              </label>
              <input
                id="home-email"
                type="email"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <label className="block text-sm font-semibold text-amber-800" htmlFor="home-password">
                Password (placeholder)
              </label>
              <input
                id="home-password"
                type="password"
                value={authPassword}
                onChange={(event) => setAuthPassword(event.target.value)}
                placeholder="Set a guild passphrase"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {authError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              <LogIn className="w-5 h-5" /> Enter the Guild
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-amber-900 text-center">Welcome, {currentUser?.name}</h3>
            <p className="text-sm text-amber-700 text-center">
              Your reflections are linked to <span className="font-semibold">{currentUser?.email}</span>. Shared notes will appear in the commons once you publish them.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full inline-flex items-center justify-center gap-2 border border-amber-300 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LibraryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-amber-200">The Sacred Library</h2>
        
        {!selectedRoom ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`${room.color} rounded-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl`}
              >
                <BookOpen className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center text-white">{room.name}</h3>
                <p className="text-center text-white/80 mt-2">{room.books.length} texts available</p>
              </div>
            ))}
          </div>
        ) : !selectedBook ? (
          <div>
            <button 
              onClick={() => setSelectedRoom(null)}
              className="mb-6 px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              ← Back to Rooms
            </button>
            <h3 className="text-3xl font-bold mb-6 text-amber-200">{selectedRoom.name}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedRoom.books.map((book, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBook(book)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all border border-amber-400/30"
                >
                  <BookMarked className="w-8 h-8 mb-2 text-amber-300" />
                  <h4 className="text-xl font-semibold text-amber-100">{book}</h4>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <button 
              onClick={() => setSelectedBook(null)}
              className="mb-6 px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              ← Back to Books
            </button>
            <h3 className="text-3xl font-bold mb-4 text-amber-200">{selectedBook}</h3>
            <div className="bg-white/5 rounded-lg p-6 mb-4">
              <p className="text-amber-100 leading-relaxed mb-4">
                This is where the book content would be displayed. In a full implementation, 
                this would include the actual text of the sacred work, formatted for easy reading.
              </p>
              <p className="text-amber-100/80 italic">
                Features to be implemented: Text-to-speech, bookmarking, annotations, and AI discussion guide.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors">
              <Play className="w-5 h-5" />
              Listen (Text-to-Speech)
            </button>
          </div>
        )}

        <section className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-amber-400/30 p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-3xl font-bold text-amber-200">Public Reader Catalog</h3>
              <p className="text-amber-100/80">
                Actively reviewed texts that stewards have made available for every visitor. Filter by lesson focus or search for
                a specific title.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <label className="flex items-center gap-2 bg-white/10 border border-amber-300/40 rounded-lg px-3 py-2 text-sm text-amber-100">
                <Filter className="w-4 h-4" />
                <span className="sr-only">Filter by lesson</span>
                <select
                  value={catalogFilter}
                  onChange={(event) => setCatalogFilter(event.target.value)}
                  className="bg-transparent border-none focus:outline-none text-amber-100 pr-6"
                >
                  <option value="all" className="text-amber-900">
                    All lessons
                  </option>
                  {catalogLessons.map((lesson) => (
                    <option key={lesson} value={lesson} className="text-amber-900">
                      {lesson}
                    </option>
                  ))}
                </select>
              </label>
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-200" />
                <input
                  value={catalogSearch}
                  onChange={(event) => setCatalogSearch(event.target.value)}
                  placeholder="Search title or lore"
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/10 border border-amber-300/40 text-amber-100 placeholder:text-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {catalogLoading ? (
              <div className="flex items-center justify-center gap-2 text-amber-100">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading catalog…
              </div>
            ) : catalogError ? (
              <p className="rounded-lg border border-red-300/60 bg-red-50/20 px-4 py-3 text-sm text-red-100">{catalogError}</p>
            ) : filteredCatalogBooks.length === 0 ? (
              <p className="rounded-lg border border-amber-300/40 bg-white/5 px-4 py-6 text-center text-sm text-amber-100/80">
                No texts match the current filters. Adjust the lesson focus or search terms to explore other public works.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCatalogBooks.map((book) => (
                  <article key={book.id} className="bg-black/30 border border-amber-200/20 rounded-2xl p-6 flex flex-col gap-4">
                    <header className="space-y-1">
                      <p className="text-xs uppercase tracking-wide text-amber-200/80">{book.sectLesson || 'Unassigned Lesson'}</p>
                      <h4 className="text-2xl font-semibold text-amber-50">{book.title}</h4>
                      <p className="text-sm text-amber-100/70">{book.author}</p>
                    </header>
                    {book.lore && (
                      <p className="text-sm text-amber-100/80">{book.lore}</p>
                    )}
                    {book.excerpt && (
                      <blockquote className="text-sm text-amber-50/90 bg-white/5 border-l-2 border-amber-300/60 rounded-lg px-4 py-3">
                        {book.excerpt}
                      </blockquote>
                    )}
                    <dl className="grid gap-2 text-sm text-amber-100/70">
                      <div>
                        <dt className="uppercase text-xs tracking-wide text-amber-300/80">Format notes</dt>
                        <dd>{book.formatNotes || 'Awaiting steward review.'}</dd>
                      </div>
                    </dl>
                    <div className="flex flex-wrap gap-3">
                      {book.file && (
                        <a
                          href={book.file}
                          download
                          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 text-white px-3 py-2 text-sm font-medium hover:bg-amber-700 transition-colors"
                        >
                          ⬇ Download
                        </a>
                      )}
                      {book.sourceUrl && (
                        <a
                          href={book.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-amber-300/60 text-amber-100 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                        >
                          📖 Source
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-amber-400/30 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-amber-200" />
            <div>
              <h3 className="text-3xl font-bold text-amber-200">AI Study Prompt Loom</h3>
              <p className="text-amber-100/80">Concept sketches for local LLM plugins that stay offline yet help each seeker reflect.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiPlugins.map((plugin) => (
              <article key={plugin.id} className="bg-black/30 rounded-xl border border-amber-200/20 p-6 flex flex-col">
                <header className="mb-4">
                  <h4 className="text-2xl font-semibold text-amber-100">{plugin.title}</h4>
                  <p className="text-amber-100/70 text-sm uppercase tracking-wide">{plugin.purpose}</p>
                </header>
                <ul className="space-y-3 text-amber-50/80 text-sm flex-1">
                  {plugin.rituals.map((ritual, index) => (
                    <li key={index} className="bg-white/5 border border-amber-300/20 rounded-lg p-3">{ritual}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2 font-medium hover:bg-amber-700 transition"
                >
                  Mark for Local Prototype
                </button>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-amber-100/70">
            Implementation note: each module will point to a local LLM service exposed via the Companion Artificers’ plugin API. The scaffolding here describes the prompt choreography so engineers can map UI events to offline inference hooks in a later sprint.
          </p>
        </section>
      </div>
    </div>
  );

  const TracksPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">Learning Tracks</h2>
        <div className="space-y-6">
          {tracks.map((track, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-indigo-900">{track.level}</h3>
                <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                  {track.lessons} Lessons
                </span>
              </div>
              <p className="text-indigo-700 mb-4">{track.description}</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Start Track
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MemberPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-900">Member Area</h2>
        {!currentUser ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center space-y-4">
            <p className="text-lg text-teal-800">Sign in to view your steward profile and private notes.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              <LogIn className="w-5 h-5" /> Return to sign in
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Profile</h3>
              <p className="text-teal-700 mb-2">
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p className="text-teal-700 mb-2">
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="text-teal-700">
                <strong>Guild Path:</strong> Comparative Studies (customize in a future release)
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Reading List</h3>
              <ul className="space-y-2 text-teal-700">
                <li>• Bhagavad Gita - In Progress (45%)</li>
                <li>• Dhammapada - Completed</li>
                <li>• Heart Sutra - Not Started</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Reflection Journal</h3>
              <textarea
                placeholder="Write your reflections here..."
                className="w-full h-32 p-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Save Entry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <nav className="bg-amber-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-bold">Sacred Library</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-6">
                <button onClick={() => setCurrentPage('home')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <Home className="w-5 h-5" /> Home
                </button>
                <button onClick={() => setCurrentPage('library')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Library
                </button>
                <button onClick={() => setCurrentPage('tracks')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Tracks
                </button>
                {currentUser && (
                  <button onClick={() => setCurrentPage('member')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                    <User className="w-5 h-5" /> Profile
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 border-l border-amber-700/60 pl-4">
                <User className="w-5 h-5 text-amber-200" />
                <span className="text-sm text-amber-100">
                  {currentUser ? currentUser.name : 'Guest'}
                </span>
                {currentUser ? (
                  <button
                    onClick={handleSignOut}
                    className="text-sm px-3 py-1.5 rounded-lg border border-amber-600 hover:bg-amber-800 transition-colors"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="text-sm px-3 py-1.5 rounded-lg border border-amber-600 hover:bg-amber-800 transition-colors"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Home
              </button>
              <button onClick={() => { setCurrentPage('library'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Library
              </button>
              <button onClick={() => { setCurrentPage('tracks'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Tracks
              </button>
              {currentUser && (
                <button onClick={() => { setCurrentPage('member'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                  Profile
                </button>
              )}
              <div className="border-t border-amber-800 pt-3 space-y-2">
                <p className="text-sm text-amber-200">
                  {currentUser ? `Signed in as ${currentUser.name}` : 'Browsing as guest'}
                </p>
                {currentUser ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 rounded-lg border border-amber-600 text-amber-100 hover:bg-amber-800 transition-colors"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 rounded-lg border border-amber-600 text-amber-100 hover:bg-amber-800 transition-colors"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="bg-amber-50/80 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3 text-amber-900">
                <PenSquare className="w-7 h-7" />
                <h2 className="text-3xl font-bold">My Notes</h2>
              </div>
              <p className="text-amber-700 mt-2 max-w-2xl">
                Collect personal reflections, copy guild prompts, and store study observations from each library room.
                {canManageNotes
                  ? ' Share insights with the guild or keep them private to your steward archive.'
                  : ' Sign in to unlock private note keeping and publish reflections to the commons.'}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="bg-white/95 border border-amber-100 rounded-2xl shadow-md p-5 flex flex-col gap-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-900">
                  <Folder className="w-5 h-5 text-amber-500" /> Folders
                </h3>
                <ul className="mt-4 space-y-2">
                  {notesState.folders.length === 0 && (
                    <li className="text-sm text-amber-600">Create a folder to begin your note collection.</li>
                  )}
                  {notesState.folders.map((folder) => (
                    <li key={folder.id}>
                      <button
                        onClick={() => setActiveFolderId(folder.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                          folder.id === activeFolderId
                            ? 'border-amber-400 bg-amber-100 text-amber-900 shadow-sm'
                            : 'border-transparent bg-amber-50 hover:border-amber-200 text-amber-700'
                        }`}
                      >
                        {folder.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleAddFolder} className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-3">
                <label className="block text-sm font-semibold text-amber-800" htmlFor="new-folder-name">
                  New folder
                </label>
                {!canManageNotes && (
                  <p className="text-xs text-amber-600">Sign in to create and organize personal folders.</p>
                )}
                <input
                  id="new-folder-name"
                  value={newFolderName}
                  onChange={(event) => setNewFolderName(event.target.value)}
                  className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:bg-amber-100"
                  placeholder={canManageNotes ? 'e.g. Meditation Reflections' : 'Sign in to add folders'}
                  disabled={!canManageNotes}
                />
                <button
                  type="submit"
                  disabled={!canManageNotes}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
                >
                  <Plus className="w-4 h-4" /> Create folder
                </button>
              </form>
            </aside>

            <div className="space-y-6">
              {noteActionMessage && (
                <div className={`rounded-xl border px-4 py-3 text-sm ${noteAlertClass}`} role="status">
                  {noteActionMessage}
                </div>
              )}

              <div className="bg-white/95 border border-amber-100 rounded-2xl shadow-md p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-900">
                      <FileText className="w-5 h-5 text-amber-500" /> Notes
                    </h3>
                    <p className="text-sm text-amber-700">
                      {activeFolder ? `Viewing notes in “${activeFolder.name}”` : 'Create a folder to begin writing notes.'}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-amber-500">
                    {folderNotes.length} {folderNotes.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>

                <div className="mt-4">
                  {folderNotes.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-amber-200 bg-amber-50/80 px-4 py-6 text-center text-sm text-amber-600">
                      No notes yet. {canManageNotes ? 'Add a new note below to begin documenting your journey.' : 'Sign in to start capturing reflections.'}
                    </p>
                  ) : (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {folderNotes.map((note) => (
                        <li key={note.id}>
                          <button
                            onClick={() => setActiveNoteId(note.id)}
                            className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition-all ${
                              note.id === activeNoteId
                                ? 'border-amber-400 bg-amber-100 text-amber-900 shadow-sm'
                                : 'border-transparent bg-amber-50 hover:border-amber-200 text-amber-700'
                            }`}
                          >
                            <span className="flex items-center gap-2 font-semibold text-amber-900">
                              {note.visibility === 'public' ? (
                                <Globe2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                              ) : (
                                <Lock className="w-4 h-4 text-amber-500" aria-hidden="true" />
                              )}
                              <span className="truncate">{note.title}</span>
                            </span>
                            <span className="block text-xs text-amber-600">{formatDate(note.createdAt)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <form onSubmit={handleAddNote} className="bg-white/95 border border-amber-100 rounded-2xl shadow-md p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-amber-900">Add a new note</h3>
                  {!canManageNotes && <span className="text-xs text-amber-600">Sign in to save private notes.</span>}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-amber-800" htmlFor="note-title">
                      Note title
                    </label>
                    <input
                      id="note-title"
                      value={newNoteTitle}
                      onChange={(event) => setNewNoteTitle(event.target.value)}
                      className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:bg-amber-100"
                      placeholder={canManageNotes ? 'e.g. Sutra study takeaways' : 'Sign in to add notes'}
                      disabled={!canManageNotes || !activeFolderId}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-amber-800" htmlFor="note-content">
                      Note content
                    </label>
                    <textarea
                      id="note-content"
                      value={newNoteContent}
                      onChange={(event) => setNewNoteContent(event.target.value)}
                      className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:bg-amber-100"
                      placeholder={
                        !canManageNotes
                          ? 'Sign in to capture reflections.'
                          : activeFolderId
                              ? 'Capture quotes, reflections, or study prompts...'
                              : 'Create or select a folder to begin writing.'
                      }
                      rows={5}
                      disabled={!canManageNotes || !activeFolderId}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!canManageNotes || !activeFolderId}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
                  >
                    <Plus className="w-4 h-4" /> Save note
                  </button>
                </div>
              </form>

              <article className="bg-white/95 border border-amber-100 rounded-2xl shadow-md p-6">
                {activeNote ? (
                  <div className="space-y-4">
                    <header className="space-y-2">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-amber-900">{activeNote.title}</h3>
                          <p className="text-sm text-amber-600">Written on {formatDate(activeNote.createdAt)}</p>
                          {activeNote.visibility === 'public' && (
                            <p className="text-xs text-emerald-700">
                              Shared {formatDate(activeNote.publishedAt || activeNote.createdAt)}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                            activeNote.visibility === 'public'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {activeNote.visibility === 'public' ? <Globe2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          {activeNote.visibility === 'public' ? 'Public note' : 'Private note'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-amber-700">
                        <User className="w-4 h-4 text-amber-500" /> {activeNote.ownerName}
                      </div>
                    </header>

                    {canEditActiveNote && (
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingActiveNote((prev) => !prev)}
                          className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-3 py-2 text-sm text-amber-800 hover:bg-amber-100 transition-colors"
                        >
                          {isEditingActiveNote ? 'Cancel edit' : 'Edit note'}
                        </button>
                        <button
                          type="button"
                          onClick={handleToggleActiveNoteVisibility}
                          disabled={isSyncingVisibility}
                          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
                        >
                          {isSyncingVisibility ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : activeNote.visibility === 'public' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                          {isSyncingVisibility
                            ? 'Updating…'
                            : activeNote.visibility === 'public'
                                ? 'Make private'
                                : 'Share with guild'}
                        </button>
                      </div>
                    )}

                    {isEditingActiveNote && canEditActiveNote ? (
                      <form onSubmit={handleSaveActiveNoteEdit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-amber-800" htmlFor="edit-note-title">
                            Title
                          </label>
                          <input
                            id="edit-note-title"
                            value={editNoteTitle}
                            onChange={(event) => setEditNoteTitle(event.target.value)}
                            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-amber-800" htmlFor="edit-note-content">
                            Content
                          </label>
                          <textarea
                            id="edit-note-content"
                            value={editNoteContent}
                            onChange={(event) => setEditNoteContent(event.target.value)}
                            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                            rows={5}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingActiveNote(false)}
                            className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-3 py-2 text-sm text-amber-800 hover:bg-amber-100 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingNote}
                            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-300"
                          >
                            {isSavingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {isSavingNote ? 'Saving…' : 'Save changes'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-relaxed text-amber-900 whitespace-pre-wrap">
                        {activeNote.content}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/80 px-4 py-10 text-center text-sm text-amber-600">
                    Select a note to see its contents.
                  </div>
                )}
              </article>

              <section className="bg-white/95 border border-amber-100 rounded-2xl shadow-md p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-lg font-semibold text-amber-900">
                    <Users className="w-5 h-5 text-amber-500" /> Commons Notes Exchange
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <label htmlFor="shared-filter">Steward</label>
                    <select
                      id="shared-filter"
                      value={sharedFilter}
                      onChange={(event) => setSharedFilter(event.target.value)}
                      className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-sm text-amber-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="all">All stewards</option>
                      {sharedOwnerOptions.map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  {sharedNotesLoading ? (
                    <div className="flex items-center justify-center gap-2 text-amber-700">
                      <Loader2 className="w-5 h-5 animate-spin" /> Loading shared notes…
                    </div>
                  ) : sharedNotesError ? (
                    <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{sharedNotesError}</p>
                  ) : filteredSharedNotes.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-amber-200 bg-amber-50/80 px-4 py-6 text-center text-sm text-amber-600">
                      No public notes yet. When stewards share their reflections, they will appear here for everyone to read.
                    </p>
                  ) : (
                    <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                      <ul className="space-y-2">
                        {filteredSharedNotes.map((note) => (
                          <li key={note.id}>
                            <button
                              onClick={() => setActiveSharedNoteId(note.id)}
                              className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition-all ${
                                note.id === activeSharedNoteId
                                  ? 'border-emerald-400 bg-emerald-100/80 text-emerald-900 shadow-sm'
                                  : 'border-transparent bg-amber-50 hover:border-amber-200 text-amber-700'
                              }`}
                            >
                              <span className="flex justify-between gap-3">
                                <span className="font-semibold truncate">{note.title}</span>
                                <span className="text-xs text-amber-600">{formatDate(note.publishedAt || note.createdAt)}</span>
                              </span>
                              <span className="block text-xs text-amber-600">{note.ownerName}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-relaxed text-amber-900 whitespace-pre-wrap">
                        {activeSharedNote ? (
                          <>
                            <h4 className="text-lg font-semibold text-amber-900 mb-2">{activeSharedNote.title}</h4>
                            <p className="text-xs text-amber-700 mb-2">
                              Shared by {activeSharedNote.ownerName} on {formatDate(activeSharedNote.publishedAt || activeSharedNote.createdAt)}
                            </p>
                            {activeSharedNote.content}
                          </>
                        ) : (
                          'Select a shared note to read steward reflections from across the guild.'
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'library' && <LibraryPage />}
      {currentPage === 'tracks' && <TracksPage />}
      {currentPage === 'member' && <MemberPage />}
    </div>
  );
}