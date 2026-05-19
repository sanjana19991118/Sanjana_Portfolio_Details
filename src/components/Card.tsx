// // import { useState } from "react";

// // // 1. Declare explicit interfaces for strict type-checking
// // interface Slide {
// //   id: number;
// //   tag: string;
// //   headline: string;
// //   sub: string;
// //   code: string | null;
// //   accent: string;
// //   pros?: string[];
// //   cons?: string[];
// // }

// // const slides: Slide[] = [
// //   {
// //     id: 1,
// //     tag: "THE HOOK",
// //     headline: "What nobody tells you about useImperativeHandle",
// //     sub: "I read every major article. Here are 6 things missing from all of them — including why React 19 just changed the rules.",
// //     code: null,
// //     accent: "#00e5ff",
// //   },
// //   {
// //     id: 2,
// //     tag: "WHAT IT DOES",
// //     headline: "It lets a parent call methods on a child — on demand.",
// //     sub: "Instead of exposing the raw DOM node, you decide exactly what the parent can touch.",
// //     code: `// React 19 — no forwardRef needed for custom APIs
// // function FancyInput({ ref }) {
// //   const inputRef = useRef();

// //   useImperativeHandle(ref, () => ({
// //     focus: () => inputRef.current.focus(),
// //     clear: () => (inputRef.current.value = ""),
// //   }));

// //   return <input ref={inputRef} />;
// // }

// // // Parent calls it like this:
// // inputRef.current.focus();
// // inputRef.current.clear();`,
// //     accent: "#00e5ff",
// //   },
// //   {
// //     id: 3,
// //     tag: "GAP #1 — REACT 19",
// //     headline: "forwardRef is being deprecated. Most articles don't know yet.",
// //     sub: "In React 19, ref is a regular prop. But useImperativeHandle still needs forwardRef for custom APIs in older codebases. Nobody is explaining this split clearly.",
// //     code: `// React 18 — forwardRef required
// // const Input = forwardRef((props, ref) => {
// //   useImperativeHandle(ref, () => ({ focus }));
// //   return <input />;
// // });

// // // React 19 — ref is just a prop now
// // function Input({ ref }) {
// //   useImperativeHandle(ref, () => ({ focus }));
// //   return <input />;
// // }`,
// //     accent: "#f59e0b",
// //   },
// //   {
// //     id: 4,
// //     tag: "GAP #2 — STALE CLOSURES",
// //     headline: "Empty dependency array = silent bug. Nobody warns about this.",
// //     sub: "If your exposed method uses state or props but deps is [], it always sees the initial value. It's the hardest bug to trace.",
// //     code: `// ❌ BUG — stale closure, always sees initial formData
// // useImperativeHandle(ref, () => ({
// //   submit: () => handleSubmit(formData),
// // }), []); // formData never updates here!

// // // ✅ CORRECT — re-runs when formData changes
// // useImperativeHandle(ref, () => ({
// //   submit: () => handleSubmit(formData),
// // }), [formData]);`,
// //     accent: "#ef4444",
// //   },
// //   {
// //     id: 5,
// //     tag: "GAP #3 — TESTING",
// //     headline: "Testing components with this hook is genuinely painful.",
// //     sub: "To test a child method, you must mock useRef — which then breaks the parent's ref handle. Zero articles address this real-world problem.",
// //     code: `// The problem:
// // const ref = React.createRef();
// // render(<Page ref={ref} />);
// // ref.current.showDialog(); // works

// // // But to test if child's method was called,
// // // mocking useRef breaks ref.current on Page itself.
// // // You need getter-based exposure as a workaround:
// // useImperativeHandle(ref, () => ({
// //   get dialog() { return dialogRef.current; }
// // }));`,
// //     accent: "#a855f7",
// //   },
// //   {
// //     id: 6,
// //     tag: "GAP #4 — PHILOSOPHY",
// //     headline: "React itself calls this an escape hatch. Not a pattern.",
// //     sub: "The official docs say 'imperative code using refs should be avoided in most cases' — yet this is a built-in hook. The tension is real and almost never discussed honestly.",
// //     code: `// React's own docs say:
// // // "If you can express something as a prop,
// // //  you should NOT use a ref."

// // // ❌ Wrong use — avoid lifting state lazily
// // useImperativeHandle(ref, () => ({
// //   setTitle: (t) => setTitle(t), // just pass as prop!
// // }));

// // // ✅ Right use — truly imperative action
// // useImperativeHandle(ref, () => ({
// //   focus: () => inputRef.current.focus(),
// // }));`,
// //     accent: "#22c55e",
// //   },
// //   {
// //     id: 7,
// //     tag: "GAP #4.5 — THE MENTAL MODEL",
// //     headline: "useEffect vs useImperativeHandle: two totally different directions of control.",
// //     sub: "useEffect = child talks to the outside world on its own terms.\nuseImperativeHandle = child hands the parent a remote control with only the buttons it's allowed to press.\nMost developers conflate them. Here's why that thinking breaks down.",
// //     code: `// useEffect — child acts independently, on its own schedule
// // function AudioPlayer({ src }) {
// //   useEffect(() => {
// //     const audio = new Audio(src);
// //     audio.play(); // child decides when this runs
// //     return () => audio.pause();
// //   }, [src]);
// //   return <div>Now playing...</div>;
// // }

// // // useImperativeHandle — parent holds the remote, child limits the buttons
// // function AudioPlayer({ ref, src }) {
// //   const audioRef = useRef(new Audio(src));

// //   useImperativeHandle(ref, () => ({
// //     play:  () => audioRef.current.play(),   // ✅ parent can press this
// //     pause: () => audioRef.current.pause(),  // ✅ and this
// //     // volume, currentTime etc. NOT exposed — intentional
// //   }));

