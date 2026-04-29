import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import data from "../data/conferences.json";

export default function Conferences() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/study");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const sessions = data.conferences
    .filter((c) => c.type === "session")
    .sort((a, b) => b.no - a.no);
  const manifesto = data.conferences.find((c) => c.no === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1410",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "auto",
        padding: "1rem 0"
      }}
    >
      <div style={{ width: "100%", maxWidth: "880px", padding: "0 1.5rem" }}>
        <Header navigate={navigate} />
        <Title />
        <List sessions={sessions} navigate={navigate} />
        <ManifestoEntry manifesto={manifesto} navigate={navigate} />
        <Footer />
      </div>
    </motion.div>
  );
}

function Header({ navigate }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 0 1rem",
        fontFamily: "var(--mono)",
        fontSize: "9px",
        letterSpacing: "0.3em",
        opacity: 0.7
      }}
    >
      <button
        onClick={() => navigate("/study")}
        style={{ color: "#c8941d", letterSpacing: "0.3em" }}
        aria-label="Back to study"
      >
        ← THE STUDY
      </button>
      <span style={{ color: "#ece6d6", opacity: 0.55 }}>ARCHIVE · ESC TO CLOSE</span>
    </div>
  );
}

function Title() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0 2.5rem" }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "9px",
          letterSpacing: "0.4em",
          color: "var(--amber)",
          opacity: 0.85,
          marginBottom: "8px"
        }}
      >
        — A R C H I V E —
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "34px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "var(--parchment)",
          margin: 0
        }}
      >
        CONFERENCES
      </h1>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "var(--parchment)",
          opacity: 0.55,
          marginTop: "10px"
        }}
      >
        a record of every weekly Solvay since 2025
      </div>
    </div>
  );
}

function List({ sessions, navigate }) {
  if (sessions.length === 0) {
    return (
      <div
        style={{
          padding: "3rem 0",
          textAlign: "center",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "var(--parchment)",
          opacity: 0.45
        }}
      >
        — 아직 첫 회의 이전입니다 —
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {sessions.map((c, i) => (
        <Entry key={c.no} c={c} latest={i === 0} navigate={navigate} />
      ))}
    </div>
  );
}

function Entry({ c, latest, navigate }) {
  const isPlaceholder = c.isPlaceholder;
  const stripColor = latest ? "var(--amber)" : "#3a2a1a";
  const stripOpacity = latest ? 0.7 : 1;
  const attendeeCount = (c.attendees || []).length;
  const openCount = (c.openQuestions || []).length;
  const dateLabel = c.date
    ? c.date.replace(/-/g, "·")
    : "date pending";
  const meta = isPlaceholder
    ? `${dateLabel}   ·   awaiting first session`
    : `${dateLabel}   ·   ${attendeeCount} attendees   ·   ${openCount} open question${openCount === 1 ? "" : "s"}`;

  return (
    <button
      onClick={() => navigate(`/conference/${c.no}`)}
      aria-label={`Open conference No.${c.no}`}
      style={{
        position: "relative",
        textAlign: "left",
        padding: "20px 24px 20px 40px",
        background: "#241a12",
        border: `0.5px solid ${latest ? "var(--amber)" : "#3a2a1a"}`,
        borderRadius: "0",
        cursor: "pointer",
        transition: "background var(--t-fast)",
        display: "block",
        width: "100%"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#2a1f15")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#241a12")}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          background: stripColor,
          opacity: stripOpacity
        }}
      />
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "9px",
          letterSpacing: "0.4em",
          color: latest ? "var(--amber)" : "var(--parchment)",
          opacity: latest ? 0.85 : 0.5,
          marginBottom: "10px"
        }}
      >
        No. {c.no}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "17px",
          color: "var(--parchment)",
          opacity: isPlaceholder ? 0.55 : 0.92,
          fontStyle: isPlaceholder ? "italic" : "normal",
          lineHeight: 1.4
        }}
      >
        {c.topic}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "11px",
          color: "var(--parchment)",
          opacity: 0.45,
          marginTop: "8px"
        }}
      >
        {meta}
      </div>
      {latest && !isPlaceholder && (
        <motion.div
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--amber)"
          }}
        >
          ● IN PROGRESS
        </motion.div>
      )}
      {isPlaceholder && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--amber)",
            opacity: 0.55
          }}
        >
          ◌ AWAITING
        </div>
      )}
    </button>
  );
}

function ManifestoEntry({ manifesto, navigate }) {
  if (!manifesto) return null;
  return (
    <button
      onClick={() => navigate(`/conference/0`)}
      style={{
        marginTop: "32px",
        width: "100%",
        textAlign: "center",
        padding: "20px",
        background: "transparent",
        border: "0.5px dashed #3a2a1a",
        cursor: "pointer",
        opacity: 0.7,
        transition: "opacity var(--t-fast)",
        display: "block"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      aria-label="Open the founding manifesto"
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "var(--parchment)"
        }}
      >
        No. 0   ·   {manifesto.title}   ·   <span style={{ opacity: 0.6 }}>{manifesto.subtitle}</span>
      </div>
    </button>
  );
}

function Footer() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem 0 1rem",
        opacity: 0.45,
        fontFamily: "var(--mono)",
        fontSize: "9px",
        letterSpacing: "0.4em",
        color: "var(--parchment)"
      }}
    >
      A R C H I V E   ·   C O P E N H A G E N   A I
    </div>
  );
}
