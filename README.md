# SYNAPTRA ’26

**Department of Computer Science and Business Systems**  
Syed Ammal Engineering College (Autonomous), Ramanathapuram

Official web presence for SYNAPTRA ’26 — a one-day technical and non-technical symposium.

> Where Ideas Connect, Innovation Takes Over.

**Live site:** [https://synaptra.vscale.in/](https://synaptra.vscale.in/)

---

## Overview

SYNAPTRA ’26 is hosted by CSBS on **16 October 2026** at the **EEE Seminar Hall**. The programme brings paper presentation, project expo, UI/UX design, quiz, and a business-idea auction onto one campus day.

This repository is the production frontend for the official site.

| | |
| --- | --- |
| Website | [synaptra.vscale.in](https://synaptra.vscale.in/) |
| Date | 16 October 2026, 9:00 AM IST |
| Venue | EEE Seminar Hall, SAEC, Ramanathapuram |
| Fee | ₹200 per participant (other colleges) |
| Registration deadline | 13 October 2026, 23:59 IST |
| Register | [Google Form](https://forms.gle/KoCb2iaz9hyn8Rxq9) |
| Instagram | [@csbs_dept](https://www.instagram.com/csbs_dept/) |

Undergraduate students from recognised institutions are eligible. A valid college identity card is required on campus.

## Events

| Code | Event | Track |
| --- | --- | --- |
| SYN-01 | Paper Presentation | Technical |
| SYN-02 | Project Expo | Technical |
| SYN-03 | UI/UX Design | Technical |
| SYN-04 | Quiz | Non-technical |
| SYN-05 | Business Idea Auction | Non-technical |

Format, evaluation notes, and what to bring are published as event briefs on the [live site](https://synaptra.vscale.in/).

## Technology

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Tooling | Vite 7 |
| Hosting | [synaptra.vscale.in](https://synaptra.vscale.in/) |
| Content | Static source (`src/data.jsx`) |

The site is a single-page application. There is no application server. Motion (neural canvas, HUD cursor, reveal) respects `prefers-reduced-motion`.

## Local development

**Requirement:** Node.js 20 or later.

```bash
git clone https://github.com/Fahim-Moududi/synaptra.git
cd synaptra
npm install
npm run dev
```

The development server runs at [http://localhost:5173/](http://localhost:5173/) and is bound to all interfaces so a phone on the same network can preview the layout.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server (port 5173) |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Repository structure

```
src/
  App.jsx                 Application shell, boot sequence, event overlay
  data.jsx                Canonical copy (dates, events, FAQs, contacts)
  content.json            Draft snapshot — not imported at runtime
  index.css               Theme, layout, and motion
  components/
    Hero.jsx              Title, countdown, primary registration CTA
    Events.jsx            Filters, tiles, briefs, participant channels
    Sections.jsx          About, schedule, details, venue, FAQ, contact
    Chrome.jsx            Header, footer, custom cursor, background
  hooks/
    useSiteEffects.js     Cursor, parallax, reveal
    useNeuralCanvas.js    Background mesh
```

## Content maintenance

Edit **`src/data.jsx`**. That module is the source of truth for the running application.

| Constant / export | Use |
| --- | --- |
| `REGISTER_URL` | Destination of every Register control |
| `INSTAGRAM_URL`, `WHATSAPP_URL` | Participant channels |
| `EVENT_DATE` | Countdown (`2026-10-16T09:00:00+05:30`) |
| `events`, `briefs` | Tiles and overlay copy |
| `facultyCoordinators`, `studentCoordinators` | Contact section |
| `rules`, `faqs` | Guidelines and FAQ |

Publish only facts confirmed by the organising committee. Do not invent prize amounts, additional contacts, or unconfirmed dates.

`src/content.json` may be used as a drafting aid. Keep it in sync if you maintain it; the application does not load it.

## Contact

Faculty and student coordinators, with telephone numbers, are listed on the [Contact](https://synaptra.vscale.in/#contact) section of the live site.

Participant updates: [Instagram @csbs_dept](https://www.instagram.com/csbs_dept/) and the WhatsApp group linked from the Events section.
