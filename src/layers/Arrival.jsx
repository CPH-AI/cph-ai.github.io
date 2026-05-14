import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useIsMobile } from "../hooks/useWindowSize.js";
import {
  DepthScene,
  EquationVeil,
  QuantumDust,
  SolvayBackdrop
} from "../components/Atmosphere.jsx";

const FIGURES = [-270, -210, -150, -92, -34, 34, 92, 150, 210, 270];

export default function Arrival() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const enter = useCallback(() => navigate("/study"), [navigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enter]);

  if (isMobile) return <MobileArrival enter={enter} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: "brightness(1.8)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", height: "100%" }}
    >
      <DepthScene className="arrival-depth" intensity={1.2}>
        <SolvayBackdrop />
        <EquationVeil />
        <QuantumDust />

        <div className="arrival-stage-object">
          <svg
            className="arrival-portal"
            viewBox="0 0 1000 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="arrivalLamp" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#c8941d" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="arrivalBronze" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.74" />
                <stop offset="42%" stopColor="#9f5f32" stopOpacity="0.62" />
                <stop offset="100%" stopColor="#1a1410" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="arrivalGlass" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ece6d6" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#5ba7d8" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0a0805" stopOpacity="0.42" />
              </linearGradient>
              <filter id="arrivalGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.g
              animate={{ opacity: [0.35, 0.68, 0.35] }}
              transition={{ duration: 6, repeat: Infinity }}
              filter="url(#arrivalGlow)"
            >
              <ellipse cx="500" cy="318" rx="350" ry="92" fill="url(#arrivalLamp)" opacity="0.56" />
              <ellipse cx="500" cy="544" rx="330" ry="58" fill="url(#arrivalLamp)" opacity="0.28" />
            </motion.g>

            <g transform="translate(500 330)" opacity="0.72">
              <ellipse cx="0" cy="122" rx="330" ry="60" fill="#050403" opacity="0.58" />
              <path
                d="M -336 122 C -268 64 -188 34 0 34 C 188 34 268 64 336 122 L 278 154 C 176 118 88 102 0 102 C -88 102 -176 118 -278 154 Z"
                fill="#120c08"
                stroke="#c8941d"
                strokeWidth="1"
                opacity="0.76"
              />
              <path
                d="M -286 114 C -210 77 -132 58 0 58 C 132 58 210 77 286 114"
                fill="none"
                stroke="#5ba7d8"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="10 12"
              />
              {FIGURES.map((x, i) => (
                <g key={x} transform={`translate(${x} ${76 + (i % 2) * 8})`}>
                  <circle r="10" fill="#d8c7a4" opacity={i === 4 || i === 5 ? 0.78 : 0.46} />
                  <path
                    d="M -16 14 Q 0 0 16 14 L 24 46 L -24 46 Z"
                    fill={i === 4 || i === 5 ? "#1a1410" : "#0b0907"}
                    opacity={i === 4 || i === 5 ? 0.9 : 0.7}
                  />
                  <path d="M -14 44 L 14 44" stroke="#c8941d" strokeWidth="0.8" opacity="0.35" />
                </g>
              ))}
            </g>

            <g transform="translate(500 282)">
              <path
                d="M -258 256 L 258 256 L 210 -198 Q 0 -256 -210 -198 Z"
                fill="url(#arrivalGlass)"
                stroke="url(#arrivalBronze)"
                strokeWidth="2"
                opacity="0.86"
              />
              <path
                d="M -212 -176 Q 0 -226 212 -176 L 172 222 L -172 222 Z"
                fill="none"
                stroke="#f4c97a"
                strokeWidth="0.8"
                opacity="0.26"
              />
              <path d="M 0 -218 L 0 252" stroke="#f4c97a" strokeWidth="0.7" opacity="0.24" />
              <path d="M -174 -123 Q 0 -156 174 -123" fill="none" stroke="#ece6d6" strokeWidth="0.7" opacity="0.2" />
              <path d="M -194 -52 Q 0 -84 194 -52" fill="none" stroke="#ece6d6" strokeWidth="0.7" opacity="0.16" />
              <path d="M -214 48 Q 0 18 214 48" fill="none" stroke="#ece6d6" strokeWidth="0.7" opacity="0.14" />
              <path d="M -230 150 Q 0 122 230 150" fill="none" stroke="#ece6d6" strokeWidth="0.7" opacity="0.12" />
            </g>

          </svg>

          <div className="arrival-title" aria-hidden="true">
            <span>Conseil de Copenhagen</span>
            <strong>COPENHAGEN AI</strong>
            <em>between observation and collapse</em>
          </div>

          <div className="arrival-enter-wrap">
            <motion.button
              className="arrival-enter"
              onClick={enter}
              whileHover={{ y: -5, scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Enter the conference"
            >
              <span>ENTER THE CONFERENCE</span>
            </motion.button>
          </div>
        </div>
      </DepthScene>
    </motion.div>
  );
}

function MobileArrival({ enter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", height: "100%" }}
    >
      <DepthScene className="arrival-depth arrival-depth--mobile" intensity={0.4}>
        <SolvayBackdrop />
        <QuantumDust density="light" />
        <div className="arrival-mobile-copy">
          <span>Conseil de Copenhagen</span>
          <strong>
            COPENHAGEN
            <br />
            AI
          </strong>
          <em>Mastering the Art of AI Utilization</em>
          <button onClick={enter} aria-label="Enter the conference">
            ENTER THE CONFERENCE
          </button>
        </div>
      </DepthScene>
    </motion.div>
  );
}
