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

  const positions = [-210, -70, 70, 210];

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

        <rect x="0" y="80" width="1000" height="350" fill="#241a12" />
        <g opacity="0.18" stroke="#3a2a1a" strokeWidth="0.5">
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="180" x2="1000" y2="180" />
          <line x1="0" y1="260" x2="1000" y2="260" />
          <line x1="0" y1="340" x2="1000" y2="340" />
        </g>
        <rect x="0" y="430" width="1000" height="170" fill="url(#floor)" />
        <rect x="0" y="425" width="1000" height="6" fill="#3a2a1a" />

        <g transform="translate(85 300)">
          <circle r="58" fill="url(#warmLight)" opacity="0.5" />
          <circle r="40" fill="#1a1410" stroke="#c8941d" strokeWidth="1.6" />
          <circle r="38" fill="#ece6d6" opacity="0.92" />
          <g stroke="#1a1410" strokeWidth="1" strokeLinecap="round">
            <line x1="0" y1="-32" x2="0" y2="-27" />
            <line x1="32" y1="0" x2="27" y2="0" />
            <line x1="0" y1="32" x2="0" y2="27" />
            <line x1="-32" y1="0" x2="-27" y2="0" />
            <line x1="22" y1="-22" x2="19" y2="-19" opacity="0.5" />
            <line x1="22" y1="22" x2="19" y2="19" opacity="0.5" />
            <line x1="-22" y1="22" x2="-19" y2="19" opacity="0.5" />
            <line x1="-22" y1="-22" x2="-19" y2="-19" opacity="0.5" />
          </g>
          <line x1="0" y1="0" x2="0" y2="-22" stroke="#1a1410" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="0" x2="14" y2="8" stroke="#1a1410" strokeWidth="2.2" strokeLinecap="round" />
          <circle r="2.5" fill="#1a1410" />
          <text y="62" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="8" letterSpacing="0.3em" fill="#c8941d" opacity="0.85">
            NEXT  CONFERENCE
          </text>
          <text y="78" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="12" fill="#ece6d6" opacity="0.7">
            in  {data.site.nextConferenceInDays}  days
          </text>
        </g>

        <g transform="translate(500 140)">
          <rect x="-280" y="0" width="560" height="220" fill="#2a1f15" stroke="#c8941d" strokeWidth="1.2" opacity="0.95" />
          <line x1="-280" y1="110" x2="280" y2="110" stroke="#c8941d" strokeWidth="1" opacity="0.5" />
          <line x1="-280" y1="220" x2="280" y2="220" stroke="#c8941d" strokeWidth="1.5" />
          <g fill="#c8941d" opacity="0.4">
            <rect x="-278" y="2" width="2" height="216" />
            <rect x="276" y="2" width="2" height="216" />
          </g>

          {data.books.map((book, i) => {
            const isFocused = focused === i;
            return (
              <g key={book.id} transform={`translate(${positions[i]} 120)`}>
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
                    x="-46"
                    y="-100"
                    width="92"
                    height="100"
                    fill={book.coverColor}
                    stroke={isFocused ? "#f4c97a" : "#1a1410"}
                    strokeWidth={isFocused ? 1.6 : 1.2}
                  />
                  <rect x="-42" y="-96" width="84" height="13" fill="#c8941d" opacity="0.8" />
                  <rect x="-42" y="-20" width="84" height="13" fill="#c8941d" opacity="0.8" />
                  <line x1="-42" y1="-72" x2="42" y2="-72" stroke="#1a1410" strokeWidth="0.5" />
                  <line x1="-42" y1="-46" x2="42" y2="-46" stroke="#1a1410" strokeWidth="0.5" />
                  <text
                    x="0"
                    y="-58"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize={book.physicist.length > 6 ? "10" : "12"}
                    fill="#ece6d6"
                    letterSpacing="0.08em"
                  >
                    {book.physicist}
                  </text>
                  <text
                    x="0"
                    y="-44"
                    textAnchor="middle"
                    fontFamily="'SF Mono', Consolas, monospace"
                    fontSize="7"
                    fill="#ece6d6"
                    opacity="0.6"
                    letterSpacing="0.2em"
                  >
                    VOL · {book.vol}
                  </text>
                  <g transform="translate(0 -82)">{SIGILS[book.id]}</g>
                </motion.g>
              </g>
            );
          })}

          <text x="0" y="180" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="9" letterSpacing="0.4em" fill="#c8941d" opacity="0.55">
            F O U R · V O L U M E S
          </text>
          <text x="0" y="200" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#ece6d6" opacity="0.45">
            choose a volume to enter
          </text>
        </g>

        <g transform="translate(920 270)">
          <rect x="-65" y="-90" width="130" height="180" fill="#3a2820" stroke="#c8941d" strokeWidth="1.2" opacity="0.9" />
          <text x="0" y="-72" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="8" letterSpacing="0.3em" fill="#c8941d" opacity="0.7">
            EXPERIMENTS
          </text>
          <line x1="-54" y1="-62" x2="54" y2="-62" stroke="#c8941d" strokeWidth="0.4" opacity="0.4" />
          <g transform="translate(0 -38)">
            <rect x="-52" y="-12" width="104" height="28" fill="#ece6d6" opacity="0.9" stroke="#c8941d" strokeWidth="0.4" />
            <text x="-44" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" fill="#1a1410" opacity="0.7" letterSpacing="0.1em">EXP-001</text>
            <text x="-44" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#1a1410">iq-blogger live</text>
            <circle cx="46" cy="-10" r="2" fill="#c8941d" />
          </g>
          <g transform="translate(0 6)">
            <rect x="-52" y="-12" width="104" height="28" fill="#ece6d6" opacity="0.85" stroke="#c8941d" strokeWidth="0.4" />
            <text x="-44" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" fill="#1a1410" opacity="0.7" letterSpacing="0.1em">EXP-002</text>
            <text x="-44" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#1a1410">iq-dev-lab ×25</text>
            <circle cx="46" cy="-10" r="2" fill="#c8941d" />
          </g>
          <g transform="translate(0 50)">
            <rect x="-52" y="-12" width="104" height="28" fill="#ece6d6" opacity="0.5" stroke="#c8941d" strokeWidth="0.4" strokeDasharray="2 2" />
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

          <text
            x="0"
            y="-40"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="11"
            fill="#ece6d6"
            opacity="0.5"
          >
            Conference No. {String(data.site.conferenceNumber).padStart(2, "0")}
          </text>
          <motion.text
            x="0"
            y="-22"
            textAnchor="middle"
            fontFamily="'SF Mono', Consolas, monospace"
            fontSize="9"
            letterSpacing="0.4em"
            fill="#c8941d"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            IN  PROGRESS
          </motion.text>

          <g
            transform="translate(-90 -2)"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/conferences")}
            role="button"
            aria-label="Open conference archive"
          >
            <motion.g
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect x="-26" y="-12" width="44" height="20" fill="#ece6d6" stroke="#1a1410" strokeWidth="0.5" opacity="0.92" />
              <line x1="-22" y1="-7" x2="14" y2="-7" stroke="#1a1410" strokeWidth="0.4" opacity="0.4" />
              <line x1="-22" y1="-3" x2="14" y2="-3" stroke="#1a1410" strokeWidth="0.4" opacity="0.4" />
              <line x1="-22" y1="1" x2="10" y2="1" stroke="#1a1410" strokeWidth="0.4" opacity="0.4" />
              <line x1="-22" y1="5" x2="14" y2="5" stroke="#1a1410" strokeWidth="0.4" opacity="0.4" />
              <rect x="-26" y="-12" width="6" height="20" fill="#c8941d" opacity="0.6" />
              <line x1="-30" y1="-13" x2="20" y2="-20" stroke="#1a1410" strokeWidth="0.6" />
              <circle cx="20" cy="-20" r="1.4" fill="#c8941d" />
            </motion.g>
            <text
              x="-4"
              y="22"
              textAnchor="middle"
              fontFamily="'SF Mono', Consolas, monospace"
              fontSize="8"
              letterSpacing="0.25em"
              fill="#c8941d"
              opacity="0.7"
            >
              ◀ open the archive
            </text>
          </g>

          <g opacity="0.85" transform="translate(70 0)">
            <rect x="-12" y="-10" width="22" height="14" fill="#ece6d6" stroke="#1a1410" strokeWidth="0.4" />
            <rect x="-16" y="-12" width="30" height="3" fill="#ece6d6" />
            <line x1="2" y1="-10" x2="10" y2="-20" stroke="#1a1410" strokeWidth="0.5" />
            <circle cx="10" cy="-20" r="1.3" fill="#1a1410" />
          </g>

          <g opacity="0.85" transform="translate(120 0)">
            <circle cx="0" cy="-2" r="1.8" fill="#1a1410" />
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#ece6d6" strokeWidth="1.8" />
            <ellipse cx="0" cy="-13" rx="3.5" ry="1.8" fill="#ece6d6" />
          </g>
        </g>

        <g fontFamily="'SF Mono', Consolas, monospace" fill="#ece6d6" opacity="0.45">
          <text x="500" y="568" textAnchor="middle" fontSize="9" letterSpacing="0.35em">
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
          aria-label="Back to arrival"
        >
          <text>← BACK</text>
        </g>
      </svg>
    </motion.div>
  );
}
