export const EVENT_DATE = new Date("2026-10-16T09:00:00+05:30");

/** Official registration portal. Every Register button goes here. */
export const REGISTER_URL = "https://forms.gle/KoCb2iaz9hyn8Rxq9";

export const INSTAGRAM_URL = "https://www.instagram.com/csbs_dept/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/IW2BVStbXm3C8elAwJhkzs";

export const registerLinkProps = {
  href: REGISTER_URL,
  target: "_blank",
  rel: "noopener noreferrer",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#contact", label: "Contact" },
  { href: "#rules", label: "Guidelines" },
];

export const facultyCoordinators = [
  { name: "R. Gautham Praveen", role: "Assistant Professor, CSBS", phone: "9629660577", display: "96296 60577" },
  { name: "V. Deepigha", role: "Assistant Professor, CSBS", phone: "6383022104", display: "63830 22104" },
];

export const studentCoordinators = [
  { name: "Logesh.S", phone: "9025948164", display: "90259 48164" },
  { name: "Ajay Kumar.M", phone: "9488532069", display: "94885 32069" },
  { name: "Tamilarasi.S", phone: "8438118154", display: "84381 18154" },
  { name: "Nithyashree.D", phone: "9345840510", display: "93458 40510" },
  
];

export const events = [
  {
    id: "paper",
    kind: "tech",
    code: "SYN-01 · Technical",
    title: "Paper Presentation",
    blurb: "Pitch a unique idea on 7–10 slides, aligned to the SDGs, in a 5–7 minute jury slot.",
    tags: ["7–10 slides", "SDGs", "5–7 min"],
  },
  {
    id: "expo",
    kind: "tech",
    code: "SYN-02 · Technical",
    title: "Project Expo",
    blurb: "A 1–4 member team shows an original, SDG-aligned build. Preferred: working demo and a 6–8 slide intro.",
    tags: ["1–4 members", "SDGs", "7+3 min"],
  },
  {
    id: "uiux",
    kind: "tech",
    code: "SYN-03 · Technical",
    title: "UI/UX Design",
    blurb: "A timed problem-statement sprint: map the user, design the flow, and ship a clear, original interface.",
    tags: ["Timed brief", "User flow", "Prototype"],
  },
  {
    id: "quiz",
    kind: "nontech",
    code: "SYN-04 · Non-technical",
    title: "Quiz",
    blurb: "Multiple timed rounds. Register before the start, report early, and leave gadgets at the desk.",
    tags: ["Timed rounds", "No gadgets", "Quiz Master"],
  },
  {
    id: "auction",
    kind: "nontech",
    code: "SYN-05 · Non-technical",
    title: "Business Idea Auction",
    blurb: "Pitch a business on slides, take investment offers, and negotiate — keep more than 50% ownership.",
    tags: ["PPT pitch", "Negotiation", "Majority stake"],
  },
];

