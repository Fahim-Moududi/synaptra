import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = path.join(root, "src", "content.json");
const docxPath = path.join(root, "content", "site.docx");

function p(text, heading) {
  return new Paragraph({
    heading,
    children: [new TextRun({ text, font: "Calibri" })],
  });
}

function line(text) {
  return new Paragraph({ children: [new TextRun({ text, font: "Calibri", size: 22 })] });
}

async function exportDocx() {
  const site = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const children = [
    p("SYNAPTRA content", HeadingLevel.TITLE),
    line("Edit values after each label. Keep the labels. Then run: npm run content"),
    p("Dates", HeadingLevel.HEADING_1),
    line(`eventDate: ${site.eventDate}`),
    line(`eventDateLabel: ${site.eventDateLabel}`),
    line(`registerCloseLabel: ${site.registerCloseLabel}`),
    line(`startTime: ${site.startTime}`),
    line(`venue: ${site.venue}`),
    line(`fee: ${site.fee}`),
    p("Hero", HeadingLevel.HEADING_1),
    ...Object.entries(site.hero)
      .filter(([k]) => k !== "motto")
      .map(([k, v]) => line(`${k}: ${v}`)),
    line(`motto: ${site.hero.motto.join(" | ")}`),
    p("About", HeadingLevel.HEADING_1),
    line(`title: ${site.about.title}`),
    line(`quote: ${site.about.quote}`),
    ...site.about.paragraphs.map((text, i) => line(`paragraph${i + 1}: ${text}`)),
    p("Events", HeadingLevel.HEADING_1),
    ...site.events.flatMap((event) => [
      p(event.id, HeadingLevel.HEADING_2),
      line(`title: ${event.title}`),
      line(`kind: ${event.kind}`),
      line(`code: ${event.code}`),
      line(`blurb: ${event.blurb}`),
      line(`tags: ${event.tags.join(" | ")}`),
      line(`brief: ${site.briefs[event.id]?.lead || ""}`),
    ]),
    p("Schedule", HeadingLevel.HEADING_1),
    ...site.schedule.map((item) => line(`${item.time} | ${item.title} | ${item.text}`)),
    p("Venue", HeadingLevel.HEADING_1),
    line(`lead: ${site.venue.lead}`),
    ...site.venue.points.map((item) => line(`- ${item}`)),
    p("FAQ", HeadingLevel.HEADING_1),
    ...site.faqs.map((item) => line(`Q: ${item.q} | A: ${item.a}`)),
  ];

  const doc = new Document({ sections: [{ children }] });
  fs.mkdirSync(path.dirname(docxPath), { recursive: true });
  fs.writeFileSync(docxPath, await Packer.toBuffer(doc));
  console.log(`Wrote ${docxPath}`);
}

function setPath(obj, dotted, value) {
  const keys = dotted.split(".");
  let cursor = obj;
  keys.slice(0, -1).forEach((key) => {
    if (!(key in cursor)) cursor[key] = {};
    cursor = cursor[key];
  });
  cursor[keys.at(-1)] = value;
}

async function importDocx(file = docxPath) {
  if (!fs.existsSync(file)) {
    console.error(`Missing ${file}. Put your Word file there, or pass a path.`);
    process.exit(1);
  }
  const site = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const { value } = await mammoth.extractRawText({ path: file });
  const dump = path.join(root, "content", "last-import.txt");
  fs.writeFileSync(dump, value);
  value.split(/\r?\n/).forEach((raw) => {
    const lineText = raw.trim();
    const match = lineText.match(/^([A-Za-z][\w.]*):\s*(.+)$/);
    if (!match) return;
    const [, key, val] = match;
    const map = {
      eventDate: "eventDate",
      eventDateLabel: "eventDateLabel",
      registerCloseLabel: "registerCloseLabel",
      startTime: "startTime",
      venue: "venue",
      fee: "fee",
      college: "hero.college",
      meta: "hero.meta",
      dept: "hero.dept",
      kicker: "hero.kicker",
      tagline: "hero.tagline",
      dek: "hero.dek",
      finePrint: "hero.finePrint",
      title: "about.title",
      quote: "about.quote",
      paragraph1: "about.paragraphs.0",
      paragraph2: "about.paragraphs.1",
      lead: "venue.lead",
    };
    if (key === "motto") site.hero.motto = val.split("|").map((s) => s.trim());
    else if (map[key]) setPath(site, map[key], val);
    else if (key.startsWith("paragraph") && site.about.paragraphs) {
      const i = Number(key.replace("paragraph", "")) - 1;
      if (i >= 0) site.about.paragraphs[i] = val;
    }
  });

  const eventBlocks = value.split(/\n(?=paper|expo|uiux|quiz|auction)\n/i);
  site.events.forEach((event) => {
    const block = value.split(event.id)[1]?.split(/\n(?=[a-z]{3,}:)/i)?.[0] || "";
    const grab = (label) => {
      const found = value.match(new RegExp(`${event.id}[\\s\\S]*?${label}:\\s*(.+)`));
      return found?.[1]?.trim();
    };
    const title = grab("title");
    const blurb = grab("blurb");
    const brief = grab("brief");
    if (title) event.title = title;
    if (blurb) event.blurb = blurb;
    if (brief && site.briefs[event.id]) site.briefs[event.id].lead = brief;
    void block;
    void eventBlocks;
  });

  if (site.registerCloseLabel) {
    site.registerCloseStat = site.registerCloseLabel.replace(" October 2026", " Oct").replace(/^0/, "");
    site.registerCloseShort = site.registerCloseLabel.replace(/(\d+) October (\d+)/, (_, d, y) => `${d.padStart(2, "0")}.10.${y}`);
    site.hero.finePrint = `Registration closes ${site.registerCloseLabel}. College ID required on campus.`;
    site.registerLead = `Last date ${site.registerCloseLabel}. Fee ${site.feeChip || site.fee} per participant. You will receive a SYN ID on this device after submit.`;
    if (site.stats?.[3]) site.stats[3][0] = site.registerCloseStat;
  }
  if (site.eventDateLabel) {
    site.eventDateShort = site.eventDateLabel.replace(/(\d+) October (\d+)/, (_, d, y) => `${d.padStart(2, "0")}.10.${y}`);
  }

  fs.writeFileSync(jsonPath, `${JSON.stringify(site, null, 2)}\n`);
  console.log(`Updated ${jsonPath}`);
  console.log(`Raw text saved to ${dump}`);
}

const cmd = process.argv[2] || "import";
const fileArg = process.argv[3];
if (cmd === "export") await exportDocx();
else await importDocx(fileArg || docxPath);