// //   return <div>Ready when you are.</div>;
// // }

// // // The key distinction:
// // // useEffect → "I'll handle this myself, don't worry about it."
// // // uIH       → "You can control me, but only through these buttons."`,
// //     accent: "#22c55e",
// //   },
// //   {
// //     id: 8,
// //     tag: "GAP #5 — REF CLEANUP",
// //     headline: "React 19 adds cleanup functions to refs. Nobody covers this.",
// //     sub: "You can now return a cleanup from useImperativeHandle for proper teardown — unsubscribing listeners, clearing timers. Completely undiscussed.",
// //     code: `// React 19 — cleanup on unmount
// // function Player({ ref }) {
// //   useImperativeHandle(ref, () => {
// //     const handler = () => console.log("key pressed");
// //     window.addEventListener("keydown", handler);

// //     // cleanup runs when component unmounts
// //     return () => {
// //       window.removeEventListener("keydown", handler);
// //     };
// //   });
// //   return <video />;
// // }`,
// //     accent: "#00e5ff",
// //   },
// //   {
// //     id: 9,
// //     tag: "GAP #6 — HONEST VERDICT",
// //     headline: "More drawbacks than benefits. And that's fine to say.",
// //     sub: "3 real benefits. 6 real drawbacks. It's a tool for a specific job — not a pattern to adopt widely. Knowing when NOT to use it is the senior developer skill.",
// //     code: null,
// //     pros: [
// //       "Clean encapsulation of imperative actions",
// //       "Essential for component library authors",
// //       "Bridges React with non-React APIs (canvas, video)",
// //     ],
// //     cons: [
// //       "Fights React's declarative model",
// //       "Stale closure bugs (silent, hard to find)",
// //       "Unit testing becomes complex",
// //       "Easy to abuse instead of lifting state",
// //       "Couples parent tightly to child internals",
// //       "React 19 is reshaping ref patterns already",
// //     ],
// //     accent: "#f59e0b",
// //   },
// // ];

// // export default function Card() {
// //   const [current, setCurrent] = useState<number>(0);
// //   const slide = slides[current];

// //   return (
// //     <div style={{
// //       minHeight: "100vh",
// //       background: "#080c14",
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       padding: "2rem 1rem",
// //       fontFamily: "'Courier New', monospace",
// //     }}>
// //       {/* Slide counter */}
// //       <div style={{
// //         display: "flex", gap: "6px", marginBottom: "1.5rem",
// //       }}>
// //         {slides.map((s, i) => (
// //           <div key={s.id} onClick={() => setCurrent(i)} style={{
// //             width: i === current ? 28 : 8,
// //             height: 8,
// //             borderRadius: 4,
// //             background: i === current ? slide.accent : "#1e2a3a",
// //             cursor: "pointer",
// //             transition: "all 0.3s",
// //           }} />
// //         ))}
// //       </div>

// //       {/* Main card */}
// //       <div style={{
// //         width: "100%",
// //         maxWidth: 680,
// //         background: "linear-gradient(145deg, #0d1520, #111d2e)",
// //         border: `1px solid ${slide.accent}22`,
// //         borderRadius: 20,
// //         overflow: "hidden",
// //         boxShadow: `0 0 60px ${slide.accent}18, 0 30px 60px #00000080`,
// //         transition: "box-shadow 0.4s",
// //       }}>
// //         {/* Top bar */}
// //         <div style={{
// //           background: `linear-gradient(90deg, ${slide.accent}18, transparent)`,
// //           borderBottom: `1px solid ${slide.accent}33`,
// //           padding: "0.75rem 1.5rem",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //         }}>
// //           <div style={{ display: "flex", gap: 6 }}>
// //             {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
// //               <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
// //             ))}
// //           </div>
// //           <span style={{
// //             color: slide.accent,
// //             fontSize: "0.7rem",
// //             fontWeight: 700,
// //             letterSpacing: "3px",
// //           }}>{slide.tag}</span>
// //           <span style={{ color: "#334155", fontSize: "0.7rem" }}>{current + 1}/{slides.length}</span>
// //         </div>

// //         {/* Content */}
// //         <div style={{ padding: "2rem 2rem 1.5rem" }}>
// //           <h2 style={{
// //             color: "#f1f5f9",
// //             fontSize: "1.25rem",
// //             fontWeight: 800,
// //             lineHeight: 1.35,
// //             margin: "0 0 0.85rem",
// //             fontFamily: "'Georgia', serif",
// //           }}>{slide.headline}</h2>

// //           <p style={{
// //             color: "#64748b",
// //             fontSize: "0.85rem",
// //             lineHeight: 1.7,
// //             margin: "0 0 1.25rem",
// //             fontFamily: "'Georgia', serif",
// //             whiteSpace: "pre-line",
// //           }}>{slide.sub}</p>

// //           {/* Code block */}
// //           {slide.code && (
// //             <div style={{
// //               background: "#060a10",
// //               border: `1px solid ${slide.accent}22`,
// //               borderRadius: 12,
// //               padding: "1.25rem 1.5rem",
// //               overflowX: "auto",
// //             }}>
// //               <pre style={{
// //                 margin: 0,
// //                 fontSize: "0.75rem",
// //                 lineHeight: 1.75,
// //                 color: "#94a3b8",
// //                 whiteSpace: "pre",
// //               }}>
// //                 {slide.code.split("\n").map((line, i) => {
// //                   let color = "#94a3b8";
// //                   if (line.trim().startsWith("//")) color = "#475569";
// //                   else if (line.includes("useImperativeHandle")) color = slide.accent;
// //                   else if (line.includes("useEffect")) color = "#00e5ff";
// //                   else if (line.includes("❌")) color = "#ef4444";
// //                   else if (line.includes("✅")) color = "#22c55e";
// //                   else if (line.includes("function") || line.includes("const") || line.includes("return")) color = "#c084fc";
// //                   else if (line.includes("=>") || line.includes("ref") || line.includes("forwardRef")) color = "#60a5fa";
// //                   return <span key={i} style={{ color, display: "block" }}>{line}</span>;
// //                 })}
// //               </pre>
// //             </div>
// //           )}

