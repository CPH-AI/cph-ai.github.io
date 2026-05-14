import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import data from "../data/members.json";
import conferencesData from "../data/conferences.json";
import { useIsMobile } from "../hooks/useWindowSize.js";
import {
  DepthScene,
  EquationVeil,
  QuantumDust,
  SolvayBackdrop
} from "../components/Atmosphere.jsx";

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
      style={{ width: "100%", height: "100%" }}
    >
      <DepthScene className="study-depth" intensity={0.9}>
        <SolvayBackdrop variant="study" />
        <EquationVeil compact />
        <QuantumDust density="light" />
      <svg
        className="study-cinema-svg"
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
          <radialGradient id="councilTable" cx="50%" cy="42%" r="64%">
            <stop offset="0%" stopColor="#4a3525" stopOpacity="0.95" />
            <stop offset="58%" stopColor="#2a1a10" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#090604" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="stageRiser" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#493020" />
            <stop offset="55%" stopColor="#25160e" />
            <stop offset="100%" stopColor="#090604" />
          </linearGradient>
          <linearGradient id="podiumFace" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#21130c" />
            <stop offset="28%" stopColor="#5a3924" />
            <stop offset="54%" stopColor="#7a4b2c" />
            <stop offset="82%" stopColor="#2b1a10" />
            <stop offset="100%" stopColor="#120b07" />
          </linearGradient>
          <linearGradient id="podiumTop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7c5032" />
            <stop offset="100%" stopColor="#2a1a10" />
          </linearGradient>
          <radialGradient id="stageLamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#c8941d" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bookGilding" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8b5a18" />
            <stop offset="45%" stopColor="#f4c97a" />
            <stop offset="100%" stopColor="#9f5f32" />
          </linearGradient>
          <linearGradient id="bookPageEdge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f7efd9" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#8d795a" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <rect width="1000" height="600" fill="#1a1410" opacity="0.82" />
        <rect width="1000" height="80" fill="url(#ceilingGlow)" />

        <g transform="translate(500 38)" opacity="0.5">
          <g fill="none" stroke="#c8941d" strokeWidth="0.6">
            <ellipse rx="36" ry="12" />
            <ellipse rx="36" ry="12" transform="rotate(60)" />
            <ellipse rx="36" ry="12" transform="rotate(-60)" />
          </g>
          <circle r="2" fill="#c8941d" />
        </g>

        <rect x="0" y="80" width="1000" height="350" fill="#241a12" opacity="0.78" />
        <path d="M 0 80 L 150 136 L 150 430 L 0 430 Z" fill="#120d09" opacity="0.54" />
        <path d="M 1000 80 L 850 136 L 850 430 L 1000 430 Z" fill="#0d1816" opacity="0.44" />
        <path d="M 150 136 L 850 136 L 805 420 L 195 420 Z" fill="#1c120c" opacity="0.36" />
        <g opacity="0.18" stroke="#3a2a1a" strokeWidth="0.5">
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="180" x2="1000" y2="180" />
          <line x1="0" y1="260" x2="1000" y2="260" />
          <line x1="0" y1="340" x2="1000" y2="340" />
        </g>
        <g opacity="0.58">
          <path d="M 158 120 Q 248 172 254 420" fill="none" stroke="#6e3c22" strokeWidth="10" strokeOpacity="0.25" />
          <path d="M 842 120 Q 752 172 746 420" fill="none" stroke="#6e3c22" strokeWidth="10" strokeOpacity="0.25" />
          <path d="M 180 124 L 180 420" stroke="#c8941d" strokeWidth="0.7" opacity="0.35" />
          <path d="M 820 124 L 820 420" stroke="#c8941d" strokeWidth="0.7" opacity="0.35" />
        </g>
        <g transform="translate(500 112)" opacity="0.5">
          <rect x="-176" y="-22" width="352" height="34" fill="#120b07" stroke="#c8941d" strokeWidth="0.6" />
          <path d="M -128 -5 L -34 -5 M 34 -5 L 128 -5" stroke="#c8941d" strokeWidth="0.5" opacity="0.8" />
          <circle cx="-16" cy="-5" r="2" fill="#c8941d" opacity="0.72" />
          <circle cx="16" cy="-5" r="2" fill="#c8941d" opacity="0.72" />
        </g>
        <rect x="0" y="430" width="1000" height="170" fill="url(#floor)" />
        <rect x="0" y="425" width="1000" height="6" fill="#3a2a1a" />

        <g transform="translate(500 404)" opacity="0.9">
          <ellipse cx="0" cy="88" rx="380" ry="70" fill="#090604" opacity="0.58" />
          <path d="M -410 84 C -300 26 -172 -6 0 -6 C 172 -6 300 26 410 84 L 348 126 C 214 84 102 70 0 70 C -102 70 -214 84 -348 126 Z" fill="#100905" opacity="0.82" />
          <path
            d="M -330 24 C -228 -24 -118 -42 0 -42 C 118 -42 228 -24 330 24 L 286 72 C 172 38 86 24 0 24 C -86 24 -172 38 -286 72 Z"
            fill="url(#councilTable)"
            stroke="#c8941d"
            strokeWidth="1.2"
            opacity="0.94"
          />
          <path d="M -330 24 C -228 -24 -118 -42 0 -42 C 118 -42 228 -24 330 24" fill="none" stroke="#f4c97a" strokeWidth="1" opacity="0.36" />
          <path d="M -292 58 C -178 22 -78 12 0 12 C 78 12 178 22 292 58" fill="none" stroke="#c8941d" strokeWidth="0.7" opacity="0.4" />
          <motion.path
            d="M -284 18 C -174 -14 -78 -25 0 -25 C 78 -25 174 -14 284 18"
            fill="none"
            stroke="#5ba7d8"
            strokeWidth="0.8"
            strokeDasharray="6 10"
            animate={{ strokeOpacity: [0.18, 0.46, 0.18] }}
            transition={{ duration: 4.8, repeat: Infinity }}
          />
          {[-286, -228, -170, -112, -54, 54, 112, 170, 228, 286].map((x, i) => (
            <g key={x} transform={`translate(${x} ${i % 2 === 0 ? -32 : -20})`}>
              <circle r="8" fill="#d8c7a4" opacity={i === 4 || i === 5 ? 0.66 : 0.44} />
              <path d="M -14 11 Q 0 0 14 11 L 22 40 L -22 40 Z" fill="#0b0907" opacity={i === 4 || i === 5 ? 0.86 : 0.74} />
              <path d="M -10 34 L 10 34" stroke="#c8941d" strokeWidth="0.6" opacity="0.36" />
              <line x1="0" y1="42" x2="0" y2="56" stroke="#c8941d" strokeWidth="0.5" opacity="0.28" />
            </g>
          ))}
        </g>

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

        <g transform="translate(500 142)">
          <rect x="-238" y="0" width="476" height="136" fill="#24170f" stroke="#c8941d" strokeWidth="1" opacity="0.84" />
          <rect x="-224" y="14" width="448" height="74" fill="#120c08" stroke="#6e3c22" strokeWidth="0.6" opacity="0.72" />
          <line x1="-238" y1="68" x2="238" y2="68" stroke="#c8941d" strokeWidth="0.7" opacity="0.35" />
          <line x1="-238" y1="136" x2="238" y2="136" stroke="#c8941d" strokeWidth="1.2" />
          <g fill="#c8941d" opacity="0.4">
            <rect x="-236" y="2" width="2" height="132" />
            <rect x="234" y="2" width="2" height="132" />
          </g>

          {data.books.map((book, i) => {
            const isFocused = focused === i;
            return (
              <g key={book.id} transform={`translate(${positions[i] * 0.72} 104) scale(0.82)`}>
                <motion.g
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => openBook(book.id)}
                  onMouseEnter={() => setFocused(i)}
                  role="button"
                  aria-label={`Open ${book.physicist}`}
                  animate={{ y: isFocused ? -8 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ellipse cx="8" cy="9" rx="54" ry="10" fill="#050302" opacity="0.44" />
                  <path d="M -39 -99 L 48 -99 L 57 -91 L 57 4 L 48 -3 L 48 -91 L -39 -91 Z" fill="url(#bookPageEdge)" opacity="0.62" />
                  <path d="M -39 0 L 48 0 L 57 7 L -30 7 Z" fill="url(#bookPageEdge)" opacity="0.46" />
                  <rect
                    x="-50"
                    y="-106"
                    width="98"
                    height="108"
                    rx="2"
                    fill={book.coverColor}
                    stroke={isFocused ? "#f4c97a" : "#1a1410"}
                    strokeWidth={isFocused ? 1.8 : 1.1}
                  />
                  <rect x="-50" y="-106" width="14" height="108" fill="#090604" opacity="0.26" />
                  <line x1="-35" y1="-101" x2="-35" y2="-4" stroke="#f4c97a" strokeWidth="0.6" opacity="0.32" />
                  <rect x="-43" y="-99" width="84" height="12" fill="url(#bookGilding)" opacity="0.88" />
                  <rect x="-43" y="-16" width="84" height="12" fill="url(#bookGilding)" opacity="0.88" />
                  <rect x="-28" y="-76" width="58" height="34" fill="#0a0805" opacity="0.16" stroke="#f4c97a" strokeWidth="0.45" strokeOpacity="0.35" />
                  <path d="M -43 -80 L -32 -80 L -32 -69 M 41 -80 L 30 -80 L 30 -69 M -43 -36 L -32 -36 L -32 -47 M 41 -36 L 30 -36 L 30 -47" fill="none" stroke="#f4c97a" strokeWidth="0.7" opacity="0.5" />
                  <line x1="-28" y1="-66" x2="30" y2="-66" stroke="#1a1410" strokeWidth="0.5" opacity="0.55" />
                  <line x1="-28" y1="-52" x2="30" y2="-52" stroke="#1a1410" strokeWidth="0.5" opacity="0.55" />
                  <motion.path
                    d="M -45 -102 L 44 -102 L 44 0 L -45 0 Z"
                    fill="none"
                    stroke="#f4c97a"
                    strokeWidth="0.6"
                    strokeOpacity={isFocused ? 0.68 : 0.24}
                  />
                  <text
                    x="1"
                    y="-59"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize={book.physicist.length > 8 ? "9" : "11"}
                    fill="#ece6d6"
                    letterSpacing="0.06em"
                  >
                    {book.physicist}
                  </text>
                  <text
                    x="1"
                    y="-28"
                    textAnchor="middle"
                    fontFamily="'SF Mono', Consolas, monospace"
                    fontSize="6"
                    fill="#f4c97a"
                    opacity="0.68"
                    letterSpacing="0.2em"
                  >
                    VOL · {book.vol}
                  </text>
                  <text
                    x="1"
                    y="-20"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize="5.8"
                    fill="#ece6d6"
                    opacity="0.44"
                  >
                    {book.role}
                  </text>
                  <g transform="translate(0 -84)">{SIGILS[book.id]}</g>
                </motion.g>
              </g>
            );
          })}

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

        <g transform="translate(500 502)">
          <ellipse cx="0" cy="42" rx="252" ry="36" fill="#050302" opacity="0.64" />
          <path
            d="M -300 18 L 300 18 L 364 78 L -364 78 Z"
            fill="url(#stageRiser)"
            stroke="#c8941d"
            strokeWidth="1"
            opacity="0.94"
          />
          <path d="M -300 18 L 300 18" stroke="#f4c97a" strokeWidth="0.8" opacity="0.34" />
          <path d="M -250 44 L 250 44" stroke="#5ba7d8" strokeWidth="0.5" strokeDasharray="7 10" opacity="0.28" />
        </g>

        <g transform="translate(500 348)">
          <motion.ellipse
            cx="0"
            cy="86"
            rx="190"
            ry="72"
            fill="url(#stageLamp)"
            animate={{ opacity: [0.58, 0.86, 0.58] }}
            transition={{ duration: 5.2, repeat: Infinity }}
          />
          <g opacity="0.78">
            <line x1="-94" y1="12" x2="-146" y2="-46" stroke="#c8941d" strokeWidth="0.7" />
            <line x1="94" y1="12" x2="146" y2="-46" stroke="#c8941d" strokeWidth="0.7" />
            <circle cx="-148" cy="-48" r="17" fill="url(#stageLamp)" opacity="0.72" />
            <circle cx="148" cy="-48" r="17" fill="url(#stageLamp)" opacity="0.72" />
            <circle cx="-148" cy="-48" r="3" fill="#f4c97a" opacity="0.9" />
            <circle cx="148" cy="-48" r="3" fill="#f4c97a" opacity="0.9" />
          </g>
          <motion.g
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/conferences")}
            role="button"
            aria-label="Open conference archive"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ellipse cx="0" cy="184" rx="138" ry="18" fill="#050302" opacity="0.62" />
            <path d="M -112 0 L 112 0 L 136 32 L -136 32 Z" fill="url(#podiumTop)" stroke="#f4c97a" strokeWidth="1.1" />
            <path d="M -136 32 L 136 32 L 112 190 L -112 190 Z" fill="url(#podiumFace)" stroke="#c8941d" strokeWidth="1.1" />
            <path d="M -102 54 L 102 54 L 86 160 L -86 160 Z" fill="#120b07" stroke="#c8941d" strokeWidth="0.7" opacity="0.72" />
            <path d="M -72 32 L -54 190" stroke="#f4c97a" strokeWidth="0.5" opacity="0.26" />
            <path d="M 72 32 L 54 190" stroke="#f4c97a" strokeWidth="0.5" opacity="0.26" />
            <path d="M -68 12 Q -36 -14 0 12 Q 36 -14 68 12" fill="none" stroke="#ece6d6" strokeWidth="0.9" opacity="0.36" />
            <circle cx="-24" cy="10" r="3" fill="#1a1410" stroke="#c8941d" strokeWidth="0.5" />
            <circle cx="24" cy="10" r="3" fill="#1a1410" stroke="#c8941d" strokeWidth="0.5" />
            <line x1="-24" y1="10" x2="-54" y2="-12" stroke="#c8941d" strokeWidth="0.7" opacity="0.72" />
            <line x1="24" y1="10" x2="54" y2="-12" stroke="#c8941d" strokeWidth="0.7" opacity="0.72" />

            <g textAnchor="middle">
              <line x1="-64" y1="78" x2="64" y2="78" stroke="#c8941d" strokeWidth="0.55" opacity="0.56" />
              <text x="0" y="102" fontFamily="Georgia, serif" fontWeight="700" fontSize="18" fill="#ece6d6" letterSpacing="0.04em">
                CONFERENCE
              </text>
              <text x="0" y="122" fontFamily="'SF Mono', Consolas, monospace" fontSize="9" letterSpacing="0.2em" fill="#f4c97a" opacity="0.85">
                No. {String(data.site.conferenceNumber).padStart(2, "0")}
              </text>
              <text x="0" y="142" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill="#ece6d6" opacity="0.56">
                open the archive
              </text>
            </g>
          </motion.g>
        </g>

        <g transform="translate(246 486)">
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
      </DepthScene>
    </motion.div>
  );
}

