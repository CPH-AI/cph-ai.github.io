import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import data from "../data/conferences.json";
import members from "../data/members.json";

export default function Conference() {
  const navigate = useNavigate();
  const { no } = useParams();
  const noNum = parseInt(no, 10);

  const conference = data.conferences.find((c) => c.no === noNum);
  const sessions = data.conferences
    .filter((c) => c.type === "session")
    .sort((a, b) => a.no - b.no);
  const sessionIdx = sessions.findIndex((c) => c.no === noNum);
  const prev = sessionIdx > 0 ? sessions[sessionIdx - 1] : null;
  const next =
    sessionIdx >= 0 && sessionIdx < sessions.length - 1
      ? sessions[sessionIdx + 1]
      : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/conferences");
      else if (e.key === "ArrowLeft" && prev) navigate(`/conference/${prev.no}`);
      else if (e.key === "ArrowRight" && next) navigate(`/conference/${next.no}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!conference) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a1410",
          color: "#ece6d6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            opacity: 0.6
          }}
        >
          이 회차는 archive에 없습니다.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
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
        <Header navigate={navigate} no={noNum} />
        {conference.type === "manifesto" ? (
          <ManifestoSheet c={conference} />
        ) : (
          <SessionSheet c={conference} navigate={navigate} />
        )}
        <PrevNext prev={prev} next={next} navigate={navigate} />
        <FooterMeta c={conference} />
      </div>
    </motion.div>
  );
}

function Header({ navigate, no }) {
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
        onClick={() => navigate("/conferences")}
        style={{ color: "var(--amber)", letterSpacing: "0.3em" }}
        aria-label="Back to archive"
      >
        ← ARCHIVE
      </button>
      <span style={{ color: "#ece6d6", opacity: 0.55 }}>
        CONFERENCE No. {no} · ESC TO CLOSE
      </span>
    </div>
  );
}

function Sheet({ children }) {
  return (
    <div
      style={{
        background: "#3a2a1f",
        padding: "10px",
        borderRadius: "2px"
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(to bottom, #ece6d6 0%, #e0d8c4 100%)",
          padding: "44px 56px",
          color: "#1a1410",
          minHeight: "560px"
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SessionSheet({ c, navigate }) {
  const isPlaceholder = c.isPlaceholder;
  return (
    <Sheet>
      <SheetTitle no={c.no} date={c.date} placeholder={isPlaceholder} />

      <Section title="§ Attendees">
        <Attendees attendees={c.attendees} absent={c.absent} navigate={navigate} placeholder={isPlaceholder} />
      </Section>

      <Section title="§ Topic">
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "17px",
            opacity: isPlaceholder ? 0.55 : 0.92,
            fontStyle: isPlaceholder ? "italic" : "normal",
            margin: 0,
            lineHeight: 1.5
          }}
        >
          {c.topic}
        </p>
      </Section>

      <Section title="§ Synthesis">
        {c.synthesis ? (
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "13px",
              opacity: 0.85,
              margin: 0,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap"
            }}
          >
            {c.synthesis}
          </p>
        ) : (
          <Empty>회의가 끝나면 합의된 통찰이 여기에 적힙니다.</Empty>
        )}
      </Section>

      <Section title="§ Presentations">
        {c.presentations && c.presentations.length > 0 ? (
          c.presentations.map((p, i) => (
            <Presentation key={i} p={p} navigate={navigate} />
          ))
        ) : (
          <Empty>발표 기록은 회의 후 추가됩니다.</Empty>
        )}
      </Section>

      <Section
        title="§ Open Questions"
        sub="— carried to next conference"
      >
        {c.openQuestions && c.openQuestions.length > 0 ? (
          c.openQuestions.map((q, i) => (
            <OpenQuestion key={i} q={q} navigate={navigate} />
          ))
        ) : (
          <Empty>미해결 질문이 발의되면 여기 superposition으로 남습니다.</Empty>
        )}
      </Section>
    </Sheet>
  );
}

function ManifestoSheet({ c }) {
  return (
    <Sheet>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "10px"
          }}
        >
          <span
            style={{
              width: "60px",
              height: "0.5px",
              background: "var(--amber)",
              opacity: 0.7
            }}
          />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              color: "var(--amber)",
              opacity: 0.85
            }}
          >
            No. 0
          </span>
          <span
            style={{
              width: "60px",
              height: "0.5px",
              background: "var(--amber)",
              opacity: 0.7
            }}
          />
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "30px",
            fontWeight: 700,
            color: "#1a1410",
            margin: "12px 0 6px",
            letterSpacing: "0.04em"
          }}
        >
          {c.title}
        </h1>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "13px",
            color: "#1a1410",
            opacity: 0.55
          }}
        >
          {c.subtitle}
        </div>
        <div
          style={{
            width: "180px",
            height: "0.5px",
            background: "var(--amber)",
            opacity: 0.5,
            margin: "24px auto 0"
          }}
        />
      </div>
      {c.body.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "15px",
            color: "#1a1410",
            lineHeight: 1.85,
            margin: i === 0 ? "0 0 18px" : "0 0 18px",
            opacity: 0.92,
            textIndent: i === 0 ? 0 : "1.5em"
          }}
        >
          {para}
        </p>
      ))}
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "11px",
          color: "#1a1410",
          opacity: 0.45,
          marginTop: "32px"
        }}
      >
        — Copenhagen AI, founding —
      </div>
    </Sheet>
  );
}

function SheetTitle({ no, date, placeholder }) {
  const dateLabel = date
    ? date.replace(/-/g, "·")
    : "date pending";
  return (
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "10px"
        }}
      >
        <span
          style={{
            width: "60px",
            height: "0.5px",
            background: "var(--amber)",
            opacity: 0.7
          }}
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.4em",
            color: "var(--amber)",
            opacity: 0.85
          }}
        >
          No. {no}
        </span>
        <span
          style={{
            width: "60px",
            height: "0.5px",
            background: "var(--amber)",
            opacity: 0.7
          }}
        />
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: "32px",
          fontWeight: 700,
          color: "#1a1410",
          margin: "8px 0 4px",
          letterSpacing: "0.04em"
        }}
      >
        CONFERENCE
      </h1>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "#1a1410",
          opacity: 0.55
        }}
      >
        {ordinal(no)} Conseil de Copenhagen   ·   {dateLabel}
      </div>
      {placeholder && (
        <div
          style={{
            display: "inline-block",
            marginTop: "14px",
            padding: "4px 14px",
            border: "0.5px dashed rgba(26,20,16,0.5)",
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            opacity: 0.6
          }}
        >
          ◌ AWAITING FIRST SESSION
        </div>
      )}
      <div
        style={{
          width: "180px",
          height: "0.5px",
          background: "var(--amber)",
          opacity: 0.5,
          margin: "20px auto 0"
        }}
      />
    </div>
  );
}

function Section({ title, sub, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          paddingBottom: "4px",
          borderBottom: "0.5px solid rgba(26,20,16,0.4)",
          marginBottom: "14px"
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "#1a1410"
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
              opacity: 0.45
            }}
          >
            {sub}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Empty({ children }) {
  return (
    <p
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: "12px",
        opacity: 0.45,
        margin: 0,
        padding: "4px 0"
      }}
    >
      — {children}
    </p>
  );
}

function Attendees({ attendees, absent, navigate, placeholder }) {
  if (placeholder || ((!attendees || attendees.length === 0) && (!absent || absent.length === 0))) {
    return <Empty>참석자는 회의 시작 시 기록됩니다.</Empty>;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {(attendees || []).map((id) => {
        const m = members.books.find((b) => b.id === id);
        if (!m) return null;
        return (
          <button
            key={id}
            onClick={() => navigate(`/book/${id}`)}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "13px",
              color: "#1a1410",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            aria-label={`Go to ${m.physicist}`}
          >
            <span style={{ opacity: 0.6 }}>⚯</span>
            <span style={{ borderBottom: "0.5px solid transparent" }}>
              {m.physicist}
            </span>
          </button>
        );
      })}
      {(absent || []).map((id) => {
        const m = members.books.find((b) => b.id === id);
        if (!m) return null;
        return (
          <button
            key={id}
            onClick={() => navigate(`/book/${id}`)}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "13px",
              color: "#1a1410",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            aria-label={`Go to ${m.physicist}`}
          >
            <span style={{ opacity: 0.5 }}>⊘</span>
            <span>{m.physicist}</span>
            <span style={{ fontStyle: "italic", fontSize: "10px" }}>— absent</span>
          </button>
        );
      })}
    </div>
  );
}

function Presentation({ p, navigate }) {
  const m = members.books.find((b) => b.id === p.by);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: "12px",
        padding: "8px 0",
        borderBottom: "0.5px dashed rgba(26,20,16,0.15)",
        alignItems: "center"
      }}
    >
      <button
        onClick={() => navigate(`/book/${p.by}`)}
        style={{
          fontFamily: "var(--serif)",
          fontSize: "13px",
          color: "#1a1410",
          background: "none",
          border: "none",
          padding: 0,
          textAlign: "left",
          cursor: "pointer"
        }}
      >
        — {m ? m.physicist : p.by}
      </button>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          opacity: 0.7
        }}
      >
        "{p.title}"
      </span>
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            color: "var(--amber)"
          }}
        >
          ↗
        </a>
      )}
    </div>
  );
}

function OpenQuestion({ q, navigate }) {
  const m = q.raisedBy ? members.books.find((b) => b.id === q.raisedBy) : null;
  const collapsed = q.status === "collapsed";
  return (
    <div style={{ padding: "10px 0", borderBottom: "0.5px dashed rgba(26,20,16,0.15)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "13px",
              opacity: 0.85,
              margin: 0,
              lineHeight: 1.5
            }}
          >
            ⊙ {q.question}
          </p>
          {m && (
            <button
              onClick={() => navigate(`/book/${q.raisedBy}`)}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "10px",
                opacity: 0.45,
                background: "none",
                border: "none",
                padding: "4px 0 0 16px",
                cursor: "pointer",
                color: "#1a1410"
              }}
            >
              raised by {m.physicist}
            </button>
          )}
        </div>
        <span
          style={{
            flexShrink: 0,
            padding: "3px 10px",
            border: collapsed
              ? "0.5px solid rgba(26,20,16,0.4)"
              : "0.5px dashed rgba(26,20,16,0.4)",
            fontFamily: "var(--mono)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            opacity: 0.65
          }}
        >
          {collapsed ? "collapsed" : "superposition"}
        </span>
      </div>
    </div>
  );
}

function PrevNext({ prev, next, navigate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "16px",
        padding: "32px 0",
        opacity: 0.65
      }}
    >
      <div style={{ textAlign: "left" }}>
        {prev && (
          <button
            onClick={() => navigate(`/conference/${prev.no}`)}
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "12px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--parchment)"
            }}
          >
            ◀ No. {prev.no}
          </button>
        )}
      </div>
      <button
        onClick={() => navigate("/conferences")}
        style={{
          fontFamily: "var(--mono)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "var(--amber)"
        }}
      >
        ALL CONFERENCES
      </button>
      <div style={{ textAlign: "right" }}>
        {next && (
          <button
            onClick={() => navigate(`/conference/${next.no}`)}
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "12px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--parchment)"
            }}
          >
            No. {next.no} ▶
          </button>
        )}
      </div>
    </div>
  );
}

function FooterMeta({ c }) {
  const dateLabel = c.date
    ? c.date.replace(/-/g, " · ")
    : "date pending";
  return (
    <div
      style={{
        textAlign: "center",
        padding: "1rem 0",
        opacity: 0.45,
        fontFamily: "var(--mono)",
        fontSize: "9px",
        letterSpacing: "0.4em",
        color: "var(--parchment)"
      }}
    >
      C O N F E R E N C E   No. {c.no}   ·   {dateLabel.toUpperCase()}
    </div>
  );
}

function ordinal(n) {
  if (n === 1) return "Premier";
  if (n === 2) return "Deuxième";
  if (n === 3) return "Troisième";
  if (n === 4) return "Quatrième";
  if (n === 5) return "Cinquième";
  if (n === 6) return "Sixième";
  if (n === 7) return "Septième";
  if (n === 8) return "Huitième";
  if (n === 9) return "Neuvième";
  if (n === 10) return "Dixième";
  return `${n}ème`;
}