// //           {/* Pros/Cons for last slide */}
// //           {slide.pros && slide.cons && (
// //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
// //               <div style={{
// //                 background: "#0a1a0a",
// //                 border: "1px solid #22c55e33",
// //                 borderRadius: 10,
// //                 padding: "1rem",
// //               }}>
// //                 <div style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>✅ PLUS POINTS</div>
// //                 {slide.pros.map((p, i) => (
// //                   <div key={i} style={{ color: "#86efac", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
// //                     → {p}
// //                   </div>
// //                 ))}
// //               </div>
// //               <div style={{
// //                 background: "#1a0a0a",
// //                 border: "1px solid #ef444433",
// //                 borderRadius: 10,
// //                 padding: "1rem",
// //               }}>
// //                 <div style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>❌ DRAWBACKS</div>
// //                 {slide.cons.map((c, i) => (
// //                   <div key={i} style={{ color: "#fca5a5", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
// //                     → {c}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Navigation */}
// //         <div style={{
// //           padding: "1rem 2rem 1.5rem",
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           borderTop: `1px solid ${slide.accent}11`,
// //         }}>
// //           <button
// //             onClick={() => setCurrent(c => Math.max(0, c - 1))}
// //             disabled={current === 0}
// //             style={{
// //               background: "transparent",
// //               border: `1px solid ${current === 0 ? "#1e2a3a" : slide.accent + "44"}`,
// //               color: current === 0 ? "#1e2a3a" : slide.accent,
// //               padding: "0.4rem 1rem",
// //               borderRadius: 8,
// //               cursor: current === 0 ? "not-allowed" : "pointer",
// //               fontSize: "0.75rem",
// //               fontFamily: "'Courier New', monospace",
// //               transition: "all 0.2s",
// //             }}
// //           >← prev</button>

// //           <span style={{ color: "#1e2a3a", fontSize: "0.7rem" }}>
// //             {current + 1} of {slides.length}
// //           </span>

// //           <button
// //             onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))}
// //             disabled={current === slides.length - 1}
// //             style={{
// //               background: "transparent",
// //               border: `1px solid ${current === slides.length - 1 ? "#1e2a3a" : slide.accent + "44"}`,
// //               color: current === slides.length - 1 ? "#1e2a3a" : slide.accent,
// //               padding: "0.4rem 1rem",
// //               borderRadius: 8,
// //               cursor: current === slides.length - 1 ? "not-allowed" : "pointer",
// //               fontSize: "0.75rem",
// //               fontFamily: "'Courier New', monospace",
// //               transition: "all 0.2s",
// //             }}
// //           >next →</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState } from "react";

// // ==========================================
// // 1. Types & Interfaces
// // ==========================================
// interface Slide {
//   id: number;
//   tag: string;
//   headline: string;
//   sub: string;
//   code: string | null;
//   accent: string;
//   pros?: string[];
//   cons?: string[];
// }

// // ==========================================
// // 2. Mock Data Configuration Block
// // ==========================================
// const slides: Slide[] = [
//   {
//     id: 1,
//     tag: "THE HOOK",
//     headline: "What nobody tells you about useImperativeHandle",
//     sub: "I read every major article. Here are 6 things missing from all of them — including why React 19 just changed the rules.",
//     code: null,
//     accent: "#00e5ff",
//   },
//   {
//     id: 2,
//     tag: "WHAT IT DOES",
//     headline: "It lets a parent call methods on a child — on demand.",
//     sub: "Instead of exposing the raw DOM node, you decide exactly what the parent can touch.",
//     code: `// React 19 — no forwardRef needed for custom APIs
// function FancyInput({ ref }) {
//   const inputRef = useRef();

//   useImperativeHandle(ref, () => ({
//     focus: () => inputRef.current.focus(),
//     clear: () => (inputRef.current.value = ""),
//   }));

//   return <input ref={inputRef} />;
// }

// // Parent calls it like this:
// inputRef.current.focus();
// inputRef.current.clear();`,
//     accent: "#00e5ff",
//   },
//   {
//     id: 3,
//     tag: "GAP #1 — REACT 19",
//     headline: "forwardRef is being deprecated. Most articles don't know yet.",
//     sub: "In React 19, ref is a regular prop. But useImperativeHandle still needs forwardRef for custom APIs in older codebases. Nobody is explaining this split clearly.",
//     code: `// React 18 — forwardRef required
// const Input = forwardRef((props, ref) => {
//   useImperativeHandle(ref, () => ({ focus }));
//   return <input />;
// });

// // React 19 — ref is just a prop now
// function Input({ ref }) {
//   useImperativeHandle(ref, () => ({ focus }));
//   return <input />;
// }`,
//     accent: "#f59e0b",
//   },
//   {
//     id: 4,
//     tag: "GAP #2 — STALE CLOSURES",
//     headline: "Empty dependency array = silent bug. Nobody warns about this.",
//     sub: "If your exposed method uses state or props but deps is [], it always sees the initial value. It's the hardest bug to trace.",
//     code: `// ❌ BUG — stale closure, always sees initial formData
// useImperativeHandle(ref, () => ({
//   submit: () => handleSubmit(formData),
// }), []); // formData never updates here!

