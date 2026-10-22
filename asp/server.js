import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const { PORT = 4000, CORS_ORIGINS = "", OWNER_WHATSAPP_NUMBER = "" } = process.env;
// wa.me needs digits only, with country code, no "+" (e.g. 918946086668). Placeholder values are ignored.
const ownerNumber = /^\d{10,15}$/.test(OWNER_WHATSAPP_NUMBER) ? OWNER_WHATSAPP_NUMBER : "";

const SERVICES = ["Residential Construction","Commercial Construction","Renovation and Remodelling","Interior Design","Exterior Design","Architectural and Building Planning","Vastu Consultation and Planning","Civil and Structural Work"];
const LOCATIONS = ["Madurai","Rajapalayam","Chennai","Bengaluru"];
const TYPES = ["Residential","Commercial","Renovation","Interior","Exterior","Other"];

// Storage: JSON-lines file for development. Swap load/save for MongoDB (or another database) in production,
// because most hosts delete local files.
fs.mkdirSync("data", { recursive: true });
const FILE = "data/enquiries.jsonl";
const load = () => (fs.existsSync(FILE) ? fs.readFileSync(FILE, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse) : []);
const save = (rows) => fs.writeFileSync(FILE, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");

const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
function validate(b) {
  const d = { name: clean(b.name, 80), phone: clean(b.phone, 20).replace(/[\s-]/g, ""), email: clean(b.email, 120).toLowerCase(),
    service: clean(b.service, 80), location: clean(b.location, 40), type: clean(b.type, 30),
    budget: clean(b.budget, 40), start: clean(b.start, 10), details: clean(b.details, 1500) };
  const e = {};
  if (d.name.length < 2) e.name = "Enter your full name.";
  if (!/^(\+91|0)?[6-9]\d{9}$/.test(d.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) e.email = "Enter a valid email address.";
  if (!SERVICES.includes(d.service)) e.service = "Choose a service.";
  if (!LOCATIONS.includes(d.location)) e.location = "Choose a location.";
  if (!TYPES.includes(d.type)) e.type = "Choose a project type.";
  if (d.start && !/^\d{4}-\d{2}-\d{2}$/.test(d.start)) e.start = "Invalid date.";
  if (d.details.length < 10) e.details = "Describe your project in at least 10 characters.";
  return { d, e };
}

const app = express();
app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: { directives: {
  defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'"], scriptSrcAttr: ["'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], fontSrc: ["https://fonts.gstatic.com"],
  imgSrc: ["'self'", "data:", "https:"], connectSrc: ["'self'"], formAction: ["'self'"] } } }));
app.use(cors({ origin: CORS_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean), methods: ["GET", "POST"] }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dir, "public")));

// Public, non-secret settings for the website. The owner number is meant to be visible to customers.
app.get("/api/config", (_q, r) => r.json({ ownerWhatsapp: ownerNumber }));
app.get("/api/health", (_q, r) => r.json({ ok: true, whatsappNumberConfigured: Boolean(ownerNumber) }));

app.post("/api/enquiries", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false,
  message: { message: "Too many enquiries from this connection. Please try again later or call us." } }), (req, res) => {
  if (req.body?.website) return res.status(200).json({ message: "Your enquiry has been saved." }); // honeypot: silently drop
  const { d, e } = validate(req.body || {});
  if (Object.keys(e).length) return res.status(400).json({ message: "Please check the form and try again.", errors: e });
  try {
    const rows = load();
    const hash = crypto.createHash("sha256").update(d.phone + d.details).digest("hex");
    const dup = rows.find((r) => r.hash === hash && Date.now() - r.createdAt < 10 * 60 * 1000);
    if (dup) return res.status(200).json({ id: dup.id, duplicate: true, message: "This enquiry is already saved." }); // safe retry
    const row = { id: crypto.randomUUID(), hash, createdAt: Date.now(), ...d };
    rows.push(row); save(rows);
    res.status(201).json({ id: row.id, message: "Your enquiry has been saved." });
  } catch (err) {
    console.error("Saving enquiry failed:", err?.message);
    res.status(500).json({ message: "We couldn’t save your enquiry. Your details are still in the form, so please try again." });
  }
});

app.use((err, _q, res, _n) => { console.error("Unhandled error", err?.message); res.status(500).json({ message: "Something went wrong. Please try again." }); });
app.listen(PORT, () => console.log(`Website and API on http://localhost:${PORT}. Owner WhatsApp number ${ownerNumber ? "configured" : "NOT configured"}`));
