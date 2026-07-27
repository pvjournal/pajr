# How the two copies of one case connect — a plain walkthrough

Built with Claude Opus 4.8 · this explains, for a non-technical reader, how a single
case report can be found in two places and how anyone can verify they are the same
thing, and reach the consent behind it.

---

## The situation, in one picture

A doctor writes up a patient's journey. It ends up at **two web addresses**:

1. **The blog post** — where it was first written, for example
   `101pallirakesh.blogspot.com/2023/07/ckd-with-poly-cystic-kidney-disease.html`
2. **The database record** — the curated, consent-gated version at
   `research.pajrhealth.com`

These are the *same case*, seen from two doors. The question a careful reader asks is:
how do I *prove* they are the same, and where is the consent that says this may be
shared at all?

## The key that links them

The database address literally **contains** the blog address inside it. Look:

```
research.pajrhealth.com/portfolio/https%3A%2F%2F101pallirakesh.blogspot.com%2F2023%2F07%2F…
                                   └────────────── the blog URL, encoded ──────────────┘
```

The `%3A` is just `:` and `%2F` is just `/`, written in a way that is safe to put
inside another web address. So the database page is *pointing back at* the exact blog
post. That embedded link is the proof that the two are one case — you do not have to
take anyone's word for it.

## How to check it yourself, with an ordinary search engine

You do not need any special tool. Paste these into Google, then Bing, then
DuckDuckGo (each covers slightly different corners of the web, so try all three):

**To see the database record that points at a given blog post**
> `"research.pajrhealth.com/portfolio" "101pallirakesh"`

**To see the blog post and the database side by side**
> `"101pallirakesh" pajr polycystic kidney`

**To find the consent and terms behind it all**
> `site:pajrhealth.com consent`
> `pajrhealth "informed consent" deidentified`

**To see, across the whole project, where blogs and the database link up**
> `site:blogspot.com "pajrhealth.com"`

Each search is built so that a result only shows up when *both* ends of the chain, or
the consent that connects them, appear together. That is what "triangulation" means
here: three independent search engines, each confirming the same link, so no single
source has to be trusted alone.

## Where the consent lives

Every case on PaJR is registered through an **informed, revocable consent form**
(`pajrhealth.com/consent-form/`), and the platform's **Terms**
(`pajrhealth.com/community-guidelines/`) set out that health data is *deidentified
before it is ever published or indexed*. A patient or their advocate can **withdraw
consent at any time**, and anything derived from their record — including entries in
this index — is removed on request.

Archived copies of the Terms are kept at `archive.is/Wup0y` and should also be saved to
`web.archive.org`, so the rules that applied on the day of indexing can always be
shown, even if the live pages later change.

## What this index does, and does not, do

- It records the **link** between the blog post and the database record, so the trail
  stays visible.
- It stores **no patient text** — only the address, a fingerprint (hash) of the text as
  read, the date, and the medical words derived from it.
- It **mints nothing** and **publishes nothing** on anyone's behalf. The decision to
  turn a case into a citable record belongs to its authors.
- It is **not medical advice**, and any "ask an AI" button simply opens a conversation
  you control, against an assistant you choose.

---

© 1993–2026 Abhishek Choudhary (this walkthrough only). The PaJR corpus is
CC BY-NC-SA 4.0 and belongs to PaJR Health Private Limited and the respective authors.
