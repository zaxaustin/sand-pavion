# Order of the Sand Pavilion

The Sand Pavilion is tended as an initiatory sect devoted to moneyless learning and mutual care. Each chamber is overseen by a guild that guards specific practices and ensures every traveler receives what they need to keep humanity’s ember bright. Our organizational DNA is now fully documented so contributors can map their work to the Dharmic operating system, the Worker Self-Directed Nonprofit (WSDNP) architecture, and the exit-focused IP strategy described in `blueprint.txt`.

## Dharmic Operating System
- **Four Noble Truths**: We treat professional skill gaps as Dukkha, trace their origin to craving without a path, define cessation as entrepreneurial self-sufficiency, and run every ritual as part of the Path (Magga). Each retro or onboarding step should answer: what suffering are we addressing, what caused it, what cessation milestone is next, and what practices guide us? See `docs/governance/structure.md` for the full mapping.
- **Eightfold Path Code of Conduct**: Right View/Resolve appear in onboarding pledges, Right Speech/Action/Livelihood govern project selection and communication, and Right Effort/Mindfulness/Concentration inform our quality controls. Contributors reaffirm these policies before pushing code or publishing rituals.

## Worker Self-Directed Nonprofit & Sociocracy
- **Legal + Mission Lock**: We operate as a WSDNP where all revenue is reinvested into mission infrastructure (training, tooling, reserves). Governance artifacts (AGM notes, Form 990s, circle charters) live alongside the codebase for radical transparency.
- **Circle map**: Gate & Rituals, Library Stewardship, Companion Artificers, Member Lifecycle, and the Steward Board run as sociocratic circles. They double-link to the Board, make consent-based decisions, and log objections/resolutions in their respective pages (`steward-board.html`, `sand-pavilion-board.tsx`, etc.).
- **Financial rule of thirds**: Budgeting follows the Buddhist wealth framework—25% consumption, 50% mission investment, 25% conservation—so we can sustain long-term member development.

## IP, CLA, and Exit Readiness
- **MIT License**: The entire repository now uses a permissive MIT license (`LICENSE`) so alumni can commercialize derivatives without copyleft constraints.
- **Contributor License Agreement**: Every contributor signs the template in `docs/legal/cla-template.md`, granting Sand Pavilion the rights needed to steward the commons while preserving each member’s exit path. Operational guidance lives in `docs/legal/IP-playbook.md`.
- **Exit dossiers**: When a member reaches cessation, the Member Lifecycle circle assembles an IP packet, trademark guidelines, and an assignment letter per the playbook so the alumni venture can thrive independently.

## Member Lifecycle Metrics
- **Quantitative KPIs**: commits, pull-request latency, issue velocity, and monetized volunteer hours ($34.79/hr per Independent Sector 2024). These power the dashboards in `business_quest_dashboard.tsx` and future data hooks.
- **Qualitative KPIs**: skill benchmarks, mindfulness practice logs, mentorship hours, and culture feedback tied to Samādhi disciplines.
- **Reporting cadence**: circles update metrics weekly, the Steward Board publishes monthly summaries, and AGM packets roll up quarterly. Details live in `docs/membership/progression.md`.

## Realms of the Order
- **Outer Court — Gate of Orientation (`index.html`)**: introduces the initiation arc, sets expectations for visitors, and threads every other realm together.
- **Sanctum of Stillness — Sacred Spaces Guild (`sacred-spaces.html`)**: prepares bodies and hearts with restorative rituals and presence work before deeper study.
- **Hall of Paths — Continuance Circle (`journeys.html`)**: hosts week-by-week journeys that turn shared wisdom into lived rhythm.
- **Archivum Vitae — Living Library Guild (`living-library.html`)**: collects community-annotated texts, oral histories, and study tracks for every level.
- **Workshop of Whispering Circuits — Companion Artificers (`local-ai-companion.html`)**: documents the privacy-first AI architecture that supports every other guild.
- **Council Hearth — Steward Board (`steward-board.html`)**: publishes missions, accountability notes, and recognition so labour stays distributed.

