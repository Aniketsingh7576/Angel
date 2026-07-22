# School Websites

A repository holding one self-contained static website per school. Each site
folder is independent — its own HTML, CSS, JS and images — so a school can be
deployed, edited or removed without touching the others.

## Sites

| Folder | School | Status |
|---|---|---|
| [`angel-public/`](angel-public/) | **Angel Public School** — Mundera Chand, Deoria, Uttar Pradesh 274206 | Built · awaiting real fee/date data |

## Layout

```
.
├── angel-public/            ← one folder per school
│   ├── index.html           home
│   ├── about.html           vision, mission, principal, faculty
│   ├── academics.html       curriculum by wing, assessment, homework
│   ├── admissions.html      how to apply, dates, fees, scholarships, FAQ
│   ├── contact.html         enquiry form, office details, map
│   ├── 404.html
│   ├── css/style.css        design tokens in :root at the top
│   ├── js/main.js           nav, mobile menu, form validation
│   ├── assets/
│   │   ├── logo.svg
│   │   ├── og-image.png     social share card
│   │   └── img/             site imagery
│   ├── photos-source/       original unedited photographs
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── README.md            ← full notes for THIS school
│   ├── Angel-Public-School-Data.xlsx   outstanding-data workbook
│   └── apply-data.py        writes the workbook back into the pages
│
├── .gitignore
└── README.md                ← you are here
```

## Running a site locally

Serve the repository root and each school is reachable by folder name:

```bash
python3 -m http.server 8000
# → http://localhost:8000/angel-public/
```

Or serve a single site directly:

```bash
python3 -m http.server 8000 --directory angel-public
# → http://localhost:8000/
```

## Adding another school

1. Copy an existing site as the starting point:

   ```bash
   cp -R angel-public new-school-name
   rm -rf new-school-name/photos-source/* new-school-name/assets/img/*.jpg
   ```

2. In `new-school-name/css/style.css`, change the brand colours in `:root`
   (`--cardinal-red` and friends) — everything else follows from those tokens.
3. Replace `assets/logo.svg`, then work through the HTML replacing the school
   name, address, phone, principal and JSON-LD block in `index.html`.
4. Update `robots.txt`, `sitemap.xml` and the `og:` / `canonical` URLs to the
   new domain.
5. Give it its own `README.md` and data workbook.
6. Add a row to the **Sites** table above.

Nothing is shared between site folders by design — duplication is deliberate so
that editing one school can never break another.

## Deploying

Each folder is plain static HTML with no build step. Point a host at the site
folder (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or ordinary shared
hosting) and upload it as-is.

> **Before making any site public**, read that school's own `README.md`. Sites in
> this repository may still contain placeholder fees, dates and statistics that
> must be replaced with real figures first.
