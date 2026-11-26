TAZAT BIOMEDICAL – MULTI-PAGE WEBSITE (HTML/CSS/JS)

PAGES
Main: index, about, services, calibration (C1), respiratory (R2), shop, training, resources, contact
Tools: book (appointment), track (enquiry tracker), reminders (calibration due dates + .ics calendar alerts)
Local hubs: madurai, sivagangai, karur (Google Map embed, FAQ, schema)
Blog: blog + 6 articles (blog-*.html)
SEO: sitemap.xml, robots.txt, meta/OG tags, canonical, JSON-LD (LocalBusiness, Article, FAQPage)

SETUP (do these before publishing)
1. config.js  -> paste FORM_ENDPOINT (Formspree URL or Google Apps Script web-app URL) so every enquiry/appointment
   arrives online. Empty = falls back to the visitor's email app.
   Also add GOOGLE_REVIEW_URL and GOOGLE_MAPS_URL (buttons stay hidden until filled).
2. build.py -> set SITE = "https://your-real-domain" (used in canonical, sitemap, schema), then run: python3 build.py
3. Photos: drop your real photos in assets/images/ using the names in PHOTOS-README.txt (hero.jpg, about.jpg, cpap.jpg ...). They override the placeholders automatically.
4. Verify claims (300+, zero errors, 100%), prices, phone/email/WhatsApp.
5. Add your exact address in extra_pages.py/location pages if you want the map to pin the office exactly.

NOTES
- Tracker/reminders/booking history are stored in the visitor's own browser (localStorage). Real cross-device tracking
  and live slot availability need a backend/database.
- Blog articles are general information; have a doctor/clinical lead review them before publishing.
- Edit content in build.py / extra_pages.py, then run python3 build.py to regenerate all pages.


FRONTEND EXPANSION (NOV 2026)
New pages: clients.html, projects.html, team.html, gallery.html, certifications.html, learning-centre.html, testimonials.html, search.html.
Added shared features.css and tazat-features.js for responsive cards, local search, equipment category filtering, compare selection and a learning quiz.
All added interactions run in the browser only. No backend, database, login, real certificate verification, live customer reviews or cross-device storage has been added.
Replace demo text, sample images and placeholders with verified company information and approved customer/team content before publishing.


FRONTEND EXPANSION (NOV 2026)
New pages: clients.html, projects.html, team.html, gallery.html, certifications.html, learning-centre.html, testimonials.html, search.html.
Added shared features.css and tazat-features.js for responsive cards, local search, equipment category filtering, compare selection and a learning quiz.
All added interactions run in the browser only. No backend, database, login, real certificate verification, live customer reviews or cross-device storage has been added.
Replace demo text, sample images and placeholders with verified company information and approved customer/team content before publishing.