// // ✅ CORRECT — re-runs when formData changes
// useImperativeHandle(ref, () => ({
//   submit: () => handleSubmit(formData),
// }), [formData]);`,
//     accent: "#ef4444",
//   },
//   {
//     id: 5,
//     tag: "GAP #3 — TESTING",
//     headline: "Testing components with this hook is genuinely painful.",
//     sub: "To test a child method, you must mock useRef — which then breaks the parent's ref handle. Zero articles address this real-world problem.",
//     code: `// The problem:
// const ref = React.createRef();
// render(<Page ref={ref} />);
// ref.current.showDialog(); // works

// // But to test if child's method was called,
// // mocking useRef breaks ref.current on Page itself.
// // You need getter-based exposure as a workaround:
// useImperativeHandle(ref, () => ({
//   get dialog() { return dialogRef.current; }
// }));`,
//     accent: "#a855f7",
//   },
//   {
//     id: 6,
//     tag: "GAP #4 — PHILOSOPHY",
//     headline: "React itself calls this an escape hatch. Not a pattern.",
//     sub: "The official docs say 'imperative code using refs should be avoided in most cases' — yet this is a built-in hook. The tension is real and almost never discussed honestly.",
//     code: `// React's own docs say:
// // "If you can express something as a prop,
// //  you should NOT use a ref."

// // ❌ Wrong use — avoid lifting state lazily
// useImperativeHandle(ref, () => ({
//   setTitle: (t) => setTitle(t), // just pass as prop!
// }));

// // ✅ Right use — truly imperative action
// useImperativeHandle(ref, () => ({
//   focus: () => inputRef.current.focus(),
// }));`,
//     accent: "#22c55e",
//   },
//   {
//     id: 7,
//     tag: "GAP #4.5 — THE MENTAL MODEL",
//     headline: "useEffect vs useImperativeHandle: two totally different directions of control.",
//     sub: "useEffect = child talks to the outside world on its own terms.\\nuseImperativeHandle = child hands the parent a remote control with only the buttons it's allowed to press.\\nMost developers conflate them. Here's why that thinking breaks down.",
//     code: `// useEffect — child acts independently, on its own schedule
// function AudioPlayer({ src }) {
//   useEffect(() => {
//     const audio = new Audio(src);
//     audio.play(); // child decides when this runs
//     return () => audio.pause();
//   }, [src]);
//   return <div>Now playing...</div>;
// }

// // useImperativeHandle — parent holds the remote, child limits the buttons
// function AudioPlayer({ ref, src }) {
//   const audioRef = useRef(new Audio(src));

//   useImperativeHandle(ref, () => ({
//     play:  () => audioRef.current.play(),   // ✅ parent can press this
//     pause: () => audioRef.current.pause(),  // ✅ and this
//     // volume, currentTime etc. NOT exposed — intentional
//   }));

//   return <div>Ready when you are.</div>;
// }

// // The key distinction:
// // useEffect → "I'll handle this myself, don't worry about it."
// // uIH       → "You can control me, but only through these buttons."`,
//     accent: "#22c55e",
//   },
//   {
//     id: 8,
//     tag: "GAP #5 — REF CLEANUP",
//     headline: "React 19 adds cleanup functions to refs. Nobody covers this.",
//     sub: "You can now return a cleanup from useImperativeHandle for proper teardown — unsubscribing listeners, clearing timers. Completely undiscussed.",
//     code: `// React 19 — cleanup on unmount
// function Player({ ref }) {
//   useImperativeHandle(ref, () => {
//     const handler = () => console.log("key pressed");
//     window.addEventListener("keydown", handler);

//     // cleanup runs when component unmounts
//     return () => {
//       window.removeEventListener("keydown", handler);
//     };
//   });
//   return <video />;
// }`,
//     accent: "#00e5ff",
//   },
//   {
//     id: 9,
//     tag: "GAP #6 — HONEST VERDICT",
//     headline: "More drawbacks than benefits. And that's fine to say.",
//     sub: "3 real benefits. 6 real drawbacks. It's a tool for a specific job — not a pattern to adopt widely. Knowing when NOT to use it is the senior developer skill.",
//     code: null,
//     pros: [
//       "Clean encapsulation of imperative actions",
//       "Essential for component library authors",
//       "Bridges React with non-React APIs (canvas, video)",
//     ],
//     cons: [
//       "Fights React's declarative model",
//       "Stale closure bugs (silent, hard to find)",
//       "Unit testing becomes complex",
//       "Easy to abuse instead of lifting state",
//       "Couples parent tightly to child internals",
//       "React 19 is reshaping ref patterns already",
//     ],
//     accent: "#f59e0b",
//   },
// ];

// // ==========================================
// // 3. Main Component UI Tree
// // ==========================================
// export default function Card() {
//   const [current, setCurrent] = useState<number>(0);
//   const slide = slides[current];

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#080c14",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "2rem 1rem",
//       fontFamily: "'Courier New', monospace",
//     }}>
      
//       {/* Inject global native browser print sheets 
//         Hides UI buttons, scales background cleanly onto standard canvas when Ctrl+P is keyed 
//       */}
//       <style>{`
//         @media print {
//           body {
//             background: #ffffff !important;
//             color: #000000 !important;
//           }
//           button, .allSlidesSelector-hideOnPrint {
//             display: none !important;
//           }
//           .allSlidesSelector {
//             display: block !important;
//             color: #000000 !important;
//           }
//         }
//       `}</style>

