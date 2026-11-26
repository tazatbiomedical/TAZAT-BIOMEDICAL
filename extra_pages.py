# ---- extra pages: blog, locations, booking, tracker, reminders, SEO files ----
import json
PUB = "2026-11-18"
POSTS = [
("why-calibrate-medical-equipment","Why Medical Equipment Calibration Matters","Safety","Accuracy drifts with use. Here is why regular calibration protects patients and hospital records.",
 [("What calibration does","Calibration compares a device against a traceable reference and corrects or documents any difference. A monitor, pump or ventilator can look normal while its readings slowly drift."),
  ("Why it matters for patients","Clinical decisions depend on numbers: delivered energy, flow rate, tidal volume, pressure. When those numbers are off, treatment can be affected, so calibration is a patient-safety activity, not paperwork."),
  ("When to calibrate","Follow the manufacturer's interval and your risk class, and also after major repairs, relocation, or a suspected fault. Keep every certificate and calibration sticker in the equipment history."),
  ("Records that help audits","A simple asset register, dated certificates, electrical safety reports and maintenance logs make hospital audits much easier.")]),
("cpap-vs-bipap","CPAP vs BiPAP: What Is the Difference?","Respiratory","Both support breathing with air pressure, but they work differently. A simple explainer.",
 [("CPAP","CPAP delivers one continuous pressure level to help keep the airway open, commonly used for obstructive sleep apnoea."),
  ("BiPAP","BiPAP uses two pressure levels, a higher one while breathing in and a lower one while breathing out. It is often used where more breathing support is needed."),
  ("Which one do you need?","That is a medical decision. Your doctor selects the device and pressure settings from your diagnosis or sleep study."),
  ("Renting vs buying","Rental helps for short-term needs, trials, or post-discharge care. Tazat supports setup, mask fitting and basic operating guidance. See our R2 Crew page for rental plans.")]),
("how-often-calibrate-hospital-equipment","How Often Should Hospital Equipment Be Calibrated?","Calibration","A practical, risk-based way to plan calibration cycles for ICU, OT and ward equipment.",
 [("Start with risk","Life-support and emergency devices such as ventilators, defibrillators and anaesthesia machines are usually checked more often (commonly every 6 months) than lower-risk devices (commonly every 12 months)."),
  ("Follow the manufacturer","The manufacturer's service manual is the primary reference. Your biomedical team can tighten, but should not loosen, that interval without justification."),
  ("Calibrate after events","Repairs, drops, relocation, firmware or sensor replacement, and unusual readings should all trigger an extra check."),
  ("Use reminders","Our Calibration Reminder tool tracks due dates and exports calendar alerts so nothing is missed.")]),
("amc-vs-cmc-hospitals","AMC vs CMC: Choosing a Maintenance Contract","Maintenance","Understand what each contract type usually covers before you sign.",
 [("AMC","An Annual Maintenance Contract usually covers scheduled preventive maintenance visits and breakdown support. Spare parts are often charged separately."),
  ("CMC","A Comprehensive Maintenance Contract typically also covers spare parts, so repair costs are more predictable. It costs more upfront."),
  ("What to compare","Check visit frequency, response time, parts covered, consumables, exclusions, replacement units and the documentation you receive."),
  ("Ask for a proposal","Share your equipment list and we will recommend a suitable plan for your facility.")]),
("half-vs-full-channel-sleep-study","Half vs Full Channel Sleep Study Explained","Sleep Study","What the two study types generally mean, and why your doctor chooses.",
 [("The basic idea","A sleep study records signals during sleep to help assess conditions such as sleep apnoea. A half-channel study generally records fewer signals; a full-channel study records more."),
  ("Who decides","Your doctor recommends the type based on symptoms and history. Tazat offers both with a report included."),
  ("Before the study","Bring your doctor's reference, follow the instructions you are given, and book an appointment through our Book Appointment page."),
  ("After the study","The report is shared for your doctor's review, who will advise on treatment such as CPAP or BiPAP titration.")]),
("home-oxygen-concentrator-checklist","Renting a Home Oxygen Concentrator: A Checklist","Respiratory","Questions to ask before oxygen equipment comes home.",
 [("Get the prescription right","Oxygen flow and duration are set by your doctor. Do not change settings on your own."),
  ("Check the equipment","Ask about flow range, purity checks, filters, alarms and what happens if the unit faults. Tazat provides pre-checked units with technical support."),
  ("Plan for power and safety","Keep a backup plan for power cuts, keep the unit ventilated, and keep it away from flames, smoking and heat sources."),
  ("Know who to call","Keep the support number handy for troubleshooting and replacement.")])]
