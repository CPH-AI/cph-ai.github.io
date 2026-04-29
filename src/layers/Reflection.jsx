import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import members from "../data/members.json";

export default function Reflection() {
  const navigate = useNavigate();
  const { id, refId } = useParams();
  const baseUrl = useMemo(() => import.meta.env.BASE_URL || "/", []);

  const book = members.books.find((b) => b.id === id);
  const reflection = book?.reflections.find((r) => r.id === refId);
  const reflectionIdx = book?.reflections.findIndex((r) => r.id === refId);
  const prev =
    reflectionIdx > 0 ? book.reflections[reflectionIdx - 1] : null;
  const next =
    reflectionIdx >= 0 && reflectionIdx < (book?.reflections.length || 0) - 1
      ? book.reflections[reflectionIdx + 1]
      : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate(`/book/${id}`);
      else if (e.key === "ArrowLeft" && prev)
        navigate(`/book/${id}/reflection/${prev.id}`);
      else if (e.key === "ArrowRight" && next)
        navigate(`/book/${id}/reflection/${next.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!book || !reflection) {
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
          이 회고는 책에 없습니다.
        </p>
      </div>
    );
  }

  const dateLabel = reflection.date
    ? reflection.date.replace(/-/g, " · ")
    : "";

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
        <Header book={book} navigate={navigate} />

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
              padding: "56px 72px",
              color: "#1a1410",
              minHeight: "560px",
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "40px"
            }}
          >
            <FrontispieceSlim book={book} baseUrl={baseUrl} />

            <div>
              <Eyebrow book={book} dateLabel={dateLabel} />
              <h1
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#1a1410",
                  letterSpacing: "0.02em",
                  margin: "0 0 28px",
                  lineHeight: 1.3
                }}
              >
                {reflection.title}
              </h1>

              {reflection.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "15px",
                    color: "#1a1410",
                    lineHeight: 1.85,
                    margin: "0 0 18px",
                    opacity: 0.92,
                    textIndent: i === 0 ? 0 : "1.5em"
                  }}
                >
                  {para}
                </p>
              ))}

              <div
                style={{
                  textAlign: "right",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "13px",
                  opacity: 0.55,
                  marginTop: "32px"
                }}
              >
                — {book.physicist}
              </div>
            </div>
          </div>
        </div>

        <PrevNext id={id} prev={prev} next={next} navigate={navigate} />

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
          VOL · {book.vol}   ·   REFLECTION
        </div>
      </div>
    </motion.div>
  );
}

function Header({ book, navigate }) {
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
        onClick={() => navigate(`/book/${book.id}`)}
        style={{ color: "var(--amber)", letterSpacing: "0.3em" }}
        aria-label="Back to book"
      >
        ← VOL · {book.vol}
      </button>
      <span style={{ color: "#ece6d6", opacity: 0.55 }}>
        REFLECTION · ESC TO CLOSE
      </span>
    </div>
  );
}

function FrontispieceSlim({ book, baseUrl }) {
  return (
    <div style={{ borderRight: "0.5px solid rgba(26,20,16,0.2)", paddingRight: "20px" }}>
      <img
        src={`${baseUrl}${book.avatar}`}
        alt={book.physicist}
        style={{ width: "90px", height: "90px" }}
      />
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "16px",
          fontWeight: 700,
          marginTop: "10px",
          letterSpacing: "0.04em"
        }}
      >
        {book.physicist.toUpperCase()}
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "8px",
          letterSpacing: "0.3em",
          opacity: 0.55,
          marginTop: "4px"
        }}
      >
        {book.handle}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "10px",
          opacity: 0.45,
          marginTop: "8px"
        }}
      >
        {book.role}
      </div>
    </div>
  );
}

function Eyebrow({ book, dateLabel }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
        fontFamily: "var(--mono)",
        fontSize: "9px",
        letterSpacing: "0.3em",
        color: "var(--amber)",
        opacity: 0.85
      }}
    >
      <span>VOL · {book.vol}</span>
      <span style={{ opacity: 0.4 }}>—</span>
      <span style={{ color: "#1a1410", opacity: 0.55 }}>REFLECTION</span>
      {dateLabel && (
        <>
          <span style={{ opacity: 0.4, color: "#1a1410" }}>·</span>
          <span style={{ color: "#1a1410", opacity: 0.55 }}>{dateLabel}</span>
        </>
      )}
    </div>
  );
}

function PrevNext({ id, prev, next, navigate }) {
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
            onClick={() => navigate(`/book/${id}/reflection/${prev.id}`)}
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
            ◀ {prev.title}
          </button>
        )}
      </div>
      <button
        onClick={() => navigate(`/book/${id}`)}
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
        BACK TO VOLUME
      </button>
      <div style={{ textAlign: "right" }}>
        {next && (
          <button
            onClick={() => navigate(`/book/${id}/reflection/${next.id}`)}
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
            {next.title} ▶
          </button>
        )}
      </div>
    </div>
  );
}
