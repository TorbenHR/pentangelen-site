import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  Library,
  Scroll,
  Info,
  Mail,
  Moon,
  Sun,
  ChevronRight,
  Ghost,
  Wand2,
  Shield,
  MapPin,
  Timer,
  ShoppingCart,
  User,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";

// ---------- Mini UI primitives ----------
const Button = ({ as: Comp = "button", className = "", children, ...props }) => (
  <Comp
    className={
      `inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm ` +
      `bg-zinc-800/70 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-600 ` +
      `border border-zinc-700 transition ` +
      className
    }
    {...props}
  >
    {children}
  </Comp>
);

const GhostButton = ({ className = "", children, ...props }) => (
  <button
    className={
      `inline-flex items-center gap-2 rounded-2xl px-3 py-2 ` +
      `text-zinc-300 hover:text-white hover:bg-zinc-800/50 border border-transparent ` +
      `transition ${className}`
    }
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div
    className={
      `rounded-3xl border border-zinc-800 bg-zinc-900/60 shadow-xl ` +
      `backdrop-blur-md ${className}`
    }
  >
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300">
    {children}
  </span>
);

// ---------- Occult Sigil (animated SVG) ----------
const OccultSigil = ({ className = "" }) => {
  const drawKeyframes = [0, 1, 1, 0];
  const drawTimes = [0, 0.45, 0.55, 1];

  const common = {
    initial: { pathLength: 0 },
    animate: { pathLength: drawKeyframes },
    transition: {
      duration: 8,
      times: drawTimes,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 12,
    },
  };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      shapeRendering="geometricPrecision"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-zinc-600"
        {...common}
      />
      <motion.path
        d="M100 20 L127 150 L30 70 L170 70 L73 150 Z"
        fill="none"
        stroke="currentColor"
        className="text-zinc-500"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawKeyframes }}
        transition={{
          duration: 8,
          times: drawTimes,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 12,
          delay: 0.3,
        }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="48"
        fill="none"
        stroke="currentColor"
        className="text-zinc-700"
        strokeWidth="0.9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawKeyframes }}
        transition={{
          duration: 8,
          times: drawTimes,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 12,
          delay: 0.6,
        }}
      />
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const isCardinal = i % 3 === 0;
        const isSouth = i === 3;
        const rInner = 46;
        const rOuter = isSouth ? 72 : isCardinal ? 66 : 60;
        const x1 = 100 + rInner * Math.cos(angle);
        const y1 = 100 + rInner * Math.sin(angle);
        const x2 = 100 + rOuter * Math.cos(angle);
        const y2 = 100 + rOuter * Math.sin(angle);

        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            className="text-zinc-500"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            paintOrder="stroke"
            style={{ filter: "drop-shadow(0 0 0.6px currentColor)" }}
            initial={{ opacity: 0.55 }}
            animate={{ opacity: [0.55, 0.95, 0.55] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 8,
              delay: i * 0.08,
            }}
          />
        );
      })}
    </motion.svg>
  );
};

// ---------- Helpers for retailer links ----------
const retailerUrls = {
  Norli: (title) => `https://www.norli.no/search?q=${encodeURIComponent(title)}`,
  Ark: (title) => `https://www.ark.no/search?q=${encodeURIComponent(title)}`,
  BoD: (title) => `https://www.bod.no/sok/?q=${encodeURIComponent(title)}`,
  "Flere forhandlere": (title, author = "") =>
    `https://duckduckgo.com/?q=${encodeURIComponent(`${title} ${author}`)}`,
};

const RetailerButtons = ({ title, author = "", compact = false }) => {
  const links = [
    { name: "Norli", href: retailerUrls.Norli(title) },
    { name: "Ark", href: retailerUrls.Ark(title) },
    { name: "BoD", href: retailerUrls.BoD(title) },
    { name: "Flere forhandlere", href: retailerUrls["Flere forhandlere"](title, author) },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <Button
          key={l.name}
          as="a"
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? "px-3 py-1 text-sm" : "text-sm"}
        >
          <ShoppingCart size={16} /> {l.name}
        </Button>
      ))}
    </div>
  );
};

// ---------- Fake data for the mockup ----------
const BOOKS = [
  {
    id: "pentangelen",
    title: "Pentangelen",
    subtitle: "Okkult humor og helvete ved Vestfoldkysten",
    status: "Ferdig manus (klar for forlag)",
    tags: ["okkult", "horror", "humor", "Vestfold"],
    gradient: "from-indigo-700/50 via-fuchsia-700/40 to-rose-700/40",
    blurb:
      "Bendik har en plan for livet: å bli okkult eventyrer. Problemet er at det ikke finnes en skole for sånt, og det mest mystiske som skjer i Tønsberg er at det er noen som har agurkmiks på bensinstasjonspølsa. Men alt endrer seg den dagen han og kompisen Robban prøver å hjelpe en eksentrisk magiker som kan ha satt fyr på en leilighet. Plutselig er de Norges mest ukvalifiserte men dyktige etterforskere, jaktet av en udødelig nazisekt og skapninger som har krøpet ut av lokalhistorien. Pentangelen er en mørk, blodig og hysterisk morsom reise inn i Vestfolds hemmelige underverden, der den største trusselen kanskje ikke er glemte guder eller zombie-nazister, men dine egne dårlige ideer.",
    details: [
      { icon: MapPin, label: "Sted", value: "Tønsbergs mørke side" },
      { icon: Ghost, label: "Antagonist", value: "En 105 år gammel nasist og inkarnat" },
      { icon: Shield, label: "Tema", value: "Skyld, vennskap, offer, agurkmiks" },
    ],
    author: "Torben Halvorsen Rygg",
  },
  {
    id: "tempusterror",
    title: "Tempusterror",
    subtitle: "Boken basert på filmen",
    status: "I redigering (Bok 2)",
    tags: ["okkult", "horror", "humor", "tidsreise"],
    gradient: "from-amber-700/40 via-red-700/30 to-rose-700/30",
    blurb:
      "De reddet verden. De trodde de hadde vunnet. De tok feil. I fortsettelsen på den kritikerroste Pentangelen, oppdager Bendik og vennene hans at deres største seier bare var åpningstrekket i et mye mørkere og mer forrædersk spill. Og hva skjer når man er drevet av en sorg så dyp at man er villig til å ofre selve tidslinjen for å vinne tilbake det han har tapt.",
    details: [
      { icon: MapPin, label: "Sted", value: "Tønsbergs hovedpulsåre" },
      { icon: Timer, label: "Motiv", value: "Ritualer & skjulte kostnader" },
      { icon: Wand2, label: "Tema", value: "En eldgammel pakt, et knust hjerte, og en sorg som er mektigere enn noen demon." },
    ],
    author: "Torben Halvorsen Rygg",
  },
  {
    id: "taumageddon",
    title: "Taumageddon",
    subtitle: "Det store oppgjøret",
    status: "Under arbeid (Bok 3)",
    tags: ["okkult", "kosmisk", "oppgjør"],
    gradient: "from-sky-700/40 via-violet-700/30 to-fuchsia-700/30",
    blurb:
      "Bendiks reise fra en bekymringsløs ungdom til en okkult eventyrer har kostet ham alt. Nå, med vennskapet i ruiner og selve virkeligheten i ferd med å kollapse, står han overfor sitt siste valg. Han må samle restene av teamet sitt for en siste, desperat kamp, ikke bare mot monstre fra en annen dimensjon, men mot selve ideen om skjebne. Det blir en siste konfrontasjon der den største seieren ikke er å redde verden, men å redde sjelen til en venn.",
    details: [
      { icon: MapPin, label: "Sted", value: "Vestfold og Jerusalem" },
      { icon: Ghost, label: "Trussel", value: "En gudefar med kjøleboks" },
      { icon: Shield, label: "Tema", value: "Skjebne vs. fri vilje" },
    ],
    author: "Torben Halvorsen Rygg",
  },
];

const PAGES = {
  HOME: "home",
  BOOKS: "books",
  BOOK: "book",
  LORE: "lore",
  NEWS: "news",
  ABOUT: "about",
  AUTHOR: "author",
  CONTACT: "contact",
};

function useDarkModeDefault() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

