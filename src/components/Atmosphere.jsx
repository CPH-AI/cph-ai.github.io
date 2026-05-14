import { useRef } from "react";

const DUST = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${8 + ((i * 19) % 76)}%`,
  delay: `${(i % 9) * 0.37}s`,
  size: `${2 + (i % 4)}px`
}));

const EQUATIONS = ["psi", "Delta x", "AI", "1927", "h bar", "q"];

export function DepthScene({ children, className = "", intensity = 1, ...props }) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--scene-x", x.toFixed(4));
    el.style.setProperty("--scene-y", y.toFixed(4));
    el.style.setProperty("--tilt-x", `${(-y * 5 * intensity).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 7 * intensity).toFixed(2)}deg`);
    el.style.setProperty("--light-x", `${(50 + x * 18).toFixed(2)}%`);
    el.style.setProperty("--light-y", `${(46 + y * 14).toFixed(2)}%`);
  };

  const resetPointer = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--scene-x", "0");
    el.style.setProperty("--scene-y", "0");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--light-x", "50%");
    el.style.setProperty("--light-y", "46%");
  };

  return (
    <div
      ref={ref}
      className={`depth-scene ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      {...props}
    >
      {children}
    </div>
  );
}

export function SolvayBackdrop({ variant = "arrival" }) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  return (
    <div className={`solvay-backdrop solvay-backdrop--${variant}`} aria-hidden="true">
      <img
        className="solvay-backdrop__image"
        src={`${baseUrl}assets/solvay-conference-room.webp`}
        alt=""
        decoding="sync"
        fetchPriority="high"
        draggable="false"
      />
      <div className="solvay-backdrop__wash" />
      <div className="solvay-backdrop__spotlight" />
      <div className="solvay-backdrop__floor" />
      <div className="solvay-backdrop__grain" />
    </div>
  );
}

export function QuantumDust({ density = "normal" }) {
  const particles = density === "light" ? DUST.slice(0, 18) : DUST;
  return (
    <div className="quantum-dust" aria-hidden="true">
      {particles.map((dot, i) => (
        <span
          key={i}
          className="quantum-dust__dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay
          }}
        />
      ))}
    </div>
  );
}

export function EquationVeil({ compact = false }) {
  return (
    <div className={`equation-veil ${compact ? "equation-veil--compact" : ""}`} aria-hidden="true">
      {EQUATIONS.map((label, i) => (
        <span key={label} style={{ "--i": i }}>
          {label}
        </span>
      ))}
    </div>
  );
}
