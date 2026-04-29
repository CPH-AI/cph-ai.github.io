import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data/members.json";

const SIGILS = {
  einstein: (
    <g opacity="0.85">
      <g stroke="#ece6d6" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7">
        <line x1="-3" y1="-4" x2="-4" y2="-7" />
        <line x1="0" y1="-5" x2="0" y2="-9" />
        <line x1="3" y1="-4" x2="4" y2="-7" />
      </g>
      <circle r="3" fill="#ece6d6" />
    </g>
  ),
  bohr: (
    <g opacity="0.85">
      <g fill="none" stroke="#ece6d6" strokeWidth="0.6" opacity="0.7">
        <ellipse rx="9" ry="3" />
        <ellipse rx="9" ry="3" transform="rotate(60)" />
        <ellipse rx="9" ry="3" transform="rotate(-60)" />
      </g>
      <circle r="1.5" fill="#ece6d6" />
    </g>
  ),
  heisenberg: (
    <g opacity="0.85">
      <text textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#ece6d6" opacity="0.85" y="2">
        Δx·Δp
      </text>
    </g>
  ),
  schrodinger: (
    <g opacity="0.85">
      <rect x="-7" y="-4" width="14" height="9" fill="none" stroke="#ece6d6" strokeWidth="0.6" strokeDasharray="1.5 1" opacity="0.7" />
      <ellipse cx="0" cy="0.5" rx="2" ry="2" fill="#ece6d6" opacity="0.85" />
      <path d="M -2 -2 L -1 0 L 0 -1 Z M 2 -2 L 1 0 L 0 -1 Z" fill="#ece6d6" opacity="0.85" />
    </g>
  )
};

