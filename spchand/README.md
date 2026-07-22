# S.P.Chand Convent School — website

> Part of a multi-school repository — see the [root README](../README.md).

Deoria, Uttar Pradesh. Static site, no build step, no dependencies.

```bash
python3 -m http.server 8000 --directory .
# → http://localhost:8000
```

## ✅ Confirmed (from the Google Maps listing)

| Field | Value |
|---|---|
| Name | S.P.Chand Convent School |
| Name (Hindi) | स.प.चंद कॉन्वेंट स्कूल |
| District / State | Deoria, Uttar Pradesh |
| Coordinates | 26.7185792, 83.8200094 |
| Google Maps | `cid=5290418029870982754` |
| Knowledge ID | `/g/11w1wpyt3v` |

Wired into the pages, the JSON-LD block and the map on `contact.html`.

The listing is **unclaimed and nearly empty** — Google shows "Add place's phone
number", "Add website", "Add a photo". So there is no address, no phone and no
website to take from it. The only hours it reports are "Open 24 hours", which is
a data-entry artefact, not the school day — it has not been used on the site.

For reference: this school sits **397 m** from Angel Public School (`../angel-public/`).

## ⚠️ Everything else is a placeholder

Address, phone, principal, fees, dates, statistics, news and every photograph are
invented scaffold content. Start with **sheet 01 · School Basics** in
`SP-Chand-Data.xlsx`.

```bash
grep -rn "\[Locality\]\|\[PIN\]\|\[phone\]\|\[Principal\|\[Month\|\[amount\|\[Board\|\[age" *.html
```

| Token | Where |
|---|---|
| `[Locality]`, `[PIN]` | utility bar, footers, contact |
| `[phone]` | utility bar, footers, contact, admissions CTA |
| `[Principal’s name]` | about.html, contact.html |
| `[Month] 2026`, `₹ [amount]`, `[Board...]`, `[age]` | admissions.html |

Also empty: the `tel:` links, the WhatsApp links (currently `#`), and the
`streetAddress` / `postalCode` / `telephone` fields in the `index.html` JSON-LD.

A reverse geocode of the coordinates returns PIN **274303**, but that is an
approximate lookup from OpenStreetMap, not from the school — do not publish it
without checking.

## Files

```
index.html          Home
about.html          Vision, mission, principal, faculty
academics.html      Curriculum by wing, assessment, homework policy
admissions.html     How to apply, dates, fees, scholarships, FAQ
contact.html        Enquiry form, office details, map
404.html

css/style.css       Design tokens in :root at the top
js/main.js          Nav, mobile menu, form validation
assets/logo.svg     Placeholder wordmark — replace with the real logo
assets/img/*.svg    24 placeholder images

robots.txt          Update the domain
sitemap.xml         Update the domain
SP-Chand-Data.xlsx  Outstanding-data workbook
apply-data.py       Writes the workbook back into the pages
```

## Identity

Navy `#1B3B6F` with saffron `#E8A33D`, deliberately distinct from the sibling
site's cardinal red. Source Serif 4 and Source Sans 3 throughout.

The palette lives in `:root` at the top of `css/style.css` — changing those few
values restyles the whole site with no markup edits.

> The variables are still named `--cardinal-red-*` from the shared scaffold; they
> hold this school's navy. Rename them if the mismatch bothers you — nothing
> outside that file depends on the names.

## Photographs

All 24 images are generated SVG placeholders reading **"REPLACE WITH PHOTO"**.
Drop real photographs into `assets/img/` and switch the `src` from `.svg` to your
file extension. Sizes are in sheet 09 of the workbook.

Priority: school building, a classroom, the assembly ground, and a portrait of
the Principal.

## Workbook → website

```bash
pip install openpyxl
python3 apply-data.py           # dry run
python3 apply-data.py --apply   # writes, saving *.html.bak first
```

Only rows with a filled real-value column are touched; blanks are skipped safely.

## Before deploying

`https://spchandconvent.in` is **a placeholder domain, not a real one**. Replace
it in every `canonical` / `og:` tag, plus `sitemap.xml` and `robots.txt`:

```bash
grep -rln "spchandconvent.in" . --include="*.html" --include="*.xml" --include="*.txt"
```