for slug_, t, tag, sm, secs in POSTS:
    body = "".join(f"<h2>{h}</h2><p>{p}</p>" for h, p in secs)
    schema = {"@context":"https://schema.org","@type":"Article","headline":t,"datePublished":PUB,"author":{"@type":"Organization","name":"Tazat Biomedical"},"publisher":{"@type":"Organization","name":"Tazat Biomedical"},"description":sm}
    pages["blog-"+slug_] = shell("blog", t, sm, f'<article class="article"><span class="tag">{tag.upper()}</span><p class="meta">Published {PUB} · Tazat Biomedical</p><p><b>{sm}</b></p>{body}<div class="note">General information only, not medical advice. Always follow your doctor\'s and the manufacturer\'s instructions.</div><br><div class="row-actions"><a class="btn btn-primary" href="contact.html">Ask our team</a><a class="btn btn-outline" target="_blank" rel="noopener" href="https://wa.me/?text={t.replace(" ","%20")}%20-%20{SITE}/blog-{slug_}.html">Share on WhatsApp</a><a class="btn btn-outline" href="blog.html">← All articles</a></div></article>', None, file=f"blog-{slug_}.html", schema=schema, og_type="article")
tags = sorted({p[2] for p in POSTS})
pages["blog"] = shell("blog", "Blog & Knowledge", "Biomedical equipment articles: calibration, CPAP vs BiPAP, AMC, sleep study and oxygen care from Tazat Biomedical.",
 sec("Articles &amp; guides","KNOWLEDGE",'<input class="search-inline" id="blogSearch" type="search" placeholder="Search articles..."><div class="chips" id="blogTags" style="margin-bottom:18px"><span data-tag="">All</span>'+"".join(f'<span data-tag="{t}" style="cursor:pointer">{t}</span>' for t in tags)+'</div><div class="grid-3" id="blogGrid">'+"".join(f'<a class="card post-card" data-tag="{t}" data-text="{ti.lower()} {sm.lower()}" href="blog-{sl}.html"><span class="tag">{t.upper()}</span><h3>{ti}</h3><p>{sm}</p><span class="text-link">Read article →</span></a>' for sl,ti,t,sm,_ in POSTS)+'</div><p class="empty-state hidden" id="blogEmpty">No articles found.</p>') + cta(),
 ("Blog &amp; Knowledge","Practical guides for hospitals, clinics and home-care patients.","about"))

# ---- location pages ----
LOC = {"madurai":("Madurai","Dindigul,Sivagangai,Virudhunagar,Ramanathapuram"),"sivagangai":("Sivagangai","Madurai,Ramanathapuram,Virudhunagar,Tiruchirappalli"),"karur":("Karur","Tiruchirappalli,Dindigul,Salem,Coimbatore")}
for key,(city,near) in LOC.items():
    q = f"Tazat Biomedical {city} Tamil Nadu"
    faq_l = [(f"Do you serve hospitals in {city}?",f"Yes. Our {city} hub supports government and private hospitals, clinics, diagnostic centres, dialysis centres and home-care patients in and around {city}."),(f"Can I rent a CPAP or oxygen concentrator in {city}?","Yes, subject to availability. Enquire with your requirement and our R2 crew will confirm."),(f"How do I book calibration in {city}?","Use the Enquire page or WhatsApp us. Our C1 crew will confirm the visit schedule.")]
    schema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":a,"acceptedAnswer":{"@type":"Answer","text":b}} for a,b in faq_l]}
    pages[key] = shell(key, f"{city} Hub – Calibration, Rental &amp; Sales", f"Biomedical equipment calibration, respiratory rental, sales and AMC in {city}, Tamil Nadu by Tazat Biomedical.",
     sec(f"Biomedical services in {city}","LOCAL HUB",f'''<div class="split"><div><p>Our {city} hub supports hospitals, clinics, diagnostic centres, dialysis centres, nursing homes and home-care patients with calibration, respiratory rental, equipment sales, AMC and sleep study support.</p>{ul(["C1 Crew: on-site calibration and electrical safety testing","R2 Crew: CPAP/BiPAP, oxygen and monitor rental","Equipment sales and AMC proposals","Sleep study appointments","BME training and workshops"])}<div class="row-actions"><a class="btn btn-primary" href="contact.html?service=Calibration&district={city}">Request a quote</a><a class="btn btn-outline" href="book.html">Book appointment</a><a class="btn btn-outline" target="_blank" rel="noopener" href="{WA}">WhatsApp</a></div></div><iframe class="map-frame" loading="lazy" title="Map of {city}" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q={q.replace(" ","+")}&output=embed"></iframe></div>''') +
     sec("Nearby districts we also cover","COVERAGE",'<div class="chips">'+"".join(f"<span>{d}</span>" for d in near.split(","))+"</div>") +
     sec("Customer reviews","GOOGLE REVIEWS",'<div class="card" data-reviews><p>Worked with Tazat? Your feedback helps other hospitals and families.</p><a class="btn btn-primary" data-review target="_blank" rel="noopener" href="#">⭐ Review us on Google</a> <a class="btn btn-outline" data-maps target="_blank" rel="noopener" href="#">Open in Google Maps</a></div>') +
     sec(f"{city} FAQ","FAQ",'<div class="faq">'+"".join(f"<details><summary>{a}</summary><p>{b}</p></details>" for a,b in faq_l)+"</div>") + cta(),
     (f"{city} Hub","Calibration, rental, sales and AMC for healthcare facilities in "+city+".","about"), schema=schema)

# ---- booking ----
pages["book"] = shell("book","Book Appointment","Book a sleep study, calibration visit, rental setup or BME training session with Tazat Biomedical.",
 sec("Request an appointment","BOOKING",f'''<div class="contact-grid"><div><p>Pick a service, date and preferred time. Our team will call or WhatsApp to confirm the slot. We work Monday–Saturday, 8 AM – 8 PM.</p>{ul(["Half Channel Sleep Study – ₹3,000 (with report)","Full Channel Sleep Study – ₹8,000 (with report)","On-site calibration visit","Rental setup / equipment demo","BME training session"])}<p class="credential-note" style="text-align:left">Time slots are preferences, not confirmed bookings, until our team confirms.</p></div>
<form id="bookForm" class="enquiry-form"><label>Service <span class="req">*</span><select name="Service" required><option value="">Select service</option><option>Sleep Study – Half Channel (₹3,000)</option><option>Sleep Study – Full Channel (₹8,000)</option><option>Calibration site visit</option><option>Rental setup / demo</option><option>BME training session</option></select></label>
<div class="form-row"><label>Name <span class="req">*</span><input name="Name" required></label><label>Phone <span class="req">*</span><input name="Phone" required pattern="[0-9+() -]{{8,}}"></label></div>
<div class="form-row"><label>Facility / Doctor reference<input name="Facility"></label><label>District<select name="District"><option>Madurai</option><option>Sivagangai</option><option>Karur</option><option>Other</option></select></label></div>
<label>Preferred date <span class="req">*</span><input name="Date" id="bookDate" type="date" required></label>
<label>Preferred time <span class="req">*</span></label><div class="slots" id="slots"></div><input type="hidden" name="Time" id="bookTime">
<label>Notes<textarea name="Notes" rows="3"></textarea></label><button class="btn btn-primary" type="submit">Request appointment →</button></form></div>''') + cta(), ("Book an Appointment","Sleep study, calibration visit, rental setup or training — choose your slot.","sleep"))

# ---- tracker ----
pages["track"] = shell("track","Track Enquiry","Check your Tazat Biomedical enquiry or appointment using your reference code.",
 sec("Track your request","ENQUIRY TRACKER",'''<div class="grid-2"><div class="card"><h3>Enter your reference code</h3><p>You received it after submitting a form, for example TAZ-TN-1234.</p><form id="trackForm" class="rem-form" style="grid-template-columns:1fr auto;box-shadow:none;border:0;padding:0"><label>Reference<input id="trackRef" placeholder="TAZ-TN-0000" required></label><button class="btn btn-primary" type="submit">Check</button></form><div id="trackOut" style="margin-top:16px"></div>
<p class="credential-note" style="text-align:left">Requests are remembered on this device. Final status is always confirmed by our team by call/WhatsApp.</p></div><div class="card"><h3>Your recent requests (this device)</h3><div id="trackList"><p class="empty-state">No requests yet.</p></div></div></div>''') + cta(), ("Track Enquiry","Look up your request using your TAZ-TN reference code.","about"))

# ---- reminders ----
pages["reminders"] = shell("reminders","Calibration Reminder","Free calibration due-date tracker with calendar reminders for hospital and clinic equipment.",
 sec("Never miss a calibration due date","CALIBRATION REMINDER",'''<p class="section-intro">Add your equipment and last calibration date. We calculate the next due date and flag overdue items. Download calendar reminders (alert 14 days before) for Google, Apple or Outlook calendar, or send the list to Tazat to schedule calibration.</p>
<form id="remForm" class="rem-form"><label>Equipment<input name="eq" list="eqList" required placeholder="e.g. ICU ventilator"></label><label>Asset tag / location<input name="tag" placeholder="ICU-03"></label><label>Last calibrated<input name="last" type="date" required></label><label>Cycle<select name="cycle"><option value="3">3 months</option><option value="6">6 months</option><option value="12" selected>12 months</option></select></label><button class="btn btn-primary" type="submit">Add</button></form><datalist id="eqList"></datalist>
<div class="row-actions"><button class="btn btn-outline" id="icsBtnAll">📅 Download calendar reminders (.ics)</button><button class="btn btn-outline" id="csvBtn">⬇ Download CSV</button><button class="btn btn-primary" id="sendRemBtn">Send list to Tazat</button><button class="btn btn-outline" id="clearRem">Clear all</button></div>
<div class="table-wrap"><table class="data" id="remTable"><tr><th>Equipment</th><th>Asset</th><th>Last</th><th>Next due</th><th>Status</th><th></th></tr></table></div><p class="credential-note" style="text-align:left">Data is saved only in this browser. Follow manufacturer intervals; defaults here are general guidance.</p>''') + cta(), ("Calibration Reminder","Track due dates and get calendar alerts for every device.","monitor"))

# ---- home additions ----
home_extra = sec("Hubs &amp; tools","LOCATIONS &amp; TOOLS",'<div class="grid-4 tools-row">'+"".join(f'<a class="card" href="{u}"><span class="ico">{i}</span><h3>{t}</h3><p>{d}</p><span class="text-link">Open →</span></a>' for u,i,t,d in [("madurai.html","📍","Madurai Hub","Calibration, rental and sales"),("sivagangai.html","📍","Sivagangai Hub","Field crews and support"),("karur.html","📍","Karur Hub","Service hub for Karur region"),("book.html","📅","Book Appointment","Sleep study, visits, training"),("reminders.html","⏰","Calibration Reminder","Due dates with calendar alerts"),("track.html","🔎","Track Enquiry","Check status by reference code"),("blog.html","📰","Blog &amp; Knowledge","Guides on calibration, CPAP, AMC"),("resources.html","📋","Resources","Frequency guide &amp; checklist")])+'</div>')
pages["index"] = pages["index"].replace('<section class="cta-band">', home_extra + '<section class="cta-band">', 1)
pages["contact"] = pages["contact"].replace('<section class="section container"><div class="section-title-row"><div><p class="eyebrow">FAQ', '<section class="section container"><iframe class="map-frame" loading="lazy" title="Tazat service area map" src="https://www.google.com/maps?q=Madurai,+Tamil+Nadu&output=embed"></iframe><div class="row-actions"><a class="btn btn-outline" data-review target="_blank" rel="noopener" href="#">⭐ Review us on Google</a><a class="btn btn-outline" data-maps target="_blank" rel="noopener" href="#">Open in Google Maps</a></div></section><section class="section container"><div class="section-title-row"><div><p class="eyebrow">FAQ', 1)

# ---- SEO files ----
urls = [f"{k}.html" for k in pages]
open("sitemap.xml","w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"".join(f"<url><loc>{SITE}/{u if u!='index.html' else ''}</loc><lastmod>{PUB}</lastmod></url>\n" for u in urls)+"</urlset>\n")
open("robots.txt","w").write(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")
