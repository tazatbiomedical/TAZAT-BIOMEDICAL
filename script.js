const equipmentData = {
  "Patient Monitoring": ["Multiparameter monitors","ECG machines","SpO₂ / pulse oximeters","NIBP monitors","Temperature monitors","Capnography / EtCO₂ monitors","Central monitoring systems"],
  "Critical Care & ICU": ["Ventilators","BiPAP machines","CPAP machines","High-flow oxygen therapy equipment","Anaesthesia workstations","Infusion pumps","Syringe pumps","Defibrillators","Patient warmers"],
  "Respiratory Equipment": ["Ventilators","CPAP","BiPAP","Oxygen concentrators","Respiratory flow meters","Gas flow meters","Oxygen analysers","Pressure gauges","Suction machines","Spirometers","Pulmonary function testing equipment"],
  "Operation Theatre & Anaesthesia": ["Anaesthesia machines","Ventilators","Electrosurgical units / cautery","Defibrillators","Patient monitors","Surgical suction units","Temperature monitoring equipment"],
  "Infusion & Medication Delivery": ["Infusion pumps","Syringe pumps","Volumetric pumps","PCA pumps","Enteral feeding pumps"],
  "Neonatal & Paediatric": ["Incubators","Radiant warmers","Neonatal ventilators","Phototherapy units","Neonatal monitors","Infant weighing scales","Apnoea monitors"],
  "Laboratory": ["Centrifuges","Micropipettes","Laboratory balances","Temperature-controlled equipment","Incubators","Water baths","Blood gas analysers","pH meters","Refrigerator / freezer temperature monitoring systems"],
  "Diagnostic Imaging": ["X-ray equipment","CT equipment","Ultrasound systems","Mammography equipment","Dental X-ray equipment"],
  "Dialysis": ["Haemodialysis machines","Dialysis pressure monitoring systems","Conductivity measurement systems","Temperature measurement systems","Weighing systems"],
  "Other Hospital Equipment": ["Medical weighing scales","BP apparatus","Thermometers","ECG simulators","Electrical safety testers","Medical gas flow / pressure measurement equipment","Suction pressure equipment","Laboratory analyser / biochemistry","Blood bank equipment"]
};
const allEquipment = Object.entries(equipmentData).flatMap(([category, items]) => items.map(name => ({category,name})));
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const WA = "917200925055", MAIL = "support@tazat.co.in";
const on = (sel, ev, fn) => { const el = $(sel); if (el) el.addEventListener(ev, fn); };
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const mail = (subj, body) => `mailto:${MAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
const refCode = () => "TAZ-TN-" + String(Math.floor(1000 + Math.random() * 9000));

/* equipment directory (calibration page) */
const cycles = {"Critical Care & ICU":"Every 6 months","Operation Theatre & Anaesthesia":"Every 6 months","Neonatal & Paediatric":"Every 6 months","Patient Monitoring":"Every 12 months"};
function showEquipment(category = "all", query = "") {
  const box = $("#equipmentResults"); if (!box) return;
  const q = query.trim().toLowerCase();
  const matches = allEquipment.filter(i => (category === "all" || i.category === category) && (!q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)));
  box.innerHTML = matches.length ? matches.map(i => `<button class="equipment-chip" data-cat="${i.category}" data-name="${i.name}">${i.name}</button>`).join("") : `<p class="empty-state">No matching equipment found. Please contact us to confirm support availability.</p>`;
  $("#resultCount").textContent = `${matches.length} item${matches.length === 1 ? "" : "s"} found`;
}
$$(".category-card").forEach(b => b.addEventListener("click", () => {
  $$(".category-card").forEach(x => x.classList.remove("active")); b.classList.add("active");
  showEquipment(b.dataset.category, $("#calibrationSearch").value);
}));
on("#searchBtn", "click", () => { $$(".category-card").forEach(x => x.classList.toggle("active", x.dataset.category === "all")); showEquipment("all", $("#calibrationSearch").value); });
on("#calibrationSearch", "keydown", e => { if (e.key === "Enter") $("#searchBtn").click(); });
on("#equipmentResults", "click", e => {
  const c = e.target.closest(".equipment-chip"); if (!c) return;
  const cyc = cycles[c.dataset.cat] || "Every 12 months";
  openModal(`<h3>${c.dataset.name}</h3><p><b>Category:</b> ${c.dataset.cat}<br><b>Recommended calibration:</b> ${cyc}<br><b>Safety standard:</b> IEC 60601-1 (where applicable)</p><p>Final scope depends on model and specification. Our C1 crew will confirm the test parameters.</p><a class="btn btn-primary" href="contact.html?service=Calibration&item=${encodeURIComponent(c.dataset.name)}">Request calibration quote</a>`);
});
showEquipment("all");

/* rental / sleep tabs */
$$(".rental-tab").forEach(b => b.addEventListener("click", () => {
  $$(".rental-tab").forEach(x => x.classList.toggle("active", x === b));
  $("#rentalPanel").classList.toggle("hidden", b.dataset.rental !== "rental");
  $("#sleepPanel").classList.toggle("hidden", b.dataset.rental !== "sleep");
}));
if (location.hash === "#sleep") { const t = $('[data-rental="sleep"]'); if (t) t.click(); }

/* modal */
const backdrop = $("#modalBackdrop");
function openModal(html) { $("#modalContent").innerHTML = html; backdrop.classList.remove("hidden"); }
function closeModal() { backdrop.classList.add("hidden"); $("#modalContent").innerHTML = ""; }
on("#modalClose", "click", closeModal);
backdrop?.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
const CFG = window.TAZAT_CONFIG || {};
function saveReq(ref, subject, body) {
  try { const l = JSON.parse(localStorage.getItem("tazat_enq") || "[]"); l.unshift({ref, subject, body, date: new Date().toISOString(), status: "Received"}); localStorage.setItem("tazat_enq", JSON.stringify(l.slice(0, 50))); } catch (e) {}
}
async function done(subject, body, extra = "") {
  const ref = refCode(); saveReq(ref, subject, body);
  let sent = false;
  if (CFG.FORM_ENDPOINT) {
    try { await fetch(CFG.FORM_ENDPOINT, {method: "POST", mode: "no-cors", body: new URLSearchParams({ref, subject, details: body, page: location.pathname, time: new Date().toISOString()})}); sent = true; } catch (e) {}
  }
  openModal(`<h3>Request Received</h3><p>${sent ? "Your request has been sent to our team." : "Your email app will open with the details."} Please keep this reference:</p><div class="ref">${ref}</div><p>Our field coordinator will contact you shortly.</p><a class="btn btn-primary" target="_blank" rel="noopener" href="${wa(subject + " – Ref " + ref + "\n" + body)}">Also send via WhatsApp</a><a class="btn btn-outline" style="margin-top:8px" href="track.html?ref=${ref}">Track this request</a>${extra}`);
  if (!sent) window.location.href = mail(subject + " [" + ref + "]", body);
  return ref;
}
const fd = f => Object.fromEntries(new FormData(f).entries());
const lines = d => Object.entries(d).map(([k, v]) => `${k}: ${v}`).join("\n");

on("#bookSleepBtn", "click", () => {
  openModal(`<h3>Sleep Study Appointment</h3><p>Submit your details. The team will confirm date and availability.</p><form id="sleepForm"><label>Patient name<input name="Name" required></label><label>Doctor reference<input name="Doctor"></label><label>Phone<input name="Phone" required pattern="[0-9+() -]{8,}"></label><label>Preferred date<input name="Date" type="date" required min="${new Date().toISOString().slice(0, 10)}"></label><label>Study type<select name="Study" required><option value="">Choose study</option><option>Half Channel – ₹3,000 (with report)</option><option>Full Channel – ₹8,000 (with report)</option></select></label><button class="btn btn-primary" type="submit">Send appointment request</button></form>`);
  $("#sleepForm").addEventListener("submit", e => { e.preventDefault(); done("Sleep Study Appointment Request", lines(fd(e.target))); });
});
on("#bundleBtn", "click", () => {
  openModal(`<h3>Calibration Bundle Offer</h3><p>Share your facility name and equipment list for a customised quotation.</p><form id="bundleForm"><label>Facility name<input name="Facility" required></label><label>Contact number<input name="Phone" required></label><label>Equipment details<textarea name="Equipment" rows="3"></textarea></label><button class="btn btn-primary" type="submit">Request bundle quotation</button></form>`);
  $("#bundleForm").addEventListener("submit", e => { e.preventDefault(); done("Calibration Bundle Enquiry", lines(fd(e.target))); });
});
$$(".edu-option").forEach(b => b.addEventListener("click", () => {
  openModal(`<h3>${b.dataset.course}</h3><p>Enquire about ${b.dataset.course.toLowerCase()} with Tazat Biomedical.</p><form id="courseForm"><label>Your name<input name="Name" required></label><label>Phone<input name="Phone" required></label><label>Email<input name="Email" type="email"></label><button class="btn btn-primary" type="submit">Send training enquiry</button></form>`);
  $("#courseForm").addEventListener("submit", e => { e.preventDefault(); done(b.dataset.course + " Enquiry", lines(fd(e.target))); });
}));
on("#salesSearchBtn", "click", () => {
  const q = $("#salesSearch").value.trim();
  $("#salesResult").innerHTML = q ? `Enquiry item: <b>${q.replace(/</g, "&lt;")}</b>. <a href="contact.html?service=Sales%20%2F%20Supply&item=${encodeURIComponent(q)}" style="text-decoration:underline">Request latest quotation →</a>` : "Enter an equipment name or brand to search.";
});
on("#salesSearch", "keydown", e => { if (e.key === "Enter") $("#salesSearchBtn").click(); });

/* main quote form + prefill */
const qf = $("#enquiryForm");
if (qf) {
  const p = new URLSearchParams(location.search);
  if (p.get("service")) qf.service.value = p.get("service");
  if (p.get("item")) qf.item.value = p.get("item");
  qf.addEventListener("submit", e => { e.preventDefault(); const d = fd(qf); done("Website enquiry – " + d.service, lines(d)); });
}

/* rental cost estimator */
const rates = {cpap: [500, 3000, 5500, 5000], oxygen: [500, 2500, 5000, 5000], monitor: [500, 3500, 6000, 5000], vent: [1000, 25500, 45000, 30000]};
function estimate() {
  const r = rates[$("#estItem").value], days = Math.max(1, +$("#estDays").value || 1), best = [0];
  for (let d = 1; d <= days; d++) best[d] = Math.min(best[d - 1] + r[0], d >= 15 ? best[d - 15] + r[1] : 1e9, d >= 30 ? best[d - 30] + r[2] : 1e9);
  $("#estOut").innerHTML = `<b>₹${best[days].toLocaleString("en-IN")}</b>rent for ${days} day(s) + ₹${r[3].toLocaleString("en-IN")} refundable advance*`;
}
if ($("#estItem")) { ["#estItem", "#estDays"].forEach(s => on(s, "input", estimate)); estimate(); }

/* common */
const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
on("#menuToggle", "click", () => { const open = $("#mainNav").classList.toggle("open"); $("#menuToggle").setAttribute("aria-expanded", String(open)); });
window.addEventListener("scroll", () => $("#toTop").classList.toggle("show", window.scrollY > 450));
on("#toTop", "click", () => window.scrollTo({top: 0, behavior: "smooth"}));

/* ===== calendar / download helpers ===== */
const pad = n => String(n).padStart(2, "0");
const ymd = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
function icsFile(events) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  return "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Tazat Biomedical//EN\r\n" + events.map((e, i) =>
    `BEGIN:VEVENT\r\nUID:${stamp}-${i}@tazat\r\nDTSTAMP:${stamp}\r\n${e.start.includes("T") ? "DTSTART:" : "DTSTART;VALUE=DATE:"}${e.start}\r\nSUMMARY:${e.title}\r\nDESCRIPTION:${e.desc || ""}\r\nBEGIN:VALARM\r\nTRIGGER:${e.alarm || "-P14D"}\r\nACTION:DISPLAY\r\nDESCRIPTION:${e.title}\r\nEND:VALARM\r\nEND:VEVENT`).join("\r\n") + "\r\nEND:VCALENDAR";
}
function download(name, text, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], {type})); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }
const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

/* ===== Google review / maps buttons ===== */
$$("[data-review]").forEach(el => { if (CFG.GOOGLE_REVIEW_URL) el.href = CFG.GOOGLE_REVIEW_URL; else el.style.display = "none"; });
$$("[data-maps]").forEach(el => { if (CFG.GOOGLE_MAPS_URL) el.href = CFG.GOOGLE_MAPS_URL; else el.style.display = "none"; });
const dd = $("#ddBtn"); if (dd) dd.addEventListener("click", () => dd.parentElement.classList.toggle("open"));
const qp = new URLSearchParams(location.search);
if (qf && qp.get("district")) { const o = [...qf.district.options].find(x => x.text.startsWith(qp.get("district"))); if (o) qf.district.value = o.value || o.text; }

/* ===== appointment booking ===== */
const bf = $("#bookForm");
if (bf) {
  const t = new Date(); t.setDate(t.getDate() + 1);
  $("#bookDate").min = t.toISOString().slice(0, 10);
  $("#bookDate").addEventListener("change", e => { /* 24×7 booking availability: all days are accepted. */ });
  const slots = []; for (let h = 8; h < 20; h++) slots.push(h);
  $("#slots").innerHTML = slots.map(h => `<button type="button" class="slot" data-h="${h}">${((h + 11) % 12) + 1}:00 ${h < 12 ? "AM" : "PM"}</button>`).join("");
  $("#slots").addEventListener("click", e => { const b = e.target.closest(".slot"); if (!b) return; $$(".slot").forEach(x => x.classList.toggle("sel", x === b)); $("#bookTime").value = b.textContent; b.dataset.sel = 1; });
  bf.addEventListener("submit", async e => {
    e.preventDefault();
    if (!$("#bookTime").value) { alert("Please choose a preferred time slot."); return; }
    const d = fd(bf), h = +$(".slot.sel").dataset.h;
    const extra = `<button class="btn btn-outline" style="margin-top:8px" id="icsOne">📅 Add to my calendar</button>`;
    const ref = await done("Appointment Request – " + d.Service, lines(d), extra);
    const start = d.Date.replace(/-/g, "") + "T" + pad(h) + "0000";
    const b = $("#icsOne"); if (b) b.addEventListener("click", () => download("tazat-appointment.ics", icsFile([{start, title: "Tazat: " + d.Service, desc: "Ref " + ref + " (preference – team will confirm)", alarm: "-PT2H"}]), "text/calendar"));
  });
}

/* ===== enquiry tracker ===== */
const tf = $("#trackForm");
if (tf) {
  const list = () => { try { return JSON.parse(localStorage.getItem("tazat_enq") || "[]"); } catch (e) { return []; } };
  const stages = ["Received", "Under review", "Scheduled", "Completed"];
  const show = ref => {
    const r = list().find(x => x.ref.toLowerCase() === ref.trim().toLowerCase());
    $("#trackOut").innerHTML = r
      ? `<b>${esc(r.ref)}</b> – ${esc(r.subject)}<br><small>Submitted ${new Date(r.date).toLocaleString()}</small><div class="timeline">${stages.map((s, i) => `<div class="${i === 0 ? "on" : ""}">${s}</div>`).join("")}</div><p style="font-size:12px">Our team will update you by call/WhatsApp as it moves ahead.</p><a class="btn btn-outline" target="_blank" rel="noopener" href="${wa("Hello, I'd like an update on my request " + r.ref)}">Ask for update on WhatsApp</a>`
      : `<p>Reference <b>${esc(ref)}</b> was not found on this device. If you submitted from another device, message us with your code.</p><a class="btn btn-outline" target="_blank" rel="noopener" href="${wa("Hello, I'd like an update on my request " + ref)}">Check on WhatsApp</a>`;
  };
  tf.addEventListener("submit", e => { e.preventDefault(); show($("#trackRef").value); });
  const l = list();
  if (l.length) $("#trackList").innerHTML = l.map(r => `<p style="font-size:12px;border-bottom:1px solid #f1e9ed;padding:8px 0"><a href="track.html?ref=${r.ref}" style="color:var(--maroon);font-weight:800">${esc(r.ref)}</a> · ${esc(r.subject)}<br><small>${new Date(r.date).toLocaleDateString()}</small></p>`).join("");
  if (qp.get("ref")) { $("#trackRef").value = qp.get("ref"); show(qp.get("ref")); }
}