//       {/* Slide Top Indicator Bars */}
//       <div className="allSlidesSelector-hideOnPrint" style={{
//         display: "flex", gap: "6px", marginBottom: "1.5rem",
//       }}>
//         {slides.map((s, i) => (
//           <div key={s.id} onClick={() => setCurrent(i)} style={{
//             width: i === current ? 28 : 8,
//             height: 8,
//             borderRadius: 4,
//             background: i === current ? slide.accent : "#1e2a3a",
//             cursor: "pointer",
//             transition: "all 0.3s",
//           }} />
//         ))}
//       </div>

//       {/* Main Container Deck View */}
//       <div style={{
//         width: "100%",
//         maxWidth: 680,
//         background: "linear-gradient(145deg, #0d1520, #111d2e)",
//         border: `1px solid ${slide.accent}22`,
//         borderRadius: 20,
//         overflow: "hidden",
//         boxShadow: `0 0 60px ${slide.accent}18, 0 30px 60px #00000080`,
//         transition: "box-shadow 0.4s",
//       }}>
        
//         {/* Upper Meta Info Deck */}
//         <div style={{
//           background: `linear-gradient(90deg, ${slide.accent}18, transparent)`,
//           borderBottom: `1px solid ${slide.accent}33`,
//           padding: "0.75rem 1.5rem",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}>
//           <div style={{ display: "flex", gap: 6 }}>
//             {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
//               <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
//             ))}
//           </div>
//           <span style={{
//             color: slide.accent,
//             fontSize: "0.7rem",
//             fontWeight: 700,
//             letterSpacing: "3px",
//           }}>{slide.tag}</span>
//           <span style={{ color: "#334155", fontSize: "0.7rem" }}>{current + 1}/{slides.length}</span>
//         </div>

//         {/* Content Body Area */}
//         <div style={{ padding: "2rem 2rem 1.5rem" }}>
//           <h2 style={{
//             color: "#f1f5f9",
//             fontSize: "1.25rem",
//             fontWeight: 800,
//             lineHeight: 1.35,
//             margin: "0 0 0.85rem",
//             fontFamily: "'Georgia', serif",
//           }}>{slide.headline}</h2>

//           <p style={{
//             color: "#64748b",
//             fontSize: "0.85rem",
//             lineHeight: 1.7,
//             margin: "0 0 1.25rem",
//             fontFamily: "'Georgia', serif",
//             whiteSpace: "pre-line",
//           }}>{slide.sub}</p>

//           {/* Conditional Token Rendering for Code Blocks */}
//           {slide.code && (
//             <div style={{
//               background: "#060a10",
//               border: `1px solid ${slide.accent}22`,
//               borderRadius: 12,
//               padding: "1.25rem 1.5rem",
//               overflowX: "auto",
//             }}>
//               <pre style={{
//                 margin: 0,
//                 fontSize: "0.75rem",
//                 lineHeight: 1.75,
//                 color: "#94a3b8",
//                 whiteSpace: "pre",
//               }}>
//                 {slide.code.split("\n").map((line, i) => {
//                   let color = "#94a3b8";
//                   if (line.trim().startsWith("//")) color = "#475569";
//                   else if (line.includes("useImperativeHandle")) color = slide.accent;
//                   else if (line.includes("useEffect")) color = "#00e5ff";
//                   else if (line.includes("❌")) color = "#ef4444";
//                   else if (line.includes("✅")) color = "#22c55e";
//                   else if (line.includes("function") || line.includes("const") || line.includes("return")) color = "#c084fc";
//                   else if (line.includes("=>") || line.includes("ref") || line.includes("forwardRef")) color = "#60a5fa";
//                   return <span key={i} style={{ color, display: "block" }}>{line}</span>;
//                 })}
//               </pre>
//             </div>
//           )}

//           {/* Verdict Segment: Grid Layout Blocks */}
//           {slide.pros && slide.cons && (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//               <div style={{
//                 background: "#0a1a0a",
//                 border: "1px solid #22c55e33",
//                 borderRadius: 10,
//                 padding: "1rem",
//               }}>
//                 <div style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>✅ PLUS POINTS</div>
//                 {slide.pros.map((p, i) => (
//                   <div key={i} style={{ color: "#86efac", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
//                     → {p}
//                   </div>
//                 ))}
//               </div>
//               <div style={{
//                 background: "#1a0a0a",
//                 border: "1px solid #ef444433",
//                 borderRadius: 10,
//                 padding: "1rem",
//               }}>
//                 <div style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.75rem" }}>❌ DRAWBACKS</div>
//                 {slide.cons.map((c, i) => (
//                   <div key={i} style={{ color: "#fca5a5", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: 1.5 }}>
//                     → {c}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Lower Navigation Controls */}
//         <div className="allSlidesSelector-hideOnPrint" style={{
//           padding: "1rem 2rem 1.5rem",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderTop: `1px solid ${slide.accent}11`,
//         }}>
//           <button
//             onClick={() => setCurrent(c => Math.max(0, c - 1))}
//             disabled={current === 0}
//             style={{
//               background: "transparent",
//               border: `1px solid ${current === 0 ? "#1e2a3a" : slide.accent + "44"}`,
//               color: current === 0 ? "#1e2a3a" : slide.accent,
//               padding: "0.4rem 1rem",
//               borderRadius: 8,
//               cursor: current === 0 ? "not-allowed" : "pointer",
//               fontSize: "0.75rem",
//               fontFamily: "'Courier New', monospace",
//               transition: "all 0.2s",
//             }}
//           >← prev</button>