function MobileStudy({ navigate, openBook, openQuestions, experiments, conferenceNumber }) {
  const noStr = String(conferenceNumber).padStart(2, "0");

  return (
    <motion.div
      className="archive-surface"
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

        <button
          onClick={() => navigate("/conferences")}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "156px",
            background: "linear-gradient(160deg, rgba(74,48,32,0.86), rgba(12,8,5,0.96))",
            border: "0.5px solid rgba(244,201,122,0.58)",
            padding: "20px 16px",
            cursor: "pointer",
            textAlign: "center",
            marginBottom: "28px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.32), inset 0 0 34px rgba(244,201,122,0.06)",
            overflow: "hidden"
          }}
        >
          <div style={{
            position: "absolute",
            left: "-12%",
            right: "-12%",
            bottom: "-24px",
            height: "70px",
            borderTop: "1px solid rgba(200,148,29,0.55)",
            borderRadius: "50% 50% 0 0",
            opacity: 0.7
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.34em", color: "var(--amber)", opacity: 0.86, marginBottom: "14px" }}>
              COUNCIL  FLOOR
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "26px", letterSpacing: "0.04em", color: "var(--parchment)", lineHeight: 1.05 }}>
              CONFERENCE
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.24em", color: "var(--amber)", opacity: 0.86, marginTop: "8px" }}>
              No. {noStr}
            </div>
          </div>
        </button>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.35em", color: "var(--amber)", opacity: 0.7, marginBottom: "12px" }}>
            F O U R · V O L U M E S
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "10px",
              width: "100%",
              maxWidth: "358px",
              overflow: "hidden"
            }}
          >
            {data.books.map((book) => (
              <button
                key={book.id}
                onClick={() => openBook(book.id)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  minWidth: 0,
                  minHeight: "92px",
                  background: `linear-gradient(135deg, ${book.coverColor} 0%, ${book.coverColor} 58%, #120b07 100%)`,
                  border: "0.5px solid #c8941d",
                  boxShadow: "0 18px 32px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(244,201,122,0.08)",
                  padding: "18px 14px 16px 26px",
                  textAlign: "left",
                  cursor: "pointer"
                }}
              >
                <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "9px", background: "rgba(8,5,3,0.28)", borderRight: "0.5px solid rgba(244,201,122,0.34)" }} />
                <span style={{ position: "absolute", left: "13px", right: "12px", top: "9px", height: "7px", background: "linear-gradient(90deg, rgba(159,95,50,0.7), rgba(244,201,122,0.82), rgba(159,95,50,0.7))" }} />
                <span style={{ position: "absolute", left: "13px", right: "12px", bottom: "9px", height: "7px", background: "linear-gradient(90deg, rgba(159,95,50,0.7), rgba(244,201,122,0.82), rgba(159,95,50,0.7))" }} />
                <div style={{ position: "relative", fontFamily: "var(--mono)", fontSize: "7px", letterSpacing: "0.25em", color: "#c8941d", opacity: 0.86, marginBottom: "6px" }}>
                  VOL · {book.vol}
                </div>
                <div style={{ position: "relative", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "var(--parchment)" }}>
                  {book.physicist}
                </div>
                <div style={{ position: "relative", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "10px", color: "var(--parchment)", opacity: 0.6, marginTop: "4px" }}>
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

      </div>
    </motion.div>
  );
}