## Path of the Visitor (Quickstart)
1. **Pledge at the Gate**: open `index.html` to receive the four-stage initiation overview and learn the etiquette of the Outer Court.
2. **Attune in the Sanctum**: travel to `sacred-spaces.html` to ground yourself through the Sacred Spaces Guild’s arrival practices.
3. **Choose a Journey**: explore `journeys.html` and pick an Inheritance Path that matches your readiness; note the cohort signals before you begin.
4. **Study and Equip**: gather study packs in `living-library.html` and request tools from the Companion Artificers via `local-ai-companion.html`.
5. **Report to the Council**: visit `steward-board.html` to log contributions, volunteer for missions, and stay aligned with communal needs.

## How to Explore Locally
1. Open `index.html` in a browser to begin at the Gate of Orientation.
2. Follow the guild navigation present on every page to move between realms.
3. Prototype files in `.tsx` or additional `.html` documents capture more detailed design ideas for future iterations.

## Maintaining the Living Library
1. **Install the steward server**: From the repository root run `npm install` once, then start the upload service with `npm run start:library-server`. The Express server listens on `http://localhost:4545` and manages `assets/library/catalog.json` plus the `assets/library/uploads/` directory.
2. **Mirror a manuscript**: Visit `library-steward.html` in your browser, fill in the upload form (title, provenance, license notes, and manuscript file), and submit. The server blocks files that fail copyright checks (missing source URL, suspicious publication year, or absent licensing details). Successful uploads are stored in `assets/library/uploads/` and added to the catalog with a `pending_review` status so they stay hidden until approval.
3. **Approve new holdings**: After verifying rights and lore notes, activate the title with a POST request to `http://localhost:4545/library/review/<book-id>/activate` (use the ID returned by the upload response). You can trigger the request through the Resolve Complaint panel in `library-steward.html` by selecting “Activate immediately.” Activated entries appear automatically inside `living-library.html` because the page now renders cards from `catalog.json`.
4. **Update lore and metadata**: If you need to adjust the sect lesson, lore copy, or format notes, include the revised text when calling the activate endpoint or edit the entry directly inside `assets/library/catalog.json`. Keep excerpts concise—roughly 300–400 characters—to maintain accessibility for the built-in TTS controls.
5. **Handle complaints quickly**: Use the complaint panel in `library-steward.html` (or POST to `/library/complaint`) when a rights issue is reported. The server appends the complaint to `assets/library/complaints.log`, flips the catalog status to `suspended`, and the entry disappears from the public grid. Once resolved, reinstate the book via `/library/complaint/<book-id>/resolve` with `nextStatus` set to `pending_review` or `active` depending on the outcome.
6. **Document new rituals**: When a holding introduces a fresh study practice, add the ceremony note in the README so fellow stewards understand how to guide visitors through the text.

## Future Work
- Build interactive versions of the realm pages (e.g., transform `journeys.html` into a fully editable path builder).
- Connect the Steward Board to live submission forms and integrate with Local AI companions for mission tracking.
- Expand multilingual support and accessibility cues across every room.
- Continue integrating the remaining concept files (education platform, inheritance paths builder, etc.) into the unified flow.
- Wire plugin manifests directly into the companion shell (`local_ai_architecture.tsx`) once the Node/FS bridge lands, replacing the static demo data.

## Open Questions & Resource Needs
- **GPU + Hardware Guidance**: Need benchmarks for 7B and 13B models on common hardware (Mac M-series, modest NVIDIA GPUs) to set realistic expectations for travelers.
- **UI Mockups**: Seeking design mockups for the plugin management console and consent prompts that align with the Pavilion aesthetic.
- **Security Review**: Require volunteers to audit sandbox profiles and confirm manifests uphold privacy commitments.
- **Localization**: Contributors fluent in non-English languages can help translate rituals and interface copy while keeping cultural nuance.

## Contributing
Share ideas or new rooms by opening an issue or dropping concepts into the Steward Board. Every contribution should honour the pavilion’s ethos: generosity, respect, and collective stewardship.
