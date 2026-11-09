# SYNAPTRA ’26

Official site for **SYNAPTRA ’26**, the technical and non-technical symposium of the Department of Computer Science and Business Systems (CSBS), [Syed Ammal Engineering College](https://www.syedengg.ac.in/) (Autonomous), Ramanathapuram.

*Where Ideas Connect, Innovation Takes Over.*

## Event snapshot

| | |
| --- | --- |
| **Date** | 16 October 2026 |
| **Start** | 9:00 AM IST |
| **Venue** | EEE Seminar Hall, SAEC, Ramanathapuram |
| **Fee** | ₹200 per participant (other colleges) |
| **Registration closes** | 13 October 2026, 23:59 IST |
| **Register** | [Google Form](https://forms.gle/KoCb2iaz9hyn8Rxq9) |
| **Instagram** | [@csbs_dept](https://www.instagram.com/csbs_dept/) |

Open to undergraduate students from recognised colleges. Carry a valid college ID on campus.

## Events

**Technical**

1. **Paper Presentation** — unique SDG-aligned idea on 6–9 slides; required titles; teams of 1–4; 5–7 minutes
2. **Project Expo** — original SDG-aligned build; working demo preferred; 1–4 members; 7 + 3 minutes
3. **UI/UX Design** — timed problem-statement sprint; user flow and original interface

**Non-technical**

4. **Quiz** — multiple timed rounds; gadgets off the floor
5. **Business Idea Auction** — original pitch on a PPT; 5 minutes; keep more than 50% ownership; teams of 1–4

Event briefs, guidelines, coordinators, and the indicative schedule live on the site.

## Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 7
- Canvas neural mesh, HUD motion, and custom cursor (respects `prefers-reduced-motion`)

No backend. Copy, events, coordinators, and links are in source.

## Run locally

Requires **Node.js 20+**.

```bash
git clone https://github.com/Fahim-Moududi/synaptra.git
cd synaptra
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/). Vite binds to all interfaces (`host: true`) so phones on the same network can preview the mobile layout.

| Script | |
| --- | --- |
| `npm run dev` | local server on port 5173 |
| `npm run build` | production build to `dist/` |
| `npm run preview` | serve the production build |

## Project layout

```
src/
  App.jsx                 # boot sequence, layout, event brief overlay
  data.jsx                # live copy — dates, events, briefs, FAQs, contacts
  content.json            # content snapshot (site reads data.jsx)
  index.css               # theme, layout, motion
  components/
    Hero.jsx              # title, countdown, register CTA
    Events.jsx            # filter, tiles, briefs, participant channels
    Sections.jsx          # about, schedule, details, venue, FAQ, contact
    Chrome.jsx            # header, footer, custom cursor, background
  hooks/
    useSiteEffects.js     # cursor, parallax, reveal
    useNeuralCanvas.js    # background mesh
```

## Editing content

Change **`src/data.jsx`**. That file is what the app renders.

Typical edits:

- **Registration URL** — `REGISTER_URL`
- **Instagram / WhatsApp** — `INSTAGRAM_URL`, `WHATSAPP_URL`
- **Event tiles and briefs** — `events`, `briefs`
- **Coordinators** — `facultyCoordinators`, `studentCoordinators`
- **Date / countdown** — `EVENT_DATE` (`2026-10-16T09:00:00+05:30`)
- **Guidelines and FAQ** — `rules`, `faqs`

Keep poster facts accurate. Do not invent prize amounts, extra contacts, or dates that are not confirmed by the organising committee.

`src/content.json` is a mirror for drafting. Sync it if you use it, but the running site does not import it.

## Contact

Faculty and student coordinators (with phone numbers) are listed in the Contact section of the site.

Participant updates: Instagram [@csbs_dept](https://www.instagram.com/csbs_dept/) and the WhatsApp group linked on the Events section.
