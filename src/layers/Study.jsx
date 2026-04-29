import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import data from "../data/members.json";
import conferencesData from "../data/conferences.json";
import { useIsMobile } from "../hooks/useWindowSize.js";

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

function compressQuestion(q) {
  if (q.length <= 16) return q;
  return q.slice(0, 15) + "…";
}

export default function Study() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(0);
  const isMobile = useIsMobile();

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

  const openQuestions = useMemo(() => {
    return conferencesData.conferences
      .filter((c) => c.type === "session")
      .flatMap((c) =>
        (c.openQuestions || []).map((q, i) => ({
          ...q,
          conferenceNo: c.no,
          idx: i,
          raisedByName:
            data.books.find((b) => b.id === q.raisedBy)?.physicist || ""
        }))
      )
      .filter((q) => q.status === "superposition")
      .sort((a, b) => b.conferenceNo - a.conferenceNo);
  }, []);

  const visibleQuestions = openQuestions.slice(0, 3);
  const moreQuestions = Math.max(0, openQuestions.length - 3);

  if (isMobile) {
    return (
      <MobileStudy
        navigate={navigate}
        openBook={openBook}
        openQuestions={openQuestions}
        experiments={data.books[0].experiments}
        conferenceNumber={data.site.conferenceNumber}
        nextConferenceDays={data.site.nextConferenceInDays}
      />
    );
  }

  const positions = [-195, -65, 65, 195];

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
          <radialGradient id="lecGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bookCover" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5a3a2a" />
            <stop offset="100%" stopColor="#3a2a1f" />
          </linearGradient>
          <linearGradient id="lecCol" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2a1f15" />
            <stop offset="50%" stopColor="#3a2820" />
            <stop offset="100%" stopColor="#241a12" />
          </linearGradient>
          <linearGradient id="lecTop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4a3525" />
            <stop offset="100%" stopColor="#2a1f15" />
          </linearGradient>
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

        <g transform="translate(85 270)">
          <rect x="-75" y="-110" width="150" height="220" fill="#3a2820" stroke="#c8941d" strokeWidth="1.2" opacity="0.9" />
          <text x="0" y="-92" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" letterSpacing="0.25em" fill="#c8941d" opacity="0.7">
            OPEN  QUESTIONS
          </text>
          <line x1="-64" y1="-82" x2="64" y2="-82" stroke="#c8941d" strokeWidth="0.4" opacity="0.4" />

          {visibleQuestions.map((q, i) => {
            const baseY = -56 + i * 46;
            return (
              <motion.g
                key={`${q.conferenceNo}-${q.idx}`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/conference/${q.conferenceNo}#open-questions`)}
                role="button"
                aria-label={`Question raised by ${q.raisedByName}`}
                initial={{ y: baseY }}
                animate={{ y: baseY }}
                whileHover={{ y: baseY - 3 }}
                transition={{ duration: 0.2 }}
              >
                <rect x="-62" y="-12" width="124" height="34" fill="#ece6d6" opacity="0.85" stroke="#c8941d" strokeWidth="0.4" strokeDasharray="2 2" />
                <text x="-54" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="6" fill="#1a1410" opacity="0.55" letterSpacing="0.15em">
                  No.{q.conferenceNo} · {q.raisedByName}
                </text>
                <text x="-54" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="8" fill="#1a1410">
                  ⊙ {compressQuestion(q.question)}
                </text>
                <text x="-54" y="19" fontFamily="Georgia, serif" fontStyle="italic" fontSize="7" fill="#1a1410" opacity="0.55">
                  superposition
                </text>
                <circle cx="56" cy="-8" r="2" fill="#c8941d" opacity="0.7" />
              </motion.g>
            );
          })}

          {visibleQuestions.length === 0 && (
            <g transform="translate(0 0)">
              <rect x="-62" y="-12" width="124" height="40" fill="#ece6d6" opacity="0.4" stroke="#c8941d" strokeWidth="0.4" strokeDasharray="2 2" />
              <text x="0" y="6" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#ece6d6" opacity="0.55">
                no questions yet
              </text>
              <text x="0" y="20" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="7" fill="#ece6d6" opacity="0.4">
                first conference pending
              </text>
            </g>
          )}

          {moreQuestions > 0 && (
            <text
              x="0"
              y="100"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontSize="9"
              fill="#ece6d6"
              opacity="0.55"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/questions")}
            >
              + {moreQuestions} more  ▸
            </text>
          )}
          {moreQuestions === 0 && visibleQuestions.length > 0 && (
            <text
              x="0"
              y="100"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontSize="8"
              fill="#ece6d6"
              opacity="0.4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/questions")}
            >
              all questions  ▸
            </text>
          )}
        </g>

        <g transform="translate(500 140)">
          <rect x="-260" y="0" width="520" height="220" fill="#2a1f15" stroke="#c8941d" strokeWidth="1.2" opacity="0.95" />
          <line x1="-260" y1="110" x2="260" y2="110" stroke="#c8941d" strokeWidth="1" opacity="0.5" />
          <line x1="-260" y1="220" x2="260" y2="220" stroke="#c8941d" strokeWidth="1.5" />
          <g fill="#c8941d" opacity="0.4">
            <rect x="-258" y="2" width="2" height="216" />
            <rect x="256" y="2" width="2" height="216" />
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
          <rect x="-65" y="-110" width="130" height="220" fill="#3a2820" stroke="#c8941d" strokeWidth="1.2" opacity="0.9" />
          <text x="0" y="-92" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" letterSpacing="0.3em" fill="#c8941d" opacity="0.7">
            EXPERIMENTS
          </text>
          <line x1="-54" y1="-82" x2="54" y2="-82" stroke="#c8941d" strokeWidth="0.4" opacity="0.4" />

          {data.books[0].experiments.map((exp, i) => {
            const isLive = exp.status === "live";
            const yPos = -68 + i * 40;
            return (
              <motion.g
                key={exp.name}
                initial={{ y: yPos }}
                animate={{ y: yPos }}
                whileHover={exp.url ? { y: yPos - 2 } : {}}
                transition={{ duration: 0.2 }}
                style={{ cursor: exp.url ? "pointer" : "default" }}
                onClick={() => exp.url && window.open(exp.url, "_blank")}
              >
                <rect x="-52" y="-12" width="104" height="28"
                  fill={isLive ? "#ece6d6" : "#ece6d6"}
                  opacity={isLive ? 0.9 : 0.5}
                  stroke="#c8941d" strokeWidth="0.4"
                  strokeDasharray={isLive ? "none" : "2 2"}
                />
                <text x="-44" y="-2" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" fill="#1a1410" opacity="0.7" letterSpacing="0.1em">
                  EXP-{String(i + 1).padStart(3, "0")}
                </text>
                <text x="-44" y="9" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#1a1410">
                  {exp.name}
                </text>
                <circle cx="46" cy="-10" r="2" fill={isLive ? "#1d9e75" : "#c8941d"} opacity={isLive ? 1 : 0.6} />
              </motion.g>
            );
          })}
        </g>

        <g transform="translate(500 540)">
          <ellipse cx="0" cy="6" rx="78" ry="8" fill="#0a0805" opacity="0.55" />
        </g>

        <g transform="translate(620 480)">
          <text x="0" y="0" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#ece6d6" opacity="0.55">
            Conference No. {String(data.site.conferenceNumber).padStart(2, "0")}
          </text>
          <motion.text
            x="0"
            y="20"
            fontFamily="'SF Mono', Consolas, monospace"
            fontSize="9"
            letterSpacing="0.4em"
            fill="#c8941d"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            IN  PROGRESS
          </motion.text>
        </g>

        <g transform="translate(500 415)">
          <path d="M -38 120 L 38 120 L 32 0 L -32 0 Z" fill="url(#lecCol)" stroke="#c8941d" strokeWidth="0.6" />
          <line x1="-32" y1="0" x2="-38" y2="120" stroke="#c8941d" strokeWidth="0.5" opacity="0.4" />
          <line x1="32" y1="0" x2="38" y2="120" stroke="#c8941d" strokeWidth="0.5" opacity="0.4" />
          <rect x="-46" y="116" width="92" height="6" fill="#3a2820" stroke="#c8941d" strokeWidth="0.5" />
          <path d="M -52 -5 L 52 -5 L 60 5 L -60 5 Z" fill="url(#lecTop)" stroke="#c8941d" strokeWidth="0.7" />
          <path d="M -60 5 L 60 5 L 56 -22 L -56 -22 Z" fill="#3a2820" stroke="#c8941d" strokeWidth="0.7" />
          <line x1="-56" y1="-22" x2="56" y2="-22" stroke="#c8941d" strokeWidth="0.5" opacity="0.5" />

          <motion.g
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/conferences")}
            role="button"
            aria-label="Open conference archive"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ellipse cx="0" cy="-5" rx="60" ry="6" fill="url(#lecGlow)" opacity="0.7" />
            <g transform="translate(0 -14)">
              <rect x="-46" y="-3" width="92" height="3" fill="#1a1410" opacity="0.5" />
              <rect x="-46" y="-22" width="92" height="22" fill="url(#bookCover)" stroke="#c8941d" strokeWidth="0.7" />
              <rect x="-46" y="-22" width="6" height="22" fill="#c8941d" opacity="0.7" />
              <rect x="-38" y="-22" width="2" height="22" fill="#1a1410" opacity="0.5" />
              <text x="0" y="-15" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="6" letterSpacing="0.35em" fill="#c8941d" opacity="0.85">VOL · 2025</text>
              <line x1="-32" y1="-12" x2="32" y2="-12" stroke="#c8941d" strokeWidth="0.4" opacity="0.6" />
              <text x="0" y="-3" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="10" fill="#ece6d6" letterSpacing="0.05em">CONFERENCE  No.  {String(data.site.conferenceNumber).padStart(2, "0")}</text>
            </g>
          </motion.g>
        </g>

        <g transform="translate(255 480)">
          <circle r="34" fill="url(#warmLight)" opacity="0.45" />
          <circle r="26" fill="#1a1410" stroke="#c8941d" strokeWidth="1.4" />
          <circle r="24" fill="#ece6d6" opacity="0.92" />
          <g stroke="#1a1410" strokeWidth="0.7" strokeLinecap="round">
            <line x1="0" y1="-20" x2="0" y2="-17" />
            <line x1="20" y1="0" x2="17" y2="0" />
            <line x1="0" y1="20" x2="0" y2="17" />
            <line x1="-20" y1="0" x2="-17" y2="0" />
          </g>
          <line x1="0" y1="0" x2="0" y2="-14" stroke="#1a1410" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="9" y2="5" stroke="#1a1410" strokeWidth="1.6" strokeLinecap="round" />
          <circle r="1.6" fill="#1a1410" />
          <text y="44" textAnchor="middle" fontFamily="'SF Mono', Consolas, monospace" fontSize="7" letterSpacing="0.25em" fill="#c8941d" opacity="0.85">
            NEXT  ·  in  {data.site.nextConferenceInDays}  days
          </text>
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