export const briefs = {
  paper: {
    code: "SYN-01 · Technical",
    title: "Paper Presentation",
    body: (
      <>
        <p>
          Present a unique idea before a faculty jury. The deck is the argument: short,
          visual, and easy to follow. Align the work to the 17 Sustainable Development Goals.
        </p>
        <h4>Important instructions — idea PPT</h4>
        <ul>
          <li>Keep the deck to 7–10 slides, including the title slide.</li>
          <li>Avoid paragraphs. Use points, diagrams, infographics, or pictures.</li>
          <li>The idea should satisfy one or more of the 17 Sustainable Development Goals (SDGs).</li>
          <li>Keep the explanation precise and easy to understand.</li>
          <li>The idea must be unique and novel.</li>
          <li>Each team has 5–7 minutes to present.</li>
        </ul>
        <h4>On the floor</h4>
        <ul>
          <li>Timed presentation followed by jury questions.</li>
          <li>Slides in 16:9. Cite sources. No plagiarised slides or copied decks.</li>
        </ul>
        <h4>Bring</h4>
        <p>Laptop or a PPT/PDF on a drive, college ID, and a printed abstract if requested.</p>
      </>
    ),
  },
  expo: {
    code: "SYN-02 · Technical",
    title: "Project Expo",
    body: (
      <>
        <p>
          Show an original project that solves a real-world problem and fits the SDGs.
          A working prototype is preferred. Walk the jury through the problem, the stack,
          the build, and the outcome.
        </p>
        <h4>Instructions</h4>
        <ul>
          <li>Each team may have 1–4 members.</li>
          <li>Projects must address a real-world problem and satisfy the SDG goals.</li>
          <li>A 6–8 slide deck is preferred to introduce the core idea, problem statement, and methodology.</li>
          <li>The project must be original — not copied from an existing project.</li>
          <li>A working prototype or demo is preferred.</li>
          <li>Explain the problem, technology used, implementation, and outcome.</li>
          <li>7 minutes for presentation + 3 minutes for Q&amp;A.</li>
          <li>Bring all files, software, and hardware needed for the demonstration.</li>
          <li>Internet is subject to venue availability. Have an offline fallback.</li>
          <li>The judges&apos; decision is final.</li>
        </ul>
        <h4>Important note</h4>
        <ul>
          <li>At least 80% of the project must be the participants&apos; own work.</li>
          <li>Use of AI tools must stay under 20%.</li>
        </ul>
        <h4>Bring</h4>
        <p>Laptop, demo hardware, chargers, required files, college ID, and a 6–8 slide deck if you have one.</p>
      </>
    ),
  },
  uiux: {
    code: "SYN-03 · Technical",
    title: "UI/UX Design Competition",
    body: (
      <>
        <p>
          A timed design heat. You work from the assigned problem statement — identify the user,
          map the flow, then deliver a simple, readable interface. Craft matters; copying an
          existing product does not.
        </p>
        <h4>Participant instructions</h4>
        <ul>
          <li>Read the problem fully before you draw. Design only for that brief; do not change the core requirement.</li>
          <li>Name the target user and design for their needs, not for decoration.</li>
          <li>Lock a clear user flow before you finish the UI.</li>
          <li>Keep screens simple, readable, consistent, and easy to move through. Hierarchy should be obvious on headings, buttons, forms, icons, and key information.</li>
          <li>Include real states where they matter: empty, error, success/confirmation, and loading.</li>
          <li>Original work only. Do not copy an existing app or another participant&apos;s file.</li>
          <li>Use Figma or another tool the organisers permit. Finish inside the given time and submit in the format they specify.</li>
        </ul>
        <h4>Rules</h4>
        <ul>
          <li>The time limit is closed. No extra design time.</li>
          <li>Work only on the assigned problem statement.</li>
          <li>Internet and reference material only if the desk allows them for that heat.</li>
          <li>No pre-made templates, cloned screens, or direct copies of live products.</li>
          <li>AI tools only if announced before the event. If allowed, disclose that you used them.</li>
          <li>Do not interfere with or copy another participant&apos;s work.</li>
          <li>Late submission may be penalised or dropped. The jury&apos;s decision is final.</li>
        </ul>
        <h4>Submit before the deadline</h4>
        <ul>
          <li>Problem statement / design title</li>
          <li>Target user</li>
          <li>Brief user flow</li>
          <li>Low-fidelity wireframe or flow (recommended)</li>
          <li>Final UI screens</li>
          <li>Clickable prototype where possible</li>
          <li>Final file or share link with the organisers</li>
        </ul>
        <h4>Bring</h4>
        <p>Laptop with Figma or your permitted tool, exported screens as backup, and college ID.</p>
      </>
    ),
  },
  quiz: {
    code: "SYN-04 · Non-technical",
    title: "Quiz",
    body: (
      <>
        <p>
          Open to all eligible, registered participants. The quiz runs in multiple rounds.
          Each question has a clock. Answer inside it. The Quiz Master&apos;s call is final.
        </p>
        <h4>Before the heat</h4>
        <ul>
          <li>Every team or participant must register before the quiz begins.</li>
          <li>Report at the venue 15 minutes before the scheduled time.</li>
          <li>Follow instructions from the event coordinators on the floor.</li>
        </ul>
        <h4>Floor rules</h4>
        <ul>
          <li>No mobile phones, smart watches, or other electronic gadgets while the quiz is live.</li>
          <li>No internet or any other external source for answers.</li>
          <li>No discussion with other teams or participants unless the Quiz Master permits it.</li>
          <li>Malpractice means immediate disqualification.</li>
          <li>Maintain discipline and decorum for the full event.</li>
        </ul>
        <h4>Rounds &amp; scoring</h4>
        <ul>
          <li>Rules and scoring may change by round. They will be announced before that round starts.</li>
          <li>Winners are decided on the final score. Prizes follow that ranking.</li>
        </ul>
        <h4>Bring</h4>
        <p>College ID and your team. Leave phones and wearables off the floor.</p>
      </>
    ),
  },
  auction: {
    code: "SYN-05 · Non-technical",
    title: "Business Idea Auction",
    body: (
      <>
        <p>
          Pitch a business or product to the floor, take investment offers, and negotiate the
          equity. A physical prototype is optional. The team that lands the strongest capital
          while keeping the most ownership wins.
        </p>
        <h4>1. Pitch your idea</h4>
        <ul>
          <li>Each student or team presents the business or product on a PPT.</li>
          <li>A physical product or prototype is optional, not required.</li>
        </ul>
        <h4>2. Ask for investment</h4>
        <ul>
          <li>After the pitch, investors may offer money in exchange for a share of the business.</li>
        </ul>
        <h4>3. Negotiate the deal</h4>
        <ul>
          <li>Accept, reject, or counter the offer.</li>
          <li>The student or team must keep more than 50% ownership. Majority stays with you.</li>
        </ul>
        <h4>4. How the winner is called</h4>
        <ul>
          <li>Best result is the strongest investment amount with the highest ownership you can still hold.</li>
        </ul>
        <h4>5. Fair play &amp; time</h4>
        <ul>
          <li>Pitch and negotiation must finish inside the given time.</li>
          <li>No fake claims, plagiarism, cheating, or other unfair practice.</li>
          <li>The judges&apos; decision is final.</li>
        </ul>
        <h4>Bring</h4>
        <p>Laptop or a PPT on a drive, college ID, and a prototype only if you have one.</p>
      </>
    ),
  },
};