function Nav({ route, setRoute, setSelectedBook, theme, setTheme }) {
  const Link = ({ to, icon: Icon, children }) => (
    <button
      onClick={() => {
        setSelectedBook(null);
        setRoute(to);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={
        `group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ` +
        `${
          route === to
            ? "bg-zinc-800 text-white"
            : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
        }`
      }
    >
      <Icon size={16} className="opacity-90" />
      {children}
    </button>
  );

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
  <div className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[rgba(12,12,14,0.7)] backdrop-blur-xl overflow-x-visible">
        <div className="mx-auto w-full max-w-full px-2 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <OccultSigil className="h-8 w-8 text-zinc-500" />
              <div className="absolute inset-0 blur-[6px] opacity-30" />
            </div>
            <button
              onClick={() => setRoute(PAGES.HOME)}
              className="text-lg font-serif font-semibold tracking-wide text-zinc-100"
            >
              Pentangelen-universet
            </button>
            <Badge>Mørk &bull; Okkult &bull; Humor</Badge>
          </div>
          {/* Burger menu button inline with title */}
          <div className="flex items-center">
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-100 hover:bg-zinc-800"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Åpne meny"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="2" rx="1"/><rect x="3" y="12" width="18" height="2" rx="1"/><rect x="3" y="18" width="18" height="2" rx="1"/></svg>
            </button>
            {menuOpen && (
              <div className="fixed right-4 top-24 w-56 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl bg-zinc-900/95 shadow-xl border border-zinc-800 flex flex-col py-2 z-50">
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100 font-semibold" onClick={() => { setSelectedBook(null); setRoute(PAGES.HOME); setMenuOpen(false); }}>Hjem</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.BOOKS); setMenuOpen(false); }}>Bøker</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.LORE); setMenuOpen(false); }}>Lore</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.NEWS); setMenuOpen(false); }}>Nyheter</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.ABOUT); setMenuOpen(false); }}>Om</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.CONTACT); setMenuOpen(false); }}>Kontakt</button>
                <button className="text-left px-4 py-2 hover:bg-zinc-800 text-zinc-100" onClick={() => { setRoute(PAGES.AUTHOR); setMenuOpen(false); }}>Forfatter</button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

function Hero({ setRoute }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(88,28,135,0.25),transparent),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg, rgba(255,255,255,.06) 0deg 10deg, transparent 10deg 20deg)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-serif font-bold leading-tight text-zinc-100 md:text-6xl">
            Okkultisme. Humor. Horror.
          </h1>
          <p className="max-w-prose text-lg text-zinc-300">
            Et bokunivers der purgatorier skjuler seg i kolonihager, der veldedighetsforeningene er sekter  og vennskap settes på prøve av noe som vil inn fra den andre siden.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setRoute(PAGES.BOOKS)}>
              Utforsk bøkene <ChevronRight size={16} />
            </Button>
            <GhostButton onClick={() => setRoute(PAGES.LORE)}>
              Les lore <ChevronRight size={16} />
            </GhostButton>
          </div>
          <div className="flex gap-2 pt-2">
            <Badge>Okkult skrekk</Badge>
            <Badge>Komisk nerve</Badge>
            <Badge>Serie</Badge>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="relative h-64 w-64 text-fuchsia-400/80 md:h-80 md:w-80"
            initial={{ rotate: -8, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <OccultSigil className="h-full w-full" />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              style={{ boxShadow: "0 0 140px 30px rgba(236,72,153,0.25) inset" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function BooksGrid({ setRoute, setSelectedBook }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-zinc-100 md:text-3xl">Bøker</h2>
          <p className="text-zinc-400">Klikk en bok for detaljside.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BOOKS.map((b) => (
          <Card key={b.id} className="group overflow-hidden">
            <div className={`h-28 w-full bg-gradient-to-br ${b.gradient}`} />
            <div className="space-y-3 p-5">
              <h3 className="text-xl font-serif font-semibold text-zinc-100">{b.title}</h3>
              <p className="text-sm text-zinc-400">{b.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {b.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <p className="line-clamp-3 text-zinc-300">{b.blurb}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-400">{b.status}</span>
                <div className="flex gap-2">
                  <RetailerButtons title={b.title} author={b.author} compact />
                  <Button
                    className="text-sm"
                    onClick={() => {
                      setSelectedBook(b);
                      setRoute(PAGES.BOOK);
                    }}
                  >
                    Les mer <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BookDetail({ book, setRoute }) {
  if (!book) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-zinc-100">{book.title}</h2>
          <p className="text-zinc-400">{book.subtitle}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {book.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
        <Button onClick={() => setRoute(PAGES.BOOKS)}>Tilbake til bøker</Button>
      </div>

      <Card>
        <div className={`h-32 w-full rounded-t-3xl bg-gradient-to-br ${book.gradient}`} />
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-serif font-semibold text-zinc-100">Om boken</h3>
            <p className="text-zinc-300">{book.blurb}</p>
            <div className="flex flex-col gap-3 pt-1">
              <RetailerButtons title={book.title} author={book.author} />
              <div className="text-xs text-zinc-500">
                Lagerstatus, levering og angrerett håndteres av forhandler.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-300">Metadata</h4>
            <div className="grid grid-cols-1 gap-3">
              {book.details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3"
                >
                  <Icon size={16} className="text-zinc-400" />
                  <div>
                    <div className="text-xs text-zinc-400">{label}</div>
                    <div className="text-sm text-zinc-200">{value}</div>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3">
                <div className="text-xs text-zinc-400">Status</div>
                <div className="text-sm text-zinc-200">{book.status}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function LorePage() {
  const entries = [
    {
      title: "Taumaturgen på Teie",
      body:
        "En briljant, men sosialt klønete, magiker som kan bøye tid og rom, men som fortsatt sliter med å forstå konseptet \"parkeringsavgift\".",
    },
    {
      title: "Nahemoth",
      body:
        "En eldgammel, sulten guddom fra den andre siden av virkeligheten, hvis nærvær gjør at ting forvitrer og maten smaker litt verre.",
    },
    {
      title: "Gnostisisme",
      body:
        "Den radikale ideen om at vår virkelighet er et slags kosmisk fengsel, og at den eneste veien ut er gjennom hemmelig kunnskap og en sunn dose mistenksomhet.",
    },
     {
      title: "Qliphoth",
      body:
        "De mørke, kaotiske og generelt ubehagelige skyggesidene av universet, beskrevet av mystikere som foretrakk sine metaforer dystre og vanskelige å stave.",
    },
     {
      title: "Sofia / Sophia",
      body:
        "En guddommelig kraft av visdom som, i et øyeblikks ubetenksomhet, snublet og ved et uhell skapte hele vår uperfekte verden.",
    },
     {
      title: "Agurkmiks",
      body:
        "En grønn, vederstyggelig substans som muligens er et biologisk våpen lekket fra en mindre edel del av en demonisk skapning.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-3xl font-bold text-zinc-100">Lore-kodeks</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {entries.map((e) => (
          <Card key={e.title} className="p-5">
            <div className="flex items-center gap-2 pb-2">
              <Scroll size={16} className="text-zinc-400" />
              <h3 className="text-lg font-serif font-semibold text-zinc-100">{e.title}</h3>
            </div>
            <p className="text-zinc-300">{e.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function NewsPage() {
  const posts = [
    {
      date: "2025-08-01",
      title: "Manus klart for innsending",
      excerpt: "Pentangelen er gjennom siste språkvask. Følgebrev og pitch spikres nå.",
    },
    {
      date: "2025-07-15",
      title: "Plottråd: Torleif & forræderiet",
      excerpt: "Utforsker hvordan oppvåkning krasjer med lojalitet i Belsebubs Bomring.",
    },
    {
      date: "2025-06-30",
      title: "Visuell research i Tønsberg",
      excerpt: "Notater fra Slottsfjellet, Vægteren og kolonihagene - detaljer til miljø.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-6 text-3xl font-bold text-zinc-100">Nyheter & notater</h2>
      <div className="space-y-4">
        {posts.map((p) => (
          <Card key={p.title} className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold text-zinc-100">{p.title}</h3>
              <span className="text-sm text-zinc-400">{p.date}</span>
            </div>
            <p className="pt-1 text-zinc-300">{p.excerpt}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="mb-4 text-3xl font-bold text-zinc-100">Om universet</h2>
      <Card className="p-6">
        <p className="text-zinc-300">
          <p>Det finnes kanskje et kart over Norge som du ikke finner i noe atlas. Et kart der de gamle veiene i Vestfold ikke bare leder til hyggelige kystbyer, men til glemte ritualer og portaler til andre dimensj- nei, <i>lag</i>, til andre lag av vår verden. Der kornsirklene på et jorde i Høyjord ikke er laget av lystige studenter, men er beskjeder fra den andre siden. Og der bomringene på E-18 ikke bare krever penger, men små biter av sjelen din som offer til en eldgammel, sulten guddom.</p>
          <p>Dette er verdenen til Pentangel-trilogien.</p><br />
          <p>Bli med Bendik, en aspirerende okkult eventyrer hvis entusiasme langt overgår hans kompetanse; Robban, hans jordnære snekker-kompis som helst skulle ønske han var et annet sted; og Emma, en uforutsigbar rebell med et talent for å skape kaos. Sammen med den eksentriske og plagede taumaturgen Torleif, snubler de inn i en virkelighet som er mørkere, dummere og uendelig mye mer komplisert enn de noensinne kunne ha forestilt seg.</p>
          <p>Gjennom tre bøker – <strong>Pentangelen</strong>, <strong>Tempusterror</strong> og <strong>Taumageddon</strong> – følger vi denne brokete alliansen fra deres første, klønete kamp mot en udødelige nazister, til en desperat konfrontasjon med kosmiske mareritt, eldgamle pakter, og den mest skremmende trusselen av alle: sorgen og sviket fra en venn.</p><br />
        </p>
      </Card>
    </div>
  );
}

function ContactPage() {
  const ENDPOINT_URL = "https://formspree.io/f/meolyppd"; // <- ditt endpoint
  const [status, setStatus] = useState("idle"); // idle|sending|ok|err
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.message || !form.consent) {
      setStatus("err");
      return;
    }
    try {
      setStatus("sending");
      const res = await fetch(ENDPOINT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: "Ny melding fra pentangelen-site",
        }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", message: "", consent: false });
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="mb-4 text-3xl font-bold text-zinc-100">Kontakt</h2>
      <Card className="p-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Navn</label>
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="Ditt navn"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">E-post</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="din@epost.no"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Melding</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="Hei!"
              required
            />
          </div>

          {/* Samtykke (GDPR) */}
          <label className="flex items-start gap-2 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-0.5"
            />
            Jeg samtykker til at denne meldingen sendes til Torben (Formspree). Jeg kan be om sletting.
          </label>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sender…" : "Send melding"}
            </Button>
            <GhostButton type="button" as="a" href="mailto:torben.rygg@gmail.com">
              Forlagskontakt
            </GhostButton>
          </div>

          {status === "ok" && (
            <div className="text-sm text-emerald-400">Takk! Meldingen er sendt.</div>
          )}
          {status === "err" && (
            <div className="text-sm text-rose-400">
              Noe gikk galt. Sjekk feltene og prøv igjen (eller send e-post direkte).
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}


// ---------- Newsletter (mock) ----------
const EMAIL_RE = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | ok | err

  function submit() {
    const ok = EMAIL_RE.test(email) && consent;
    if (!ok) {
      setStatus("err");
      return;
    }
    try {
      const key = "thr_newsletter_signups";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({ email, ts: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
      setStatus("ok");
      setEmail("");
      setConsent(false);
    } catch (e) {
      setStatus("err");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Card className="p-6">
        <h2 className="mb-2 text-2xl font-serif font-semibold text-zinc-100">Hold meg oppdatert</h2>
        <p className="mb-4 text-zinc-400">
          Få beskjed når nye kapitler, lanseringer eller signeringer skjer. Ingen spam.
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="din@epost.no"
            className="md:flex-1 rounded-xl border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-fuchsia-600"
          />
          <Button type="button" onClick={submit} className="md:w-44">
            Meld meg på
          </Button>
        </div>
        <label className="mt-3 flex items-start gap-2 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
          />
          Jeg samtykker til å motta e-post om dette bokprosjektet, og jeg kan melde meg av når som
          helst.
        </label>
        {status === "ok" && <div className="mt-3 text-sm text-emerald-400">Takk! Du er lagt til (mock).</div>}
        {status === "err" && <div className="mt-3 text-sm text-rose-400">Sjekk e-post og samtykke.</div>}
      </Card>
    </div>
  );
}

function Footer() {
  const [showAIPopup, setShowAIPopup] = React.useState(false);
  return (
    <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row">
        <div className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Pentangelen-universet &bull; En mørk, morsom, norsk bokserie
        </div>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <a className="hover:text-zinc-300" href="#">Personvern</a>
          <span>&bull;</span>
          <a className="hover:text-zinc-300" href="#">Informasjonskapsler</a>
          <span>&bull;</span>
          <button className="hover:text-zinc-300 underline" onClick={() => setShowAIPopup(true)}>Bruk av KI</button>
          <span>&bull;</span>
          <a className="hover:text-blue-400" href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a className="hover:text-pink-400" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="hover:text-orange-400" href="https://reddit.com" target="_blank" rel="noopener noreferrer">Reddit</a>
        </div>
      </div>
      {showAIPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl p-6 text-center max-w-xs">
            <p className="text-zinc-100 mb-4">
              KI er IKKE brukt til å generere tekst til bøkene.<br /><br />
              KI er brukt til å generere kode til nettsiden, til å lage medier på nettsiden og sammenfatte tektst til nettsiden.<br /><br />
              Svart og lysebrun magi er bruk til det hele. 
            </p>
            <button
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700"
              onClick={() => setShowAIPopup(false)}
            >
              Lukk
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

// ---------- Dev sanity tests (console-only) ----------
function runDevTests() {
  try {
    console.assert(typeof retailerUrls.Norli("A B") === "string", "Norli URL should be string");
    console.assert(
      retailerUrls.Norli("A B").includes("A%20B"),
      "Norli URL should be encoded",
    );
    console.assert(EMAIL_RE.test("test@example.com"), "Email regex should accept valid email");
    console.assert(!EMAIL_RE.test("bad@"), "Email regex should reject invalid email");
    const ids = BOOKS.map((b) => b.id);
    console.assert(new Set(ids).size === ids.length, "Book IDs should be unique");
    console.assert(retailerUrls.Ark("C D").includes("C%20D"), "Ark URL should be encoded");
    console.assert(BOOKS.length > 0, "There should be at least one book defined");
  } catch (e) {
    console.warn("Dev tests warning:", e);
  }
}

export default function PentangelenSiteMock() {
  const { theme, setTheme } = useDarkModeDefault();
  const [route, setRoute] = useState(PAGES.HOME);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    runDevTests();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, white, transparent 60%), radial-gradient(2px 2px at 60% 80%, white, transparent 60%), radial-gradient(1px 1px at 80% 20%, white, transparent 60%)",
        }}
      />

      <Nav
        route={route}
        setRoute={setRoute}
        setSelectedBook={setSelectedBook}
        theme={theme}
        setTheme={setTheme}
      />

      {route === PAGES.HOME && (
        <>
          <Hero setRoute={setRoute} />
          <BooksGrid setRoute={setRoute} setSelectedBook={setSelectedBook} />
          <NewsletterSignup />
        </>
      )}

      {route === PAGES.BOOKS && <BooksGrid setRoute={setRoute} setSelectedBook={setSelectedBook} />}

      {route === PAGES.BOOK && <BookDetail book={selectedBook} setRoute={setRoute} />}

      {route === PAGES.LORE && <LorePage />}
      {route === PAGES.NEWS && <NewsPage />}
      {route === PAGES.ABOUT && <AboutPage />}
      {route === PAGES.AUTHOR && (
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Card className="p-6">
            <h2 className="text-xl font-serif font-semibold text-zinc-100">Torben Halvorsen Rygg</h2>
            <p className="text-zinc-400">Hva skjer når en dude med et bein solid plantet i Navs byråkratiske kalde maskineri og det andre vilt trampende i et et univers av gnostiske tekster, dårlig teologi og forkjærlighet for skrekk bestemmer seg for å skrive en bok?
              Vel, du får noe sånt som dette. <br />
              &nbsp;&nbsp;&nbsp;Jeg heter Torben, bor i utkanten av Tønsberg, og har tilbrakt en foruroligende stor del av livet mitt med å se det absurde utfolde seg i statlige korridorer. Folk sier virkeligheten er ofte rarere, dummere og mer uforutsigbar enn noen fiksjon du kan finne på.
              Så jeg bestemte meg for å ta den utfordringen.<br />
              &nbsp;&nbsp;&nbsp;&nbsp; Bøkene mine er et resultat av den innsikten. De er en slags kjærlig, men kaotisk, frontkollisjon mellom det jeg synes er genuint fascinerende – kosmisk horror, eldgamle myter, tidsparadokser – og det som er genuint tønsbergensisk: debatter om hvorvidt agurkmiks er en forbrytelse mot menneskeheten, mysteriet med bomringer, og den dypt rotfestede troen på byens helter kan redde verden.
              Forvent raske dialoger, mysterier som er smartere enn de kanskje burde være, og en konstant påminnelse om at selv når himmelen revner og glemte guder kommer gjennom illusjonen, er det sannsynligvis noen i nærheten som er mer opptatt av om lompe egentlig er bedre enn pølsebrød.
              Det er i hvert fall noe av det jeg prøver på. Håper du elsker det.</p>
          </Card>
        </div>
      )}
      {route === PAGES.CONTACT && <ContactPage />}

      <Footer />
    </div>
  );
}