//           <span style={{ color: "#1e2a3a", fontSize: "0.7rem" }}>
//             {current + 1} of {slides.length}
//           </span>

//           <button
//             onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))}
//             disabled={current === slides.length - 1}
//             style={{
//               background: "transparent",
//               border: `1px solid ${current === slides.length - 1 ? "#1e2a3a" : slide.accent + "44"}`,
//               color: current === slides.length - 1 ? "#1e2a3a" : slide.accent,
//               padding: "0.4rem 1rem",
//               borderRadius: 8,
//               cursor: current === slides.length - 1 ? "not-allowed" : "pointer",
//               fontSize: "0.75rem",
//               fontFamily: "'Courier New', monospace",
//               transition: "all 0.2s",
//             }}
//           >next →</button>
//         </div>
//       </div>

//       {/* Inline Utility Print Execution Blueprint Hook */}
//       <div className="allSlidesSelector-hideOnPrint" style={{ marginTop: "1rem" }}>
//         <button 
//           onClick={() => window.print()}
//           style={{
//             background: "#111d2e",
//             border: "1px solid #00e5ff44",
//             color: "#00e5ff",
//             padding: "0.5rem 1.2rem",
//             borderRadius: "8px",
//             fontSize: "0.75rem",
//             cursor: "pointer",
//             fontWeight: "bold",
//             transition: "all 0.2s"
//           }}
//         >
//           Print/Save Blueprint Index 📄
//         </button>
//       </div>

//       {/* ============================================================== */}
//       {/* 4. Complete Slide Compilation Deck (Print Layout View Target)  */}
//       {/* ============================================================== */}
//       <div className="allSlidesSelector" style={{ marginTop: "2rem", maxWidth: 680, width: "100%" }}>
//         <div style={{ 
//           color: "#475569", 
//           fontSize: "0.75rem", 
//           marginBottom: "0.75rem", 
//           fontWeight: 700, 
//           letterSpacing: '1px' 
//         }}>
//           ALL AT-A-GLANCE SUMMARY INDEX (COMPILED BLUEPRINT MAP)
//         </div>
//         {slides.map((s) => (
//           <div 
//             key={s.id} 
//             style={{ 
//               padding: "1rem 0", 
//               borderBottom: "1px dashed #1e2a3a", 
//               display: "flex", 
//               flexDirection: "column",
//               gap: "0.25rem"
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ color: s.accent, fontSize: "0.75rem", fontWeight: "bold" }}>{s.tag}</span>
//               <span style={{ color: "#334155", fontSize: "0.7rem" }}>ID: 0{s.id}</span>
//             </div>
//             <div style={{ color: "#f1f5f9", fontSize: "0.9rem", fontFamily: "sans-serif", fontWeight: 600 }}>
//               {s.headline}
//             </div>
//             <div style={{ color: "#64748b", fontSize: "0.8rem", fontFamily: "sans-serif", lineHeight: 1.4 }}>
//               {s.sub}
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }



import { useState } from "react";

// ==========================================
// Types & Interfaces
// ==========================================
interface CompareColumn {
  label: string;
  points: string[];
}

interface Slide {
  num: number;
  tag: string;
  headline: string;
  sub: string;
  code: string | null;
  accent: string;
  compare?: CompareColumn[];
  pros?: string[];
  cons?: string[];
}