function MobileStudy({ navigate, openBook, openQuestions, experiments, conferenceNumber, nextConferenceDays }) {
  const noStr = String(conferenceNumber).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1410",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div style={{ padding: "20px 16px 40px" }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <button
            onClick={() => navigate("/")}
            style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.3em", color: "var(--amber)", opacity: 0.8 }}
          >
            ← BACK
          </button>
          <span style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.3em", color: "var(--parchment)", opacity: 0.4 }}>
            THE  STUDY
          </span>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.35em", color: "var(--amber)", opacity: 0.7, marginBottom: "12px" }}>
            F O U R · V O L U M E S
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {data.books.map((book) => (
              <button
                key={book.id}
                onClick={() => openBook(book.id)}
                style={{
                  background: book.coverColor,
                  border: "0.5px solid #c8941d",
                  padding: "16px 12px",
                  textAlign: "left",
                  cursor: "pointer"
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "7px", letterSpacing: "0.25em", color: "#c8941d", opacity: 0.8, marginBottom: "4px" }}>
                  VOL · {book.vol}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "15px", color: "var(--parchment)" }}>
                  {book.physicist}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "10px", color: "var(--parchment)", opacity: 0.55, marginTop: "4px" }}>
                  {book.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.3em", color: "var(--amber)", opacity: 0.7, marginBottom: "12px" }}>
            OPEN  QUESTIONS
          </div>
          {openQuestions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {openQuestions.map((q) => (
                <button
                  key={`${q.conferenceNo}-${q.idx}`}
                  onClick={() => navigate(`/conference/${q.conferenceNo}#open-questions`)}
                  style={{
                    textAlign: "left",
                    background: "#241a12",
                    border: "0.5px dashed rgba(200,148,29,0.45)",
                    padding: "10px 12px",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ fontFamily: "var(--mono)", fontSize: "7px", letterSpacing: "0.15em", color: "var(--amber)", opacity: 0.7, marginBottom: "4px" }}>
                    No.{q.conferenceNo} · {q.raisedByName}
                  </div>
                  <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "12px", color: "var(--parchment)", lineHeight: 1.4 }}>
                    ⊙ {q.question}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "12px", color: "var(--parchment)", opacity: 0.4 }}>
              — 아직 발의된 질문이 없습니다
            </div>
          )}
        </div>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.3em", color: "var(--amber)", opacity: 0.7, marginBottom: "12px" }}>
            EXPERIMENTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {experiments.map((exp, i) => (
              <button
                key={exp.name}
                onClick={() => exp.url && window.open(exp.url, "_blank")}
                style={{
                  textAlign: "left",
                  background: "#241a12",
                  border: exp.status === "live" ? "0.5px solid rgba(200,148,29,0.4)" : "0.5px dashed rgba(200,148,29,0.3)",
                  padding: "10px 12px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "7px", letterSpacing: "0.15em", color: "var(--parchment)", opacity: 0.5, marginBottom: "3px" }}>
                    EXP-{String(i + 1).padStart(3, "0")}
                  </div>
                  <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "13px", color: "var(--parchment)" }}>
                    {exp.name}
                  </div>
                </div>
                <div style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: exp.status === "live" ? "#1d9e75" : "#c8941d",
                  opacity: exp.status === "live" ? 1 : 0.6,
                  flexShrink: 0
                }} />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/conferences")}
          style={{
            width: "100%",
            background: "#241a12",
            border: "0.5px solid rgba(200,148,29,0.5)",
            padding: "16px",
            cursor: "pointer",
            textAlign: "center"
          }}
        >
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "11px", color: "var(--parchment)", opacity: 0.55, marginBottom: "6px" }}>
            Conference No. {noStr}
          </div>
          <motion.div
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.4em", color: "var(--amber)" }}
          >
            IN  PROGRESS
          </motion.div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.2em", color: "var(--parchment)", opacity: 0.35, marginTop: "8px" }}>
            NEXT · in {nextConferenceDays} days  ·  tap to open archive
          </div>
        </button>

        <div style={{ textAlign: "center", marginTop: "32px", fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.3em", color: "var(--parchment)", opacity: 0.25 }}>
          THE  STUDY  ·  COPENHAGEN  AI
        </div>
      </div>
    </motion.div>
  );
}
