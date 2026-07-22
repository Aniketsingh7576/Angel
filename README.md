# Angel Public School — website

A static website for **Angel Public School** (Principal: **Santosh Chand Ji**), built to
mirror the layout and design language of [stanford.edu](https://www.stanford.edu/).

No build step, no dependencies. Open `index.html` or serve the folder.

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Files

```
index.html          Homepage — mirrors Stanford's section order
about.html          Vision & mission, Principal's message, faculty
academics.html      Curriculum by wing, streams, assessment, homework policy
admissions.html     How to apply, dates, fee table, scholarships, FAQ
contact.html        Enquiry form + office details + map
404.html            Not-found page

css/style.css       All styling; design tokens at the top in :root
js/main.js          Dropdown nav, mobile menu, footer year, form validation

assets/logo.svg     School wordmark — edit the text directly in the SVG
assets/og-image.png 1200×630 social share card
assets/img/*.svg    20 placeholder images — replace with real photos

sitemap.xml         5 URLs — update the domain before deploying
robots.txt          Allow-all + sitemap pointer

Angel-Public-School-Data.xlsx   Data-collection workbook (10 sheets)
apply-data.py                   Pushes the filled workbook back into the site
```

## Design mapping (Stanford → Angel Public School)

| Stanford section | This site |
|---|---|
| "Advancing the Frontier" hero | "Where Curiosity Becomes Character" |
| Our Impact | Our Focus — four topic cards |
| Stanford News | School News — four cards |
| Research for a Better World | Academics + stats + Principal quote |
| An Infrastructure for Innovation | Campus banner |
| Education for Engaged Citizenship | Values & Character |
| Financial Aid | Fees & Support |
| Home of Champions | Sport |
| Large multi-column footer | Same structure |

Colours are Stanford's published palette: Cardinal Red `#8C1515`, Fog `#DAD7CB`,
Illuminating `#FEDD5C`, Palo Alto `#175E54`, Lagunita `#007C92`. Typefaces are
Source Serif 4 (headings) and Source Sans 3 (body) via Google Fonts.

---

## ✅ Real data (from the Google Maps listing)

Pulled from the Google Maps listing `cid=13568425395653224595` and wired into
every page, plus JSON-LD structured data on the homepage:

| Field | Value |
|---|---|
| Name | Angel Public School / एंजेल पब्लिक स्कूल |
| Principal | Santosh Chand Ji |
| Address | Mundera Chand, Deoria, Uttar Pradesh – 274206 |
| Plus code | PR98+6C3 |
| Coordinates | 26.7180101, 83.8160604 |
| Phone / WhatsApp | +91 96702 69091 |
| Hours | 6:00 am – 4:00 pm ¹ |
| Category | General education school |
| Website | *none listed* — this site would be it |
| Email | *none listed* — see below |

¹ The Maps panel only exposed **Wednesday** (6 AM–4 PM). "Mo–Sa 06:00–16:00" on
the site and in the JSON-LD is my assumption from that one day — confirm the real
weekly hours and adjust `contact.html` and the `openingHours` field in
`index.html`.

The contact page embeds an OpenStreetMap map at those coordinates (no API key
needed) and links out to the Google Maps listing.

## ⚠️ Still placeholder — replace before going live

The Maps listing has no email, no fee information, no board affiliation and no
enrolment figures, so these are still invented placeholder copy:

| Placeholder | Where | Replace with |
|---|---|---|
| `[Month] 2026` | `admissions.html` → Important Dates | real dates |
| `₹ [amount]` | `admissions.html` → fee table | real fees |
| `[Board name — e.g. CBSE / State Board]` | `admissions.html` → FAQ | actual board |
| `[age]` | `admissions.html` → FAQ | minimum Nursery age |
| Statistics (`1:22`, `30+`, `100%`, `40+`, `14`, `4`, `6`, `8`) | homepage fact bar & stat rows | real numbers |
| News headlines and excerpts | `index.html` | real school news |
| Social links (`href="#"`) | all footers | real profile URLs |
| Faculty / facilities descriptions | `about.html`, `index.html` | what the school actually has |

No email address is published anywhere on the site — the contact routes are the
phone number and WhatsApp. If the school has an email, add it to the footer
`<address>` blocks and the "School Office" card in `contact.html`.

Quick way to find remaining tokens:

```bash
grep -rn "\[Month\|\[amount\|\[Board\|\[age" *.html
```

### Images

Every image slot on the site now uses one of your three usable photos, re-cropped
to a different region each time so the repeats aren't obvious. **23 crops** from:

- `1.jpg` — full-school assembly (students, flag)
- `471741574…jpg` — school building with signboard
- `532422009…jpg` — staff and guests at the flag hoisting

`2.jpg` is **not used** — at 414×414px it is too small for any slot. Send the
original if you want it in.

#### ⚠️ Stand-ins that do not match their label

These slots have a photo, but the photo does not show what the caption claims.
They look finished, but replace them before the site is public:

| Slot | Currently shows | Should show |
|---|---|---|
| `principal.jpg` | School entrance | **Portrait of Santosh Chand Ji** ⭐ |
| `labs.jpg` | Building exterior | Science laboratory |
| `library.jpg` | Building exterior | Library / reading room |
| `classroom.jpg` | Classroom block from outside | Inside a classroom |
| `sports.jpg`, `sports-1…4.jpg` | Assembly / staff crops | Actual games, athletics, teams |
| `news-1/2/3.jpg` | Assembly & staff crops | Whatever the real stories are |

I deliberately did **not** put a photo of an individual in the principal slot —
none of the people in your photos are identified, and captioning the wrong person
as the Principal would be worse than a placeholder. It shows the school entrance
with the signboard instead.

#### Accurate pairings

| File | Shows | Used on |
|---|---|---|
| `hero.jpg` | Full-school assembly | Homepage hero |
| `campus.jpg` | School building | Campus banner |
| `assembly.jpg` | Students on the ground | Assembly Ground tile |
| `faculty.jpg` | Staff at flag hoisting | About page staff band |
| `citizenship-1/2.jpg` | Students / staff | Values & Community |
| `news-assembly.jpg` | Flag ceremony | Independence Day card |
| `news-building.jpg` | School building | Admissions card |

Total image weight is ~4.8 MB. All below-fold images are `loading="lazy"`.

### Logo

`assets/logo.svg` is text-based — open it in any editor and change the school
name, tagline or colours. The tagline now reads **"…THE POWER OF FAITH"**,
taken from the school's own signboard in the photo you sent. Replace the whole file if you
have an official logo.

### Contact form

`contact.html` validates client-side only; nothing is sent anywhere. To make it
work, either:

- point the `<form>` at a service like Formspree / Web3Forms / Google Forms, or
- add `action="mailto:info@angelpublicschool.in" method="post" enctype="text/plain"`
  for a quick (crude) mail-client handoff, or
- POST to your own backend endpoint.

The `data-enquiry-form` handler in `js/main.js` currently calls
`preventDefault()` — remove that once a real endpoint is wired up.

## The workbook → website pipeline

`Angel-Public-School-Data.xlsx` collects everything the site still needs.
`apply-data.py` reads it back and writes it into the HTML.

```bash
pip install openpyxl

python3 apply-data.py           # dry run — prints exactly what would change
python3 apply-data.py --apply   # writes it, saving *.html.bak first
```

Rules it follows:

- Only rows where you filled the real-value column are touched. Blanks are skipped.
- Statistics are matched by their **label**, never by blind number replacement — so
  changing "Sports offered" from 8 to 5 can't accidentally rewrite an unrelated 8.
- The fee table is rebuilt wholesale from sheet 03, so you can add or delete class
  rows freely.
- Anything it can't place automatically is listed under "need a manual edit" rather
  than being silently dropped.

On an untouched workbook it reports "nothing to apply" — a clean no-op.

## Before deploying

Search and replace `https://angelpublicschool.in` with the real domain in:

- every `<link rel="canonical">` and `og:url` / `og:image` tag (all 5 pages)
- `sitemap.xml`
- `robots.txt`

```bash
grep -rln "angelpublicschool.in" . --include="*.html" --include="*.xml" --include="*.txt"
```

Also update `<lastmod>` in `sitemap.xml` when content changes.

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain
shared hosting. Upload the folder as-is.

## Note on the design

The layout, structure and colour palette follow stanford.edu closely, as
requested. The copy, imagery and branding are original to Angel Public School —
no Stanford text, photography, logo or trademark is used anywhere in this site.
