import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import conferences from "../data/conferences.json";
import members from "../data/members.json";

export default function Questions() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/study");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const all = useMemo(() => {
    return conferences.conferences
      .filter((c) => c.type === "session")
      .flatMap((c) =>
        (c.openQuestions || []).map((q, i) => ({
          ...q,
          conferenceNo: c.no,
          idx: i,
          raisedByName:
            members.books.find((b) => b.id === q.raisedBy)?.physicist || ""
        }))
      );
  }, []);

  const superposition = all
    .filter((q) => q.status === "superposition")
    .sort((a, b) => b.conferenceNo - a.conferenceNo);
  const collapsed = all
    .filter((q) => q.status === "collapsed")
    .sort((a, b) => b.conferenceNo - a.conferenceNo);

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
        <Title superpositionCount={superposition.length} collapsedCount={collapsed.length} />

        <Group
          title="§ In superposition"
          sub="— still being asked"
          questions={superposition}
          status="superposition"
          navigate={navigate}
          empty="아직 질문이 발의되지 않았습니다."
        />

        {collapsed.length > 0 && (
          <Group
            title="§ Collapsed"
            sub="— answered, settled"
            questions={collapsed}
            status="collapsed"
            navigate={navigate}
          />
        )}

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
        style={{ color: "var(--amber)", letterSpacing: "0.3em" }}
        aria-label="Back to study"
      >
        ← THE STUDY
      </button>
      <span style={{ color: "#ece6d6", opacity: 0.55 }}>OPEN QUESTIONS · ESC TO CLOSE</span>
    </div>
  );
}

function Title({ superpositionCount, collapsedCount }) {
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
        OPEN QUESTIONS
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
        the questions we have not yet finished asking
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          fontFamily: "var(--mono)",
          fontSize: "9px",
          letterSpacing: "0.3em"
        }}
      >
        <span style={{ color: "var(--amber)", opacity: 0.85 }}>
          {superpositionCount} in superposition
        </span>
        <span style={{ color: "var(--parchment)", opacity: 0.5 }}>
          {collapsedCount} collapsed
        </span>
      </div>
    </div>
  );
}

function Group({ title, sub, questions, status, navigate, empty }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          paddingBottom: "8px",
          borderBottom: "0.5px solid rgba(236, 230, 214, 0.2)",
          marginBottom: "16px"
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "var(--parchment)",
            opacity: 0.85
          }}
        >
          {title}
        </span>
        {sub && (
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "10px",
              color: "var(--parchment)",
              opacity: 0.45
            }}
          >
            {sub}
          </span>
        )}
      </div>
      {questions.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {questions.map((q) => (
            <QuestionCard
              key={`${q.conferenceNo}-${q.idx}`}
              q={q}
              status={status}
              navigate={navigate}
            />
          ))}
        </div>
      ) : (
        empty && (
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "12px",
              opacity: 0.45,
              padding: "8px 0",
              color: "var(--parchment)"
            }}
          >
            — {empty}
          </p>
        )
      )}
    </div>
  );
}

function QuestionCard({ q, status, navigate }) {
  const isOpen = status === "superposition";
  return (
    <button
      onClick={() => navigate(`/conference/${q.conferenceNo}#open-questions`)}
      style={{
        textAlign: "left",
        width: "100%",
        padding: "16px 20px",
        background: "#241a12",
        border: isOpen
          ? "0.5px dashed rgba(200, 148, 29, 0.5)"
          : "0.5px solid rgba(200, 148, 29, 0.3)",
        cursor: "pointer",
        transition: "background var(--t-fast)",
        display: "block",
        position: "relative"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#2a1f15")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#241a12")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          marginBottom: "6px",
          fontFamily: "var(--mono)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          opacity: 0.6
        }}
      >
        <span style={{ color: "var(--amber)" }}>No.{q.conferenceNo}</span>
        <span style={{ color: "var(--parchment)" }}>·</span>
        <span style={{ color: "var(--parchment)" }}>raised by {q.raisedByName}</span>
      </div>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: "15px",
          color: "var(--parchment)",
          opacity: 0.92,
          margin: 0,
          lineHeight: 1.5
        }}
      >
        ⊙ {q.question}
      </p>
      <span
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          padding: "2px 10px",
          fontFamily: "var(--mono)",
          fontSize: "8px",
          letterSpacing: "0.2em",
          color: "var(--amber)",
          opacity: 0.65,
          border: isOpen
            ? "0.5px dashed rgba(200, 148, 29, 0.5)"
            : "0.5px solid rgba(200, 148, 29, 0.4)"
        }}
      >
        {status}
      </span>
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
      O P E N   Q U E S T I O N S   ·   C O P E N H A G E N   A I
    </div>
  );
}
