# PaJR — case report index

A searchable index of case reports published by the **PaJR** and **user-driven healthcare**
community. It is a navigator over other people's work: it points at reports, counts the clinical
vocabulary in them, and lets a reader open the original.

**Live:** https://pvjournal.github.io/pajr/ · **Reader:** https://pvjournal.github.io/pajr/reader.html

---

## Whose work this is

The case reports belong to their authors and to PaJR Health Private Limited, published under
**CC BY-NC-SA 4.0**. ShareAlike binds this index too: it is a derivative and carries the same
licence. Non-commercial — the navigator must not be paywalled or bundled commercially.

This index is **third-party work**. It is not part of, and must never be represented as part of,
the independent IP estate of its builder. It lives in its own organisation under the corpus's own
licence, and any use elsewhere is bound by that licence and nothing else.

Nothing here has been minted, submitted or published on any author's behalf. The
`proposed-metadata/` directory holds **unminted proposals only**, each marked
`author_verified: false`. The intent to publish belongs to the authors.

## What this repository stores — and what it does not

For each report it records the public URL, the article title and byline where one is present, a
SHA-256 of the article text as read, the date of reading, and the clinical vocabulary derived
from it.

It stores **no patient narrative, no image, and no identifiable data**. Report text is read,
counted and discarded. The harvester keeps a local page cache under `.cache/` so a re-run does
not re-fetch — **that cache is deliberately excluded from this repository** (`.gitignore`) and
must never be committed. If you fork or rebuild, keep it excluded.

Terms appearing in fewer than three distinct reports are dropped: a term that rare is more likely
an identifier than a concept. Every token is scrubbed for e-mail addresses, URLs, phone-shaped
runs and digit-initial forms *before* tokenising, and screened for capitalised singletons after.

## Layout

| path | what it is |
|---|---|
| `index.html` | the navigator — cloud, co-occurrence, reports, contributors, rare-condition spotlight |
| `core.json` | terms, edges, records, contributors, term→report map (~2.5 MB) |
| `app.js` | the navigator's logic, no longer inlined |
| `reports.json` | slim url/title/author manifest for the reader (~0.8 MB) |
| `reader.html` | opens an original and seeds a conversation from any selection |
| `items/` | one SHA-256 digest per report, each carrying its own OpenTimestamps proof |
| `DIGESTS.sha256` | corpus roll-up |
| `PROVENANCE.sha256` | digest over every generated artefact — this index's own provenance |
| `proposed-metadata/` | one unminted `misty.json` proposal per report |
| `errors.json` | what could not be read, and why |
| `duplicate-reports.json` | reports appearing verbatim under more than one blog |
| `TRIANGULATION.md` | how a curated record is bound back to its blogspot origin |
| `ASSUMPTIONS.md` | every assumption taken without asking, and its cost if wrong |

## Reading through AAB

**AAB** (آب) treats a system as something *painted* rather than written, and gates every claim
behind an executed oracle — **no oracle, no glow**. A case report is a painting of a patient as a
system. Read it that way: a differential is *named*, not *verified*, until an investigation has
actually been run and returned a result. The reader's **Oracles** seed asks exactly that of any
passage — which claims were tested, by what, and what came back.

## Seeding a conversation

Selecting a passage in the reader opens it in **whichever assistant you choose** — Claude,
ChatGPT, Perplexity, Copilot, Le Chat, Grok, Gemini, DeepSeek, Qwen, Kimi, or a local model via
the clipboard. This is AAB's *AI-source invariance*: the validity of a painting does not depend on
which intelligence produced it, so the tool must not privilege one. Providers without a documented
URL prefill copy the prompt to your clipboard rather than pretend at a parameter that may not
exist.

Nothing is sent anywhere until you click. Opening an original goes through a public text relay,
which sees that URL — stated on the page, never silent. Open the original directly if you would
rather it did not.

## Provenance

Each report carries its **own** digest and proof rather than being folded into an anonymous
bundle, so a timestamp can carry credit to a named contributor. `PROVENANCE.sha256` covers every
generated artefact and is itself stamped, so this index's own construction is timestamped.

Where a stamp failed it is recorded as **unstamped**. Nothing is fabricated. `items/` contains a
`.sha256` for every indexed report and a `.sha256.ots` only where a proof was actually obtained;
the difference is real and is not papered over.

## Rebuilding

```
bash seed_pajr.sh --local --depth=2      # harvest and build, publish nothing
bash seed_pajr.sh --consent="..."        # build, then a typed gate publishes
```

The harvester is pure Python standard library — no pip dependencies. `git`/`gh` are needed only to
publish; `ots` only to timestamp. A re-run reuses the local page cache and fetches only what is
new; `--refresh` re-fetches everything.

## Corrections and takedown

If you are an author here and want your work removed, re-attributed, or the byline corrected, open
an issue or contact PaJR Health. Removal is honoured on request — no case is made for keeping it.

## Not medical advice

Nothing in this repository is medical advice, diagnosis or treatment. Emergencies: **112** (India)
· **999** (UK).

---

Index built with Claude Opus 4.5 · CC BY-NC-SA 4.0, inherited from the corpus it indexes.