export default function Study() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(0);

  const openBook = (id) => navigate(`/book/${id}`);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      } else if (e.key === "ArrowRight") {
        setFocused((f) => Math.min(3, f + 1));
      } else if (e.key === "ArrowLeft") {
        setFocused((f) => Math.max(0, f - 1));
      } else if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        setFocused(idx);
      } else if (e.key === "Enter") {
        openBook(data.books[focused].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const positions = [-285, -95, 95, 285];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "brightness(2)" }}
      animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", height: "100%", background: "#1a1410", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        viewBox="0 0 1000 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", maxHeight: "100vh" }}
      >
        <defs>
          <radialGradient id="warmLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ceilingGlow" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#3a2a1a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1a1410" stopOpacity="0" />
          </radialGradient>
          <pattern id="floor" x="0" y="0" width="80" height="20" patternUnits="userSpaceOnUse">
            <rect width="80" height="20" fill="#2a1f15" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#1a1410" strokeWidth="1" />
            <line x1="40" y1="0" x2="40" y2="20" stroke="#1a1410" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>

        <rect width="1000" height="600" fill="#1a1410" />
        <rect width="1000" height="80" fill="url(#ceilingGlow)" />

        <g transform="translate(500 38)" opacity="0.5">
          <g fill="none" stroke="#c8941d" strokeWidth="0.6">
            <ellipse rx="36" ry="12" />
            <ellipse rx="36" ry="12" transform="rotate(60)" />
            <ellipse rx="36" ry="12" transform="rotate(-60)" />
          </g>
          <circle r="2" fill="#c8941d" />
        </g>

        <rect x="0" y="80" width="1000" height="380" fill="#241a12" />
        <g opacity="0.18" stroke="#3a2a1a" strokeWidth="0.5">
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="180" x2="1000" y2="180" />
          <line x1="0" y1="260" x2="1000" y2="260" />
          <line x1="0" y1="360" x2="1000" y2="360" />
        </g>
        <rect x="0" y="460" width="1000" height="140" fill="url(#floor)" />
        <rect x="0" y="455" width="1000" height="6" fill="#3a2a1a" />

        <g transform="translate(110 320)">
          <circle r="60" fill="url(#warmLight)" opacity="0.6" />
          <circle r="46" fill="#1a1410" stroke="#c8941d" strokeWidth="2" />
          <circle r="44" fill="#ece6d6" opacity="0.92" />
          <g stroke="#1a1410" strokeWidth="1" strokeLinecap="round">
            <line x1="0" y1="-38" x2="0" y2="-32" />
            <line x1="38" y1="0" x2="32" y2="0" />
            <line x1="0" y1="38" x2="0" y2="32" />
            <line x1="-38" y1="0" x2="-32" y2="0" />
            <line x1="27" y1="-27" x2="23" y2="-23" opacity="0.5" />
            <line x1="27" y1="27" x2="23" y2="23" opacity="0.5" />
            <line x1="-27" y1="27" x2="-23" y2="23" opacity="0.5" />
            <line x1="-27" y1="-27" x2="-23" y2="-23" opacity="0.5" />
          </g>
          <line x1="0" y1="0" x2="0" y2="-26" stroke="#1a1410" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="0" x2="18" y2="10" stroke="#1a1410" strokeWidth="2.5" strokeLinecap="round" />
          <circle r="3" fill="#1a1410" />
          <text y="78" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="9" letterSpacing="0.3em" fill="#c8941d" opacity="0.85">
            NEXT  CONFERENCE
          </text>
          <text y="94" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13" fill="#ece6d6" opacity="0.7">
            in  {data.site.nextConferenceInDays}  days
          </text>
        </g>

        <g transform="translate(500 130)">
          <rect x="-380" y="0" width="760" height="240" fill="#2a1f15" stroke="#c8941d" strokeWidth="1.2" opacity="0.95" />
          <line x1="-380" y1="120" x2="380" y2="120" stroke="#c8941d" strokeWidth="1" opacity="0.5" />
          <line x1="-380" y1="240" x2="380" y2="240" stroke="#c8941d" strokeWidth="1.5" />
          <g fill="#c8941d" opacity="0.4">
            <rect x="-378" y="2" width="2" height="236" />
            <rect x="376" y="2" width="2" height="236" />
          </g>

          {data.books.map((book, i) => {
            const isFocused = focused === i;
            return (
              <g key={book.id} transform={`translate(${positions[i]} 130)`}>
                <motion.g
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => openBook(book.id)}
                  onMouseEnter={() => setFocused(i)}
                  role="button"
                  aria-label={`Open ${book.physicist}`}
                  animate={{ y: isFocused ? -8 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <rect
                    x="-50"
                    y="-110"
                    width="100"
                    height="110"
                    fill={book.coverColor}
                    stroke={isFocused ? "#f4c97a" : "#1a1410"}
                    strokeWidth={isFocused ? 1.6 : 1.2}
                  />
                  <rect x="-46" y="-106" width="92" height="14" fill="#c8941d" opacity="0.8" />
                  <rect x="-46" y="-22" width="92" height="14" fill="#c8941d" opacity="0.8" />
                  <line x1="-46" y1="-80" x2="46" y2="-80" stroke="#1a1410" strokeWidth="0.5" />
                  <line x1="-46" y1="-50" x2="46" y2="-50" stroke="#1a1410" strokeWidth="0.5" />
                  <text
                    x="0"
                    y="-65"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize={book.physicist.length > 6 ? "11" : "13"}
                    fill="#ece6d6"
                    letterSpacing="0.1em"
                  >
                    {book.physicist}
                  </text>
                  <text
                    x="0"
                    y="-48"
                    textAnchor="middle"
                    fontFamily="'SF Mono', Consolas, monospace"
                    fontSize="8"
                    fill="#ece6d6"
                    opacity="0.6"
                    letterSpacing="0.25em"
                  >
                    VOL · {book.vol}
                  </text>
                  <g transform="translate(0 -90)">{SIGILS[book.id]}</g>
                </motion.g>
              </g>
            );
          })}

          <text x="0" y="190" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="9" letterSpacing="0.4em" fill="#c8941d" opacity="0.55">
            F O U R · V O L U M E S
          </text>
          <text x="0" y="210" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#ece6d6" opacity="0.45">
            choose a volume to enter
          </text>
        </g>

        <g transform="translate(880 290)">
          <rect x="-70" y="-90" width="140" height="180" fill="#3a2820" stroke="#c8941d" strokeWidth="1.2" opacity="0.9" />
          <text x="0" y="-72" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="8" letterSpacing="0.3em" fill="#c8941d" opacity="0.7">
            EXPERIMENTS
          </text>
          <line x1="-58" y1="-62" x2="58" y2="-62" stroke="#c8941d" strokeWidth="0.4" opacity="0.4" />
          <g transform="translate(0 -38)">
            <rect x="-54" y="-12" width="108" height="28" fill="#ece6d6" opacity="0.9" stroke="#c8941d" strokeWidth="0.4" />
            <text x="-46" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" fill="#1a1410" opacity="0.7" letterSpacing="0.1em">EXP-001</text>
            <text x="-46" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#1a1410">iq-blogger live</text>
            <circle cx="50" cy="-10" r="2" fill="#c8941d" />
          </g>
          <g transform="translate(0 6)">
            <rect x="-54" y="-12" width="108" height="28" fill="#ece6d6" opacity="0.85" stroke="#c8941d" strokeWidth="0.4" />
            <text x="-46" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" fill="#1a1410" opacity="0.7" letterSpacing="0.1em">EXP-002</text>
            <text x="-46" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#1a1410">iq-dev-lab ×25</text>
            <circle cx="50" cy="-10" r="2" fill="#c8941d" />
          </g>
          <g transform="translate(0 50)">
            <rect x="-54" y="-12" width="108" height="28" fill="#ece6d6" opacity="0.5" stroke="#c8941d" strokeWidth="0.4" strokeDasharray="2 2" />
            <text x="0" y="6" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#ece6d6" opacity="0.55">
              superposition…
            </text>
          </g>
        </g>

        <g transform="translate(500 470)">
          <ellipse cx="0" cy="48" rx="200" ry="10" fill="#0a0805" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="200" ry="34" fill="#3a2820" stroke="#c8941d" strokeWidth="1" />
          <ellipse cx="0" cy="-2" rx="200" ry="34" fill="#4a3525" opacity="0.85" />
          <line x1="-200" y1="-2" x2="-200" y2="20" stroke="#c8941d" strokeWidth="1" />
          <line x1="200" y1="-2" x2="200" y2="20" stroke="#c8941d" strokeWidth="1" />
          <path d="M -200 20 Q 0 30 200 20" fill="none" stroke="#c8941d" strokeWidth="1" />
          <g opacity="0.85">
            <rect x="-26" y="-12" width="20" height="14" fill="#ece6d6" stroke="#1a1410" strokeWidth="0.4" />
            <rect x="-30" y="-14" width="28" height="3" fill="#ece6d6" />
            <line x1="-2" y1="-12" x2="6" y2="-22" stroke="#1a1410" strokeWidth="0.6" />
            <circle cx="6" cy="-22" r="1.5" fill="#1a1410" />
          </g>
          <g opacity="0.85">
            <circle cx="40" cy="-2" r="2" fill="#1a1410" />
            <line x1="40" y1="0" x2="40" y2="-12" stroke="#ece6d6" strokeWidth="2" />
            <ellipse cx="40" cy="-14" rx="4" ry="2" fill="#ece6d6" />
          </g>
          <text x="-110" y="-10" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill="#ece6d6" opacity="0.45">
            No. {String(data.site.conferenceNumber).padStart(2, "0")}
          </text>
          <motion.text
            x="0"
            y="-12"
            textAnchor="middle"
            fontFamily="'SF Mono', Consolas, monospace"
            fontSize="9"
            letterSpacing="0.4em"
            fill="#c8941d"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            CONFERENCE  IN  PROGRESS
          </motion.text>
        </g>

        <g fontFamily="'SF Mono', Consolas, monospace" fill="#ece6d6" opacity="0.45">
          <text x="500" y="555" textAnchor="middle" fontSize="9" letterSpacing="0.35em">
            THE  STUDY  ·  COPENHAGEN  AI
          </text>
        </g>

        <g
          transform="translate(20 28)"
          fontFamily="'SF Mono', Consolas, monospace"
          fill="#c8941d"
          opacity="0.7"
          fontSize="9"
          letterSpacing="0.3em"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          aria-label="Back to arrival"
        >
          <text>← BACK</text>
        </g>
      </svg>
    </motion.div>
  );
}
