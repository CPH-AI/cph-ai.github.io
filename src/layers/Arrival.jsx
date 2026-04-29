import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Arrival() {
  const navigate = useNavigate();

  const enter = () => navigate("/study");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: "brightness(2)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", height: "100%", background: "#0e1218", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg
        viewBox="0 0 1000 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", maxHeight: "100vh" }}
      >
        <defs>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ece6d6" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#ece6d6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ece6d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#c8941d" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="doorGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="doorGlowHover" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f4c97a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#c8941d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="600" fill="#0e1218" />

        <g opacity="0.55" fill="#ece6d6">
          {[
            [120, 80, 0.8], [220, 40, 0.6], [340, 90, 0.7], [440, 55, 0.5],
            [560, 35, 0.7], [680, 80, 0.6], [780, 50, 0.8], [880, 95, 0.6],
            [60, 150, 0.5], [940, 160, 0.5]
          ].map(([cx, cy, r], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </g>

        <circle cx="850" cy="100" r="120" fill="url(#moon)" />
        <circle cx="850" cy="100" r="32" fill="#ece6d6" opacity="0.9" />
        <circle cx="845" cy="92" r="3" fill="#0e1218" opacity="0.15" />
        <circle cx="858" cy="105" r="2" fill="#0e1218" opacity="0.15" />

        <g fill="#1a1f2e" stroke="#2a2f3e" strokeWidth="0.5">
          <rect x="0" y="280" width="280" height="320" />
          <rect x="720" y="260" width="280" height="340" />
          <g fill="#0e1218" opacity="0.7">
            <rect x="40" y="320" width="30" height="40" />
            <rect x="100" y="320" width="30" height="40" />
            <rect x="160" y="320" width="30" height="40" />
            <rect x="220" y="320" width="30" height="40" />
            <rect x="40" y="400" width="30" height="40" />
            <rect x="100" y="400" width="30" height="40" />
            <rect x="160" y="400" width="30" height="40" />
            <rect x="220" y="400" width="30" height="40" />
          </g>
          <g fill="#0e1218" opacity="0.7">
            <rect x="750" y="300" width="30" height="40" />
            <rect x="810" y="300" width="30" height="40" />
            <rect x="870" y="300" width="30" height="40" />
            <rect x="930" y="300" width="30" height="40" />
            <rect x="750" y="380" width="30" height="40" />
            <rect x="810" y="380" width="30" height="40" />
            <rect x="870" y="380" width="30" height="40" />
            <rect x="930" y="380" width="30" height="40" />
          </g>
          <g fill="#f4c97a" opacity="0.45">
            <rect x="100" y="320" width="30" height="40" />
            <rect x="220" y="400" width="30" height="40" />
            <rect x="810" y="300" width="30" height="40" />
            <rect x="870" y="380" width="30" height="40" />
          </g>
        </g>

        <g fill="#1a1f2e" stroke="#3a3f4e" strokeWidth="1">
          <rect x="280" y="180" width="440" height="420" />
          <path d="M 280 180 L 280 140 L 720 140 L 720 180 Z" fill="#1a1f2e" />
          <path d="M 270 180 L 730 180 L 730 200 L 270 200 Z" fill="#252a39" />
        </g>

        <g fontFamily="Georgia, serif" fill="#c8941d" fontStyle="italic">
          <text x="500" y="170" textAnchor="middle" fontSize="13" letterSpacing="0.3em">
            HÔTEL MÉTROPOLE
          </text>
        </g>

        <g fill="#0e1218" stroke="#3a3f4e" strokeWidth="0.5">
          <rect x="320" y="240" width="60" height="100" />
          <rect x="410" y="240" width="60" height="100" />
          <rect x="530" y="240" width="60" height="100" />
          <rect x="620" y="240" width="60" height="100" />
          <rect x="320" y="380" width="60" height="100" />
          <rect x="620" y="380" width="60" height="100" />
          <line x1="350" y1="240" x2="350" y2="340" stroke="#3a3f4e" />
          <line x1="440" y1="240" x2="440" y2="340" stroke="#3a3f4e" />
          <line x1="560" y1="240" x2="560" y2="340" stroke="#3a3f4e" />
          <line x1="650" y1="240" x2="650" y2="340" stroke="#3a3f4e" />
          <line x1="320" y1="290" x2="380" y2="290" stroke="#3a3f4e" />
          <line x1="410" y1="290" x2="470" y2="290" stroke="#3a3f4e" />
          <line x1="530" y1="290" x2="590" y2="290" stroke="#3a3f4e" />
          <line x1="620" y1="290" x2="680" y2="290" stroke="#3a3f4e" />
        </g>

        <g>
          <motion.circle
            cx="320"
            cy="380"
            r="55"
            fill="url(#lamp)"
            animate={{ opacity: [0.55, 0.7, 0.55] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <line x1="320" y1="200" x2="320" y2="360" stroke="#3a3f4e" strokeWidth="2" />
          <circle cx="320" cy="370" r="8" fill="#f4c97a" opacity="0.95" />
          <rect x="316" y="378" width="8" height="14" fill="#3a3f4e" />
        </g>
        <g>
          <motion.circle
            cx="680"
            cy="380"
            r="55"
            fill="url(#lamp)"
            animate={{ opacity: [0.55, 0.7, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <line x1="680" y1="200" x2="680" y2="360" stroke="#3a3f4e" strokeWidth="2" />
          <circle cx="680" cy="370" r="8" fill="#f4c97a" opacity="0.95" />
          <rect x="676" y="378" width="8" height="14" fill="#3a3f4e" />
        </g>

        <motion.g
          style={{ cursor: "pointer" }}
          onClick={enter}
          role="button"
          tabIndex={0}
          aria-label="Enter the conference"
          whileHover="hover"
          initial="rest"
        >
          <motion.ellipse
            cx="500"
            cy="600"
            rx="180"
            ry="60"
            fill="url(#doorGlow)"
            variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
            transition={{ duration: 0.4 }}
          />
          <motion.ellipse
            cx="500"
            cy="600"
            rx="200"
            ry="80"
            fill="url(#doorGlowHover)"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
          />
          <rect x="430" y="380" width="140" height="220" fill="#2a1f15" stroke="#c8941d" strokeWidth="1.5" />
          <path d="M 430 380 Q 500 360 570 380" fill="none" stroke="#c8941d" strokeWidth="1.5" />
          <line x1="500" y1="380" x2="500" y2="600" stroke="#1a1010" strokeWidth="1.2" />
          <rect x="446" y="410" width="40" height="60" fill="none" stroke="#c8941d" strokeWidth="0.7" opacity="0.6" />
          <rect x="514" y="410" width="40" height="60" fill="none" stroke="#c8941d" strokeWidth="0.7" opacity="0.6" />
          <rect x="446" y="490" width="40" height="80" fill="none" stroke="#c8941d" strokeWidth="0.7" opacity="0.6" />
          <rect x="514" y="490" width="40" height="80" fill="none" stroke="#c8941d" strokeWidth="0.7" opacity="0.6" />
          <circle cx="488" cy="498" r="2.5" fill="#c8941d" />
          <circle cx="512" cy="498" r="2.5" fill="#c8941d" />
        </motion.g>

        <g fontFamily="'SF Mono', Consolas, monospace" fill="#ece6d6" opacity="0.55">
          <text x="500" y="50" textAnchor="middle" fontSize="11" letterSpacing="0.4em">
            BRUSSELS · OCTOBER 1927
          </text>
          <line x1="380" y1="62" x2="445" y2="62" stroke="#ece6d6" opacity="0.3" strokeWidth="0.5" />
          <line x1="555" y1="62" x2="620" y2="62" stroke="#ece6d6" opacity="0.3" strokeWidth="0.5" />
        </g>

        <g fontFamily="Georgia, serif" fontStyle="italic" fill="#ece6d6" opacity="0.85" style={{ pointerEvents: "none" }}>
          <text x="500" y="540" textAnchor="middle" fontSize="14" letterSpacing="0.15em">
            Enter the conference
          </text>
          <motion.text
            x="500"
            y="558"
            textAnchor="middle"
            fontSize="9"
            fontStyle="normal"
            fontFamily="'SF Mono', Consolas, monospace"
            letterSpacing="0.3em"
            fill="#c8941d"
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ▾  CLICK  ·  ENTER
          </motion.text>
        </g>
      </svg>
    </motion.div>
  );
}