// ==========================================
// Slide Deck Configuration Block
// ==========================================
const SLIDES: Slide[] = [
  {
    num: 1,
    tag: "THE HOOK",
    headline: "What nobody tells you about useImperativeHandle",
    sub: "I read every major article. Here are 6 things missing from all of them — including why React 19 just changed the rules.",
    code: null,
    accent: "#00e5ff",
  },
  {
    num: 2,
    tag: "WHAT IT DOES",
    headline: "It lets a parent call methods on a child — on demand.",
    sub: "Instead of exposing the raw DOM node, you decide exactly what the parent can touch.",
    code: `// React 19 — ref is now a regular prop
function FancyInput({ ref }) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ""),
  }));

  return <input ref={inputRef} />;
}

// Parent calls it like this:
inputRef.current.focus();
inputRef.current.clear();`,
    accent: "#00e5ff",
  },
  {
    num: 3,
    tag: "GAP #1 — REACT 19",
    headline: "forwardRef is being deprecated. Most articles don't know yet.",
    sub: "In React 19, ref is a regular prop. But useImperativeHandle still needs forwardRef for custom APIs in older codebases. Nobody is explaining this split clearly.",
    code: `// React 18 — forwardRef required
const Input = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({ focus }));
  return <input />;
});

// React 19 — ref is just a prop now
function Input({ ref }) {
  useImperativeHandle(ref, () => ({ focus }));
  return <input />;
}`,
    accent: "#f59e0b",
  },
  {
    num: 4,
    tag: "GAP #2 — STALE CLOSURES",
    headline: "Empty dependency array = silent bug. Nobody warns about this.",
    sub: "If your exposed method uses state or props but deps is [], it always sees the initial value. It's the hardest bug to trace.",
    code: `// ❌ BUG — stale closure, always sees initial formData
useImperativeHandle(ref, () => ({
  submit: () => handleSubmit(formData),
}), []); // formData never updates here!

// ✅ CORRECT — re-runs when formData changes
useImperativeHandle(ref, () => ({
  submit: () => handleSubmit(formData),
}), [formData]);`,
    accent: "#ef4444",
  },
  {
    num: 5,
    tag: "GAP #3 — TESTING",
    headline: "Testing components with this hook is genuinely painful.",
    sub: "To test a child method, you must mock useRef — which then breaks the parent's ref handle. Zero articles address this real-world problem.",
    code: `// The problem in tests:
const ref = React.createRef();
render(<Page ref={ref} />);
ref.current.showDialog(); // works fine

// But mocking useRef to spy on child
// breaks ref.current on Page itself!
// Workaround — use getter-based exposure:
useImperativeHandle(ref, () => ({
  get dialog() { return dialogRef.current; }
}));`,
    accent: "#a855f7",
  },
  {
    num: 6,
    tag: "GAP #4 — PHILOSOPHY",
    headline: "React itself calls this an escape hatch. Not a pattern.",
    sub: "The official docs say 'imperative code using refs should be avoided in most cases' — yet this is a built-in hook. The tension is real and almost never discussed honestly.",
    code: `// React's own docs say:
// "If you can express something as a prop,
//  you should NOT use a ref."

// ❌ Wrong use — avoid lifting state lazily
useImperativeHandle(ref, () => ({
  setTitle: (t) => setTitle(t), // just pass as prop!
}));

// ✅ Right use — truly imperative action
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
}));`,
    accent: "#22c55e",
  },
  {
    num: 7,
    tag: "GAP #5 — REF CLEANUP",
    headline: "React 19 adds cleanup to refs. Nobody covers this.",
    sub: "You can now return a cleanup function from useImperativeHandle for proper teardown — unsubscribing listeners, clearing timers. Completely undiscussed.",
    code: `// React 19 — cleanup on unmount
function Player({ ref }) {
  useImperativeHandle(ref, () => {
    const handler = () => console.log("key pressed");
    window.addEventListener("keydown", handler);

    // cleanup runs when component unmounts
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });
  return <video />;
}`,
    accent: "#00e5ff",
  },
  {
    num: 8,
    tag: "BONUS — vs useEffect",
    headline: "Same lifecycle timing. Completely different jobs.",
    sub: "useEffect = child talks to the outside world on its own. useImperativeHandle = child hands the parent a remote control with only allowed buttons.",
    code: `// ❌ Anti-pattern — people try this
useEffect(() => {
  ref.current = {      // React owns ref.current
    focus: () => inputRef.current.focus(),
  };                   // React WILL overwrite this!
}, []);

// ✅ Correct — let React manage the handle
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
}), []);`,
    accent: "#c084fc",
    compare: [
      {
        label: "useEffect",
        points: ["Runs after paint ✓", "Internal side effects", "Data fetch / timers", "Child acts on its own", "No parent involvement"],
      },
      {
        label: "useImperativeHandle",
        points: ["Runs after paint ✓", "Parent-facing API", "focus / reset / scroll", "Parent triggers action", "Needs ref from parent"],
      },
    ],
  },
  {
    num: 9,
    tag: "HONEST VERDICT",
    headline: "More drawbacks than benefits. And that's fine to say.",
    sub: "3 real benefits. 6 real drawbacks. It's a tool for a specific job — not a pattern to adopt widely. Knowing when NOT to use it is the senior developer skill.",
    code: null,
    accent: "#f59e0b",
    pros: [
      "Clean encapsulation of imperative actions",
      "Essential for component library authors",
      "Bridges React with non-React APIs",
    ],
    cons: [
      "Fights React's declarative model",
      "Stale closure bugs — silent & hard to find",
      "Unit testing becomes complex",
      "Easy to abuse instead of lifting state",
      "Tightly couples parent to child internals",
      "React 19 is already reshaping ref patterns",
    ],
  },
];