/* ===== calibration reminders ===== */
const rf = $("#remForm");
if (rf) {
  const KEY = "tazat_cal";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
  const store = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  $("#eqList").innerHTML = [...new Set(allEquipment.map(i => i.name))].map(n => `<option value="${n}">`).join("");
  rf.eq.addEventListener("change", () => { const m = allEquipment.find(i => i.name.toLowerCase() === rf.eq.value.toLowerCase()); if (m) rf.cycle.value = (cycles[m.category] || "Every 12 months").includes("6") ? "6" : "12"; });
  rf.last.max = new Date().toISOString().slice(0, 10);
  const due = r => { const d = new Date(r.last + "T00:00"); d.setMonth(d.getMonth() + +r.cycle); return d; };
  const days = r => Math.ceil((due(r) - new Date().setHours(0, 0, 0, 0)) / 864e5);
  function render() {
    const rows = load().map((r, i) => ({...r, i, dd: days(r)})).sort((a, b) => a.dd - b.dd);
    $("#remTable").innerHTML = `<tr><th>Equipment</th><th>Asset</th><th>Last</th><th>Next due</th><th>Status</th><th></th></tr>` + (rows.length ? rows.map(r => `<tr><td>${esc(r.eq)}</td><td>${esc(r.tag || "–")}</td><td>${r.last}</td><td>${due(r).toLocaleDateString()}</td><td><span class="badge ${r.dd < 0 ? "b-over" : r.dd <= 30 ? "b-soon" : "b-ok"}">${r.dd < 0 ? "Overdue by " + -r.dd + "d" : r.dd <= 30 ? "Due in " + r.dd + "d" : "OK · " + r.dd + "d"}</span></td><td><button data-del="${r.i}" style="border:0;background:none;cursor:pointer;color:#b3261e">✕</button></td></tr>`).join("") : `<tr><td colspan="6" class="empty-state" style="padding:16px">No equipment added yet.</td></tr>`);
  }
  rf.addEventListener("submit", e => { e.preventDefault(); const a = load(); a.push(fd(rf)); store(a); rf.reset(); render(); });
  $("#remTable").addEventListener("click", e => { const b = e.target.closest("[data-del]"); if (!b) return; const a = load(); a.splice(+b.dataset.del, 1); store(a); render(); });
  on("#clearRem", "click", () => { if (confirm("Clear all equipment from this list?")) { store([]); render(); } });
  const need = () => { const a = load(); if (!a.length) alert("Add at least one equipment first."); return a; };
  on("#icsBtnAll", "click", () => { const a = need(); if (a.length) download("tazat-calibration-reminders.ics", icsFile(a.map(r => ({start: ymd(due(r)), title: `Calibration due: ${r.eq}${r.tag ? " (" + r.tag + ")" : ""}`, desc: "Book calibration with Tazat Biomedical " + PHONE_TXT}))), "text/calendar"); });
  on("#csvBtn", "click", () => { const a = need(); if (a.length) download("calibration-schedule.csv", "Equipment,Asset,Last calibrated,Cycle (months),Next due\n" + a.map(r => [r.eq, r.tag, r.last, r.cycle, due(r).toISOString().slice(0, 10)].map(v => `"${String(v || "").replace(/"/g, '""')}"`).join(",")).join("\n"), "text/csv"); });
  on("#sendRemBtn", "click", () => { const a = need(); if (a.length) done("Calibration schedule request", a.map(r => `${r.eq} | ${r.tag || "-"} | last ${r.last} | next due ${due(r).toISOString().slice(0, 10)}`).join("\n")); });
  render();
}
const PHONE_TXT = "+91 72009 25055";

/* ===== blog filter ===== */
const bg = $("#blogGrid");
if (bg) {
  let tag = "";
  const apply = () => { const q = $("#blogSearch").value.toLowerCase(); let n = 0; $$(".post-card", bg).forEach(c => { const ok = (!tag || c.dataset.tag === tag) && (!q || c.dataset.text.includes(q)); c.style.display = ok ? "" : "none"; n += ok; }); $("#blogEmpty").classList.toggle("hidden", n > 0); };
  on("#blogSearch", "input", apply);
  on("#blogTags", "click", e => { const c = e.target.closest("[data-tag]"); if (!c) return; tag = c.dataset.tag; apply(); });
}
