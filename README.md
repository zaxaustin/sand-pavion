# Order of the Sand Pavilion

The Sand Pavilion is tended as an initiatory sect devoted to moneyless learning and mutual care. Each chamber is overseen by a guild that guards specific practices and ensures every traveler receives what they need to keep humanity’s ember bright.

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

## Local Companion Setup
1. **Install a Local Model Runner**
   - **Ollama** (macOS, Linux, Windows WSL): install from [ollama.ai](https://ollama.ai) and pull a base model such as `ollama pull mistral`. Configure GPU usage with `OLLAMA_GPU_LAYERS` if available.
   - **LM Studio** (macOS, Windows): download the desktop app, choose a GGUF model (3B–7B works well for laptops), and enable the local HTTP server in settings.
   - **Other Runtimes**: any llama.cpp-compatible launcher works; ensure it exposes an API endpoint on `http://localhost` so the Inner Alchemy Guide can connect.
2. **Register the Model**
   - Update your companion's runtime config (example forthcoming) with the model name, desired context window, and GPU preference.
   - Test inference locally before connecting plugins: `ollama run mistral "hello"` or LM Studio's test prompt should respond without network calls.
3. **Optional Cloud Bridge**
   - Provide API keys only inside a local secrets vault (`config/secrets.env`) and toggle escalation explicitly in the UI or config.
   - Every outbound request should log to a steward-visible ledger so shared credits stay accountable.

## Plugin Installation & Configuration
1. Copy example plugin manifests from `config/plugins/*.json` and adjust the paths to match your storage layout.
2. Keep each plugin sandboxed:
   - Set `sharing` to `device-only` unless you intentionally federate with trusted peers.
   - Use encrypted storage paths (e.g., age, gocryptfs) for any ledger or cache location.
3. Load plugins through the companion launcher (future CLI) or manually by referencing them in your orchestration script. Disable any manifest you do not actively need by leaving `"enabled": false`.
4. Document steward approvals by appending signatures or hashes to the manifest before enabling a plugin in shared environments.

## Privacy & Data Sovereignty Practices
- Store conversation history and ritual notes in encrypted volumes with traveler-owned keys.
- Rotate caches and logs regularly; offer one-click deletion from the UI and a CLI command for headless setups.
- Favor LAN or mesh sync over cloud relays. When federation is necessary, require steward countersignature and show a printable audit trail.
- Never assume consent—surface opt-in prompts when a plugin requests new data access or network scopes.

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
