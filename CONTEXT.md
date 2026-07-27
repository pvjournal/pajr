# CONTEXT — pvjournal/pajr

_Read with `CONTRACT.md`. Regenerate `RESUME.md` before touching anything:
`bash ops/verify.sh && bash ops/resume.sh && cat RESUME.md`._

© 1993–2026 Abhishek Choudhary. All rights reserved. AyeAI.

## What this is

An index over the PaJR / user-driven-healthcare case-report corpus — several hundred blogspot
sites maintained by medical students, interns and faculty, principally around KIMS Narketpally.
The corpus is CC BY-NC-SA 4.0 and belongs to its authors and PaJR Health Private Limited.

**This is third-party work.** It sits in its own organisation under the corpus's own licence and
is never represented as part of the independent IP estate. What *is* ours is the index over it.

## Live state — 27 July 2026

| | |
|---|---|
| repo | `pvjournal/pajr`, public, Pages at pvjournal.github.io/pajr |
| harvest | `seed_pajr.sh` v0.5.0 / `harvest.py` v0.5.0, pure stdlib |
| corpus reached | 743 hosts, 10,198 posts known, 6,000 candidates fetched |
| indexed | 5,165 reports · 39 errors · 796 too short |
| vocabulary | 28,843 terms → 11,078 kept (df ≥ 3, plus 74 rare clinical terms at df 2) |
| contributors | 321 identified · 4,116 attributed posts · 1,049 unattributed |
| per-report proofs | 5,138 digests, 4,693 OTS proofs, **445 genuinely unstamped** |
| duplicates | 13 reports appear verbatim under two contributors' blogs |

## The 27 July incident

Two runs, 05:18Z local and 08:26Z publish. The publish run created the repo and pushed. Four
things went out that should not have:

1. `.cache/` — 7,537 fetched pages, 1.4 GB, **5,971 containing complete patient narratives** —
   while `DISCLAIMER.md` stated in bold that no narrative is stored. The cache lives inside the
   index directory and repo-root-is-the-index swept it in. No `.gitignore` existed.
2. `index.html` at 34.5 MB, the whole index inlined in one `<script>` block.
3. 436 orphan digests from the earlier run, never cleared, inflating the reported stamp count
   from 5,165 to 5,574.
4. A reader that hardcoded one assistant and fetched 44 MB to fill a dropdown, swallowing the
   failure in an empty `.catch()`.

Remediated by `fix_pajr.sh` v0.7.0. Each one is now a contract clause (P1–P6).

## Layout

| path | |
|---|---|
| `index.html` + `app.js` + `core.json` | the navigator; data fetched, not inlined |
| `reports.json` | slim url/title/author manifest for the reader |
| `reader.html` | opens an original, seeds any assistant from a selection |
| `items/` | per-report digest + OTS proof, named by 16-hex prefix |
| `kundali.json` | per-contributor chart + `_stats` |
| `proposed-metadata/` | one unminted `misty.json` per report |
| `duplicate-reports.json` | reports claimed by more than one blog |
| `attest/history/` | rotated manifests and their proofs — never overwritten |

## Minting

Two paths, and they must not be confused (P0b):

- **Ours.** The index is authored derivative work and is minted under Abhishek Choudhary / AyeAI,
  CC BY-NC-SA 4.0 inherited from the corpus, attributing the corpus authors as its source.
  `bash mint_pajr.sh --mint-index`.
- **Theirs.** 321 contributors have case reports with no DOI and no citable identity. The tooling
  generates a per-contributor **MASI kit** — pre-filled descriptor, report list with hashes and
  proofs, and a one-command mint they run under *their own* Zenodo token. We never hold their
  token and never mint on their behalf. `bash mint_pajr.sh --kits`.

MASI (Metadata-Assisted Scholarly Intelligence) is the existing process this rides on: concept →
narrative → poster → metadata → repo seeding → DOI → SHA-256 + OTS → preservation, with AI
assisting the metadata draft and the human retaining scholarly responsibility.

## Open

- `harvest.py` still classifies a fetch failure as "not clinical" and archives it under a named
  person's blog. Run 1 had 125 errors, run 2 had 39, and two hosts flipped verdict on the same
  cache. Needs a third state: `undetermined`, retried, never asserted.
- The 6,000-candidate cap silently drops ~40% of known posts; the selection rule is unstated.
- 1,049 reports carry no author, so attribution cannot be discharged for a fifth of the index.
- `misty` has no `kit` command yet — `mint_pajr.sh --kits` builds them externally for now.
- misty on GitHub is still 1.1.2; the v1.1.3 spiguard extraction has not landed.
