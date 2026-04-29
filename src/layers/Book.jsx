import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import data from "../data/members.json";

export default function Book() {
  const navigate = useNavigate();
  const { id } = useParams();

  const idx = data.books.findIndex((b) => b.id === id);
  const book = data.books[idx];
  const prevBook = idx > 0 ? data.books[idx - 1] : null;
  const nextBook = idx < data.books.length - 1 ? data.books[idx + 1] : null;

  const baseUrl = useMemo(() => import.meta.env.BASE_URL || "/", []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/study");
      else if (e.key === "ArrowLeft" && prevBook) navigate(`/book/${prevBook.id}`);
      else if (e.key === "ArrowRight" && nextBook) navigate(`/book/${nextBook.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!book) {
    return (
      <div style={{ width: "100%", height: "100%", background: "#1a1410", color: "#ece6d6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", opacity: 0.6 }}>
          이 책은 서가에 없습니다.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", height: "100%", background: "#1a1410", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}
    >
      <div style={{ width: "100%", maxWidth: "1100px", padding: "1rem" }}>
        <Header book={book} navigate={navigate} />
        <BookSpread book={book} prevBook={prevBook} nextBook={nextBook} navigate={navigate} baseUrl={baseUrl} />
        <Footer book={book} />
      </div>
    </motion.div>
  );
}

function Header({ book, navigate }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 1rem", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.3em", opacity: 0.7 }}>
      <button onClick={() => navigate("/study")} style={{ color: "#c8941d", letterSpacing: "0.3em" }} aria-label="Back to study">
        ← THE STUDY
      </button>
      <span style={{ color: "#ece6d6", opacity: 0.55 }}>VOL · {book.vol}  ·  ESC TO CLOSE</span>
    </div>
  );
}

function BookSpread({ book, prevBook, nextBook, navigate, baseUrl }) {
  return (
    <div style={{ position: "relative", margin: "1rem 0" }}>
      <SideNav side="left" book={prevBook} navigate={navigate} />
      <SideNav side="right" book={nextBook} navigate={navigate} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          maxWidth: "880px",
          margin: "0 auto",
          background: "#3a2a1f",
          borderRadius: "4px",
          padding: "10px",
          position: "relative"
        }}
      >
        <Frontispiece book={book} baseUrl={baseUrl} />
        <Bookplate book={book} />
      </div>
    </div>
  );
}

function SideNav({ side, book, navigate }) {
  if (!book) return null;
  const isLeft = side === "left";
  return (
    <button
      onClick={() => navigate(`/book/${book.id}`)}
      aria-label={`Go to ${book.physicist}`}
      style={{
        position: "absolute",
        top: "60px",
        [isLeft ? "left" : "right"]: "-90px",
        width: "70px",
        textAlign: "center",
        opacity: 0.7,
        transition: "opacity var(--t-fast)"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
    >
      <div
        style={{
          width: "44px",
          height: "64px",
          margin: "0 auto",
          background: book.coverColor,
          border: "0.5px solid #c8941d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px"
        }}
      >
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "9px", color: "#ece6d6", letterSpacing: "0.05em" }}>
          {book.physicist.length > 8 ? book.physicist.slice(0, 7) + "." : book.physicist}
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "6px", color: "#c8941d", letterSpacing: "0.15em" }}>
          VOL·{book.vol}
        </span>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "#c8941d", letterSpacing: "0.2em", marginTop: "8px" }}>
        {isLeft ? "◀ prev" : "next ▶"}
      </div>
    </button>
  );
}

function Frontispiece({ book, baseUrl }) {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #ece6d6 0%, #ece6d6 92%, #c8b89a 100%)",
        padding: "32px 48px",
        color: "#1a1410",
        minHeight: "560px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
    >
      <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.4em", color: "#c8941d", opacity: 0.85, marginBottom: "6px" }}>
        VOL · {book.vol}  ·  {book.role.toUpperCase()}
      </div>
      <div style={{ width: "60px", height: "0.5px", background: "#c8941d", opacity: 0.5, marginBottom: "32px" }} />

      <img
        src={`${baseUrl}${book.avatar}`}
        alt={book.physicist}
        style={{ width: "180px", height: "180px", margin: "0 auto" }}
      />

      <h1 style={{ fontFamily: "var(--serif)", fontSize: "34px", fontWeight: 700, letterSpacing: "0.05em", marginTop: "16px", color: "#1a1410" }}>
        {book.physicist.toUpperCase()}
      </h1>
      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.35em", opacity: 0.55, marginTop: "8px" }}>
        {book.handle}   ·   {book.displayName}
      </div>

      <div style={{ width: "180px", height: "0.5px", background: "#c8941d", opacity: 0.6, margin: "24px 0" }} />

      <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "14px", textAlign: "center", opacity: 0.85, lineHeight: 1.6 }}>
        “{book.sigil}”
      </p>
      <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", textAlign: "center", opacity: 0.55, marginTop: "10px" }}>
        {book.subSigil}
      </p>

      <div style={{ marginTop: "auto", paddingTop: "32px", display: "flex", alignItems: "center", gap: "10px", opacity: 0.5 }}>
        <span style={{ width: "20px", height: "0.5px", background: "#1a1410", opacity: 0.4 }} />
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "9px" }}>vol {book.vol}</span>
        <span style={{ width: "20px", height: "0.5px", background: "#1a1410", opacity: 0.4 }} />
      </div>
    </div>
  );
}

function Bookplate({ book }) {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #c8b89a 0%, #ece6d6 8%, #ece6d6 100%)",
        padding: "32px 48px",
        color: "#1a1410",
        minHeight: "560px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.4em", color: "#c8941d", opacity: 0.85 }}>
          B O O K P L A T E
        </div>
        <div style={{ width: "60px", height: "0.5px", background: "#c8941d", opacity: 0.5, margin: "10px auto 0" }} />
      </div>

      <Section title="§ Reflections">
        {book.reflections.length > 0 ? (
          book.reflections.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", padding: "8px 0", borderBottom: "0.5px dashed rgba(26,20,16,0.15)" }}
            >
              <div style={{ fontFamily: "var(--serif)", fontSize: "12px" }}>— {r.title}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "8px", opacity: 0.5, letterSpacing: "0.1em", marginTop: "2px" }}>
                {r.date}   ·   ↗
              </div>
            </a>
          ))
        ) : (
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", opacity: 0.45, padding: "8px 0" }}>
            — 첫 회고를 기다리는 중…
          </div>
        )}
      </Section>

      <Section title="§ Experiments">
        {book.experiments.length > 0 ? (
          book.experiments.map((e, i) => (
            <a
              key={i}
              href={e.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: "12px",
                padding: "8px 10px",
                border: e.status === "live"
                  ? "0.5px solid rgba(26,20,16,0.3)"
                  : "0.5px dashed rgba(26,20,16,0.25)",
                marginBottom: "6px",
                opacity: e.status === "live" ? 1 : 0.6
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", opacity: 0.85 }}>
                {e.name}
              </span>
              <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "10px", opacity: 0.55 }}>
                — {e.desc}
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: e.status === "live" ? "var(--green-live)" : "var(--amber)",
                  opacity: e.status === "live" ? 1 : 0.5
                }}
              />
            </a>
          ))
        ) : (
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", opacity: 0.45, padding: "8px 0" }}>
            — 실험 가설 수립 중…
          </div>
        )}
      </Section>

      <Section title="§ Wherefrom">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {book.wherefrom.map((w, i) => (
            <a
              key={i}
              href={w.url}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 16px",
                border: "0.5px solid rgba(26,20,16,0.55)",
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                transition: "all var(--t-fast)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1410";
                e.currentTarget.style.color = "#ece6d6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1410";
              }}
            >
              ⌥ &nbsp; {w.label}
            </a>
          ))}
        </div>
      </Section>

      <div style={{ marginTop: "auto", paddingTop: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", opacity: 0.45 }}>
        <span style={{ width: "60px", height: "0.5px", background: "#1a1410", opacity: 0.4 }} />
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "10px" }}>page 1 / 1</span>
        <span style={{ width: "60px", height: "0.5px", background: "#1a1410", opacity: 0.4 }} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "12px",
          letterSpacing: "0.15em",
          paddingBottom: "4px",
          borderBottom: "0.5px solid rgba(26,20,16,0.4)",
          width: "fit-content",
          marginBottom: "12px"
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Footer({ book }) {
  return (
    <div style={{ textAlign: "center", padding: "1rem", opacity: 0.45 }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.4em", color: "#ece6d6" }}>
        VOL · {book.vol}   ·   {book.physicist.toUpperCase().split("").join(" ")}   ·   {book.role.toUpperCase()}
      </span>
    </div>
  );
}
