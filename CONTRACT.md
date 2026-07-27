# CONTRACT — pvjournal/pajr

_Thin overlay. The [MASTER CONTRACT](https://github.com/zistgah/governance/blob/main/CONTRACT.md)
clauses 1–12 govern. This file ADDS; it never relaxes. Every clause below was earned by a
failure that reached production on 27 July 2026._

© 1993–2026 Abhishek Choudhary. All rights reserved. AyeAI.

## Third-party corpus

**P0 — This repository indexes work that is not ours.** The case reports belong to their authors
and to PaJR Health Private Limited under CC BY-NC-SA 4.0. ShareAlike binds this index. The corpus
is public and licensed, so indexing it and publishing a derivative needs no further permission;
what it does need is **attribution**, discharged per report and per contributor. Attribution is
the obligation here, not consent.

**P0b — Two kinds of artifact, two different rules.** *Our* contribution — the harvester, the
derived vocabulary, the co-occurrence net, the navigator, the triangulation method — is authored
work and **is minted** under the author's name. *Their* contribution — the case reports — is
never minted by us and never republished; instead the tooling **enables the authors to mint their
own** (see `mint_pajr.sh --kits` and MASI). Enabling is the deliverable; withholding is not.

## What may leave the machine

**P1 — Working state is not publication.** The harvester's `.cache/` holds raw fetched article
bodies so a re-run need not re-fetch. It is never committed. `.gitignore` carries it, and the
contract gate fails closed if a cache path appears in `git ls-files`.
_Earned: 7,537 cached pages, 5,971 of them complete patient narratives, 1.4 GB, went public._

**P6 — A claim in a legal file is a testable assertion, and is tested.** `DISCLAIMER.md` states
this index "stores and reproduces no patient narrative". Any statement of that form must have a
corresponding gate check that fails the publish when it stops being true. A disclaimer that is
not mechanically checked is a fabrication waiting to happen (MASTER 3).
_Earned: the disclaimer was false the moment it was pushed._

## What a served page may weigh

**P2 — Bulk data does not travel inside a page.** No `<script type="application/json">` payload
over 256 KB. Data goes in a fetched file; the page loads it and reports the failure to the reader
rather than swallowing it.
_Earned: `index.html` shipped at 34.5 MB._

**P2b — Look for the duplication before reaching for laziness.** The 33 MB term map was one
record's URL and title repeated across every bucket it appeared in. Indexing instead of
duplicating took it to 1.04 MB with nothing lost. Compress the representation before deferring
the download.

## Generated artifacts

**P3 — A generated directory is rebuilt, never accumulated.** `items/`, `proposed-metadata/` and
their proofs are cleared against the current record set on every run. Any file not backed by a
record in this build is removed. Counts printed to the operator are counted from disk, never
carried in a variable.
_Earned: 436 digests from an earlier run survived into the published set; the operator was told
5,574 reports were stamped when 5,165 existed._

**P3b — A truncated identifier is a collision waiting to happen.** `items/` names are the first
16 hex of the report digest. No collision exists today. If two records ever share a prefix the
build fails rather than overwriting one author's proof with another's.

**P3c — One artifact, many claimants, is recorded not resolved.** Thirteen reports appear verbatim
under two contributors' blogs. The item file names one author. The other is written to
`duplicate-reports.json` and stays visible, because dropping a claim silently is the one thing
attribution cannot survive.

## Naming and method

**P4 — A named method is described from its source, never from plausibility.** Anything invoking
AAB, VGC, MASI, CIIO, PEDLER or any other named framework quotes that framework's own definition.
AAB is oracle-gated system painting — *no oracle, no glow* — not "sketching a diagram".
_Earned: the UI shipped a banner describing AAB as generic sketching._

**P5 — AI-source invariance is enforced in the artifact, not just asserted in the paper.** AAB §7
holds that a painting's validity does not depend on which intelligence produced it. Any surface
that seeds a model therefore offers a choice of model. Where a provider has no documented URL
prefill, the prompt goes to the clipboard — no invented query parameters (MASTER 3).
_Earned: the reader hardcoded one assistant._

## Tooling

**P7 — Use zops. Do not re-solve what it solves.** `zops_repo` is clone-or-reuse; `zops_gate` is
the typed intent; `zops_push` is gate-commit-receipt-stamp-reseal-verify-push as one call. A
script that hand-rolls any of these is wrong even when it works.
_Earned: `fix_pajr.sh` v0.6.0 hand-rolled a repo check, dead-stopped with "run this from inside a
clone", and handed the work back — the third occurrence of the bug `README-zops.md` opens with._

**P8 — No dead stops.** A script that can do the thing does the thing. Printing an instruction for
the operator is the failure mode, not the fallback.