// ==========================================
// Core Carousel Presentation Deck
// ==========================================
export default function Carousel() {
  const [cur, setCur] = useState<number>(0);
  const s = SLIDES[cur];
  const total = SLIDES.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060a10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "'Courier New', monospace",
    }}>

      {/* Dot progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
        {SLIDES.map((_, i) => (
          <div key={i} onClick={() => setCur(i)} style={{
            width: i === cur ? 32 : 8, height: 8, borderRadius: 4,
            background: i === cur ? s.accent : "#1e2a3a",
            cursor: "pointer", transition: "all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Card Deck Wrapper */}
      <div style={{
        width: "100%", maxWidth: 680,
        background: "linear-gradient(145deg, #0d1520, #0f1c2e)",
        border: `1px solid ${s.accent}28`,
        borderRadius: 20, overflow: "hidden",
        boxShadow: `0 0 80px ${s.accent}15, 0 40px 80px #00000090`,
      }}>

        {/* Top Header Deck Meta Window */}
        <div style={{
          background: `linear-gradient(90deg, ${s.accent}15, transparent)`,
          borderBottom: `1px solid ${s.accent}25`,
          padding: "0.75rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ color: s.accent, fontSize: "0.68rem", fontWeight: 800, letterSpacing: "3px" }}>
            {s.tag}
          </span>
          <span style={{ color: "#2a3a4a", fontSize: "0.7rem", fontFamily: "monospace" }}>
            {cur + 1} / {total}
          </span>
        </div>

        {/* Content Node Body */}
        <div style={{ padding: "1.75rem 2rem 1.5rem" }}>
          <h2 style={{
            color: "#f1f5f9", fontSize: "1.2rem", fontWeight: 800,
            lineHeight: 1.4, margin: "0 0 0.8rem",
            fontFamily: "'Georgia', serif",
          }}>{s.headline}</h2>

          <p style={{
            color: "#56687a", fontSize: "0.84rem", lineHeight: 1.75,
            margin: "0 0 1.2rem", fontFamily: "'Georgia', serif",
            whiteSpace: "pre-line"
          }}>{s.sub}</p>

          {/* Conditional Mini IDE Block Rendering */}
          {s.code && (
            <div style={{
              background: "#040810",
              border: `1px solid ${s.accent}20`,
              borderRadius: 12, padding: "1.2rem 1.4rem", overflowX: "auto",
            }}>
              <pre style={{ margin: 0, fontSize: "0.73rem", lineHeight: 1.8, whiteSpace: "pre" }}>
                {s.code.split("\n").map((line, i) => {
                  let color = "#8899aa";
                  if (line.trim().startsWith("//")) color = "#3a4a5a";
                  else if (line.includes("useImperativeHandle")) color = s.accent;
                  else if (line.includes("❌")) color = "#ef4444";
                  else if (line.includes("✅")) color = "#22c55e";
                  else if (line.match(/\b(function|const|return|import)\b/)) color = "#c084fc";
                  else if (line.match(/\b(ref|forwardRef|useEffect|useRef)\b/)) color = "#60a5fa";
                  return <span key={i} style={{ color, display: "block" }}>{line}</span>;
                })}
              </pre>
            </div>
          )}

          {/* Alternative Architecture Map Component Split (Slide 8) */}
          {s.compare && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {s.compare.map((col, ci) => (
                <div key={ci} style={{
                  background: ci === 0 ? "#080e18" : "#05121a",
                  border: `1px solid ${ci === 0 ? "#1e2a3a" : s.accent + "35"}`,
                  borderRadius: 10, padding: "0.9rem",
                }}>
                  <div style={{
                    color: ci === 0 ? "#3a4a5a" : s.accent,
                    fontSize: "0.65rem", fontWeight: 800, letterSpacing: 2,
                    marginBottom: "0.7rem", fontFamily: "monospace",
                  }}>{col.label}</div>
                  {col.points.map((p, pi) => (
                    <div key={pi} style={{
                      color: ci === 0 ? "#56687a" : "#8899aa",
                      fontSize: "0.73rem", marginBottom: "0.4rem", lineHeight: 1.5,
                      borderLeft: `2px solid ${ci === 0 ? "#1a2535" : s.accent + "50"}`,
                      paddingLeft: "0.55rem",
                    }}>{p}</div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Segment Balance View Matrix (Slide 9) */}
          {s.pros && s.cons && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{
                background: "#071207", border: "1px solid #22c55e28",
                borderRadius: 10, padding: "0.9rem",
              }}>
                <div style={{ color: "#22c55e", fontSize: "0.65rem", fontWeight: 800, letterSpacing: 2, marginBottom: "0.7rem" }}>
                  ✅ PLUS POINTS
                </div>
                {s.pros.map((p, i) => (
                  <div key={i} style={{ color: "#4ade80", fontSize: "0.75rem", marginBottom: "0.45rem", lineHeight: 1.5, borderLeft: "2px solid #22c55e40", paddingLeft: "0.55rem" }}>
                    {p}
                  </div>
                ))}
              </div>
              <div style={{
                background: "#120707", border: "1px solid #ef444428",
                borderRadius: 10, padding: "0.9rem",
              }}>
                <div style={{ color: "#ef4444", fontSize: "0.65rem", fontWeight: 800, letterSpacing: 2, marginBottom: "0.7rem" }}>
                  ❌ DRAWBACKS
                </div>
                {s.cons.map((c, i) => (
                  <div key={i} style={{ color: "#f87171", fontSize: "0.75rem", marginBottom: "0.45rem", lineHeight: 1.5, borderLeft: "2px solid #ef444440", paddingLeft: "0.55rem" }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lower Active Navigation Footer Controls */}
        <div style={{
          borderTop: "1px solid #0f1e2e",
          padding: "0.9rem 2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <button onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} style={{
            background: "transparent",
            border: `1px solid ${cur === 0 ? "#0f1e2e" : s.accent + "50"}`,
            color: cur === 0 ? "#0f1e2e" : s.accent,
            padding: "0.4rem 1.1rem", borderRadius: 7,
            cursor: cur === 0 ? "default" : "pointer",
            fontSize: "0.78rem", fontFamily: "monospace",
          }}>← prev</button>

          <span style={{ color: "#1a2a3a", fontSize: "0.65rem" }}>
            #ReactJS #useImperativeHandle
          </span>

          <button onClick={() => setCur(Math.min(total - 1, cur + 1))} disabled={cur === total - 1} style={{
            background: cur === total - 1 ? "transparent" : s.accent,
            border: `1px solid ${cur === total - 1 ? "#0f1e2e" : s.accent}`,
            color: cur === total - 1 ? "#0f1e2e" : "#060a10",
            padding: "0.4rem 1.1rem", borderRadius: 7,
            cursor: cur === total - 1 ? "default" : "pointer",
            fontSize: "0.78rem", fontFamily: "monospace", fontWeight: 800,
          }}>next →</button>
        </div>
      </div>

      {/* Slide Pills Footer Menu Shortcuts */}
      <div style={{ marginTop: "1.25rem", maxWidth: 680, width: "100%" }}>
        <div style={{ color: "#1a2a3a", fontSize: "0.65rem", letterSpacing: 2, marginBottom: "0.6rem" }}>
          ALL {total} SLIDES
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {SLIDES.map((sl, i) => (
            <div key={i} onClick={() => setCur(i)} style={{
              background: i === cur ? `${s.accent}20` : "transparent",
              border: `1px solid ${i === cur ? `${s.accent}50` : "#0f1e2e"}`,
              color: i === cur ? s.accent : "#2a3a4a",
              padding: "0.25rem 0.7rem", borderRadius: 5,
              fontSize: "0.63rem", cursor: "pointer", transition: "all 0.2s",
            }}>{sl.num}. {sl.tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}