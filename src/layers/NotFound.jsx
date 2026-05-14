import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="archive-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1410",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <svg
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <defs>
          <radialGradient id="collapse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8941d" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1a1410" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="300" cy="200" rx="280" ry="180" fill="url(#collapse)" />

        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <circle cx="300" cy="200" r="140" fill="none" stroke="#c8941d" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="300" cy="200" r="100" fill="none" stroke="#c8941d" strokeWidth="0.5" strokeDasharray="3 12" />
          <circle cx="300" cy="200" r="60"  fill="none" stroke="#c8941d" strokeWidth="0.5" strokeDasharray="2 16" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <text
            x="300"
            y="168"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontWeight="700"
            fontSize="96"
            fill="#ece6d6"
            opacity="0.08"
            letterSpacing="0"
          >
            404
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1="220" y1="162" x2="380" y2="162" stroke="#c8941d" strokeWidth="0.5" opacity="0.5" />

          <text
            x="300"
            y="190"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontWeight="700"
            fontSize="22"
            fill="#ece6d6"
            letterSpacing="0.06em"
          >
            파동함수가 붕괴했습니다
          </text>

          <text
            x="300"
            y="218"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="13"
            fill="#ece6d6"
            opacity="0.5"
          >
            이 경로는 관측되지 않은 상태로 남아있습니다
          </text>

          <line x1="220" y1="234" x2="380" y2="234" stroke="#c8941d" strokeWidth="0.5" opacity="0.5" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <text
            x="300"
            y="276"
            textAnchor="middle"
            fontFamily="'SF Mono', Consolas, monospace"
            fontSize="9"
            letterSpacing="0.3em"
            fill="#c8941d"
            opacity="0.7"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/study")}
          >
            ← THE STUDY로 돌아가기
          </text>

          <text
            x="300"
            y="302"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="11"
            fill="#ece6d6"
            opacity="0.35"
          >
            또는 처음으로
          </text>
          <text
            x="300"
            y="322"
            textAnchor="middle"
            fontFamily="'SF Mono', Consolas, monospace"
            fontSize="9"
            letterSpacing="0.3em"
            fill="#ece6d6"
            opacity="0.35"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            → ARRIVAL
          </text>
        </motion.g>

        <motion.g
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="300" cy="200" r="3" fill="#c8941d" opacity="0.6" />
        </motion.g>

        <text
          x="300"
          y="370"
          textAnchor="middle"
          fontFamily="'SF Mono', Consolas, monospace"
          fontSize="9"
          letterSpacing="0.35em"
          fill="#ece6d6"
          opacity="0.3"
        >
          COPENHAGEN  AI  ·  404
        </text>
      </svg>
    </motion.div>
  );
}