export const schedule = [
  { time: "09:00", title: "Reporting & kit", text: "ID verification, registration desk, and event-wise assembly near the EEE Seminar Hall." },
  { time: "10:00", title: "Inauguration", text: "Formal opening of SYNAPTRA '26 by the Department of CSBS." },
  { time: "11:00", title: "Technical floors", text: "Paper presentation, project expo, and UI/UX design in parallel or sequenced heats." },
  { time: "13:00", title: "Break", text: "Campus break. Food arrangements, if any, will be confirmed to registered participants." },
  { time: "14:00", title: "Non-technical floors", text: "Quiz and business idea auction, plus any remaining technical slots." },
  { time: "15:00", title: "Valedictory", text: "Closing remarks and recognition of winners, as announced by the organising committee." },
];

export const rules = [
  {
    title: "Registration",
    open: true,
    items: [
      "Online registration is mandatory before 23:59 IST on 13 October 2026.",
      "The published fee is ₹200 per participant (per head), not per team.",
      "Carry your college ID and the SYN ID issued after this form (or the official confirmation once the department form is linked).",
      "Payment mode on campus, if required, will be confirmed by the organising committee.",
    ],
  },
  {
    title: "Eligibility & teams",
    items: [
      "Open to students of recognised institutions. SAEC students and visiting campuses are welcome.",
      "Register a primary event. Additional entries are subject to slot availability and coordinator approval.",
      "Team composition, where allowed, will be confirmed in the event brief and on-desk instructions.",
      "All members listed must be present for judged rounds unless the coordinator records an exception.",
    ],
  },
  {
    title: "Time, discipline & campus",
    items: [
      "Report 15–30 minutes before your scheduled heat.",
      "Late arrival may forfeit the slot. The jury will not restart a completed heat.",
      "Follow allotted presentation, demo, and round durations.",
      "College property, labs, and hall equipment are to be used only as directed.",
    ],
  },
  {
    title: "Originality, judging & conduct",
    items: [
      "Papers, projects, designs, and media must be the participants’ own work. Plagiarism or ghost entries mean disqualification.",
      "Evaluation uses predefined technical and presentation criteria. Jury and coordinator decisions are final.",
      "Professional conduct is required throughout. Harassment, disruption, or unsafe behaviour ends participation.",
    ],
  },
];

export const faqs = [
  {
    q: "Who can register?",
    a: "Undergraduate students from recognised colleges. CSBS hosts the day; other departments and campuses may enter any listed event.",
  },
  {
    q: "Is the fee per team or per person?",
    a: "The registration fee is ₹200 per participant for students from other colleges.",
  },
  {
    q: "Can I enter more than one event?",
    a: "Yes. You can take part in more than one event as long as the schedules do not clash.",
  },
  {
    q: "Do I need to submit an abstract or prototype in advance?",
    a: "No. You do not need to submit an abstract or prototype in advance for Paper Presentation or Project Expo. Register and present on the day of the event.",
  },
  {
    q: "Will food be provided?",
    a: "Food details will be shared in your registration confirmation.",
  },
  {
    q: "Where do I register?",
    a: "Scan the QR code on the official poster, or use the Register button on this website.",
  },
  {
    q: "Which events are available?",
    a: "Technical: Paper Presentation, Project Expo, and UI/UX Design. Non-technical: Quiz and Auction.",
  },
  {
    q: "When is SYNAPTRA '26?",
    a: "16 October 2026. Attractive prizes await the winners.",
  },
];
