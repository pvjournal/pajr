# Assumptions recorded by this run

Each line is a decision taken without asking, because asking would have blocked the
work and none of these is irreversible. Every one is cheap to correct. No assumption
here authorises publication or minting: those remain behind a typed human gate.

| # | Assumed | Why safe | If wrong |
|---|---|---|---|
| A1 | A blog is clinical if 3 sampled posts show >=6 clinical marker terms | Only affects which public blogs are read | Adjust `MARKERS`/`need`; re-run |
| A2 | The author string on a post is the contributor to credit | Public byline on a public post | Correct in `kundali.json`; nothing was published |
| A3 | Posts without a byline are recorded as UNATTRIBUTED | Refuses to guess authorship | Attribution added later, per item |
| A4 | Per-item proofs belong to the item, not the corpus | A proof over a bundle cannot credit an individual | Corpus-level proof still written alongside |
| A5 | 'Research Kundali' means a chart of a contributor computed from public output, as a birth chart is computed from public birth data | Derived, public, names no one not already publicly named | Rename the view; the data stands |

Generated 2026-07-27T08:30:02Z.

(c) 1993-2026 Abhishek Choudhary. All rights reserved.
