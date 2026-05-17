import { useState } from "react";
import { slides } from "../data/slidesData";

export default function Card() {
  const [current, setCurrent] = useState<number>(0);
  const slide = slides[current];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c14",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Slide counter */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "1.5rem" }}>
        {slides.map((s, i) => (
          <div key={s.id} onClick={() => setCurrent(i)} style={{
            width: i === current ? 28 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? slide.accent : "#1e2a3a",
            cursor: "pointer",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Main card */}
      <div style={{
        width: "100%",
        maxWidth: 680,
        background: "linear-gradient(145deg, #0d1520, #111d2e)",
        border: `1px solid ${slide.accent}22`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: `0 0 60px ${slide.accent}18, 0 30px 60px #00000080`,
        transition: "box-shadow 0.4s",
      }}>
        {/* Top bar */}
        <div style={{
          background: `linear-gradient(90deg, ${slide.accent}18, transparent)`,
          borderBottom: `1px solid ${slide.accent}33`,
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{
            color: slide.accent,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "3px",
          }}>{slide.tag}</span>
          <span style={{ color: "#334155", fontSize: "0.7rem" }}>{current + 1}/{slides.length}</span>
        </div>

        {/* Content */}
        <div style={{ padding: "2rem 2rem 1.5rem" }}>
          <h2 style={{
            color: "#f1f5f9",
            fontSize: "1.25rem",
            fontWeight: 800,
            lineHeight: 1.35,
            margin: "0 0 0.85rem",
            fontFamily: "'Georgia', serif",
          }}>{slide.headline}</h2>

          <p style={{
            color: "#64748b",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            margin: "0 0 1.25rem",
            fontFamily: "'Georgia', serif",
          }}>{slide.sub}</p>

          {/* Code block */}
          {slide.code && (
            <div style={{
              background: "#060a10",
              border: `1px solid ${slide.accent}22`,
              borderRadius: 12,
              padding: "1.25rem 1.5rem",
              overflowX: "auto",
            }}>
              <pre style={{
                margin: 0,
                fontSize: "0.75rem",
                lineHeight: 1.75,
                color: "#94a3b8",
                whiteSpace: "pre",
              }}>
                {slide.code.split("\n").map((line, i) => {
                  let color = "#94a3b8";
                  if (line.trim().startsWith("//")) color = "#475569";
                  else if (line.includes("useImperativeHandle")) color = slide.accent;
                  else if (line.includes("❌")) color = "#ef4444";
                  else if (line.includes("✅")) color = "#22c55e";
                  else if (line.includes("function") || line.includes("const") || line.includes("return")) color = "#c084fc";
                  else if (line.includes("=>") || line.includes("ref") || line.includes("forwardRef")) color = "#60a5fa";
                  return <span key={i} style={{ color, display: "block" }}>{line}</span>;
                })}
              </pre>
            </div>
          )}

          {/* Pros/Cons for last slide */}
          {slide.pros && slide.cons && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{
                background: "#0a1a0a",
                border: "1px solid #22c55e33",
                borderRadius: 10,
                padding: "1rem",
              }}>
                <div style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>✅ PLUS POINTS</div>
                {slide.pros.map((p, i) => (
                  <div key={i} style={{ color: "#86efac", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
                    → {p}
                  </div>
                ))}
              </div>
              <div style={{
                background: "#1a0a0a",
                border: "1px solid #ef444433",
                borderRadius: 10,
                padding: "1rem",
              }}>
                <div style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>❌ DRAWBACKS</div>
                {slide.cons.map((c, i) => (
                  <div key={i} style={{ color: "#fca5a5", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
                    → {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div style={{
          borderTop: 1px solid #1e2a3a,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <button onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            style={{
              background: "transparent",
              border: `1px solid ${current === 0 ? "#1e2a3a" : slide.accent + "55"}`,
              color: current === 0 ? "#1e2a3a" : slide.accent,
              padding: "0.4rem 1.2rem",
              borderRadius: 8,
              cursor: current === 0 ? "default" : "pointer",
              fontSize: "0.8rem",
              fontFamily: "monospace",
            }}>← prev</button>

          <span style={{ color: "#1e3a4a", fontSize: "0.7rem" }}>
            #ReactJS #useImperativeHandle
          </span>

          <button onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
            disabled={current === slides.length - 1}
            style={{
              background: current === slides.length - 1 ? "transparent" : slide.accent,
              border: `1px solid ${current === slides.length - 1 ? "#1e2a3a" : slide.accent}`,
              color: current === slides.length - 1 ? "#1e2a3a" : "#080c14",
              padding: "0.4rem 1.2rem",
              borderRadius: 8,
              cursor: current === slides.length - 1 ? "default" : "pointer",
              fontSize: "0.8rem",
              fontFamily: "monospace",
              fontWeight: 700,
            }}>next →</button>
        </div>
      </div>

      {/* Slide title list below */}
      <div style={{ marginTop: "1.5rem", maxWidth: 680, width: "100%" }}>
        <div style={{ color: "#1e3a4a", fontSize: "0.7rem", letterSpacing: 2, marginBottom: "0.75rem" }}>ALL SLIDES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {slides.map((s, i) => (
            <div key={s.id} onClick={() => setCurrent(i)} style={{
              background: i === current ? slide.accent + "22" : "transparent",
              border: `1px solid ${i === current ? slide.accent + "55" : "#1e2a3a"}`,
              color: i === current ? slide.accent : "#334155",
              padding: "0.3rem 0.75rem",
              borderRadius: 6,
              fontSize: "0.7rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{s.tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}