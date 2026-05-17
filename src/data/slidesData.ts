import { Slide } from "../types/slide";

export const slides: Slide[] = [
  {
    id: 1,
    tag: "THE HOOK",
    headline: "What nobody tells you about useImperativeHandle",
    sub: "I read every major article. Here are 6 things missing from all of them — including why React 19 just changed the rules.",
    code: null,
    accent: "#00e5ff",
  },
  {
    id: 2,
    tag: "WHAT IT DOES",
    headline: "It lets a parent call methods on a child — on demand.",
    sub: "Instead of exposing the raw DOM node, you decide exactly what the parent can touch.",
    code: `// React 19 — no forwardRef needed for custom APIs
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
    id: 3,
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
    id: 4,
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
    id: 5,
    tag: "GAP #3 — TESTING",
    headline: "Testing components with this hook is genuinely painful.",
    sub: "To test a child method, you must mock useRef — which then breaks the parent's ref handle. Zero articles address this real-world problem.",
    code: `// The problem:
const ref = React.createRef();
render(<Page ref={ref} />);
ref.current.showDialog(); // works

// But to test if child's method was called,
// mocking useRef breaks ref.current on Page itself.
// You need getter-based exposure as a workaround:
useImperativeHandle(ref, () => ({
  get dialog() { return dialogRef.current; }
}));`,
    accent: "#a855f7",
  },
  {
    id: 6,
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
    id: 7,
    tag: "GAP #5 — REF CLEANUP",
    headline: "React 19 adds cleanup functions to refs. Nobody covers this.",
    sub: "You can now return a cleanup from useImperativeHandle for proper teardown — unsubscribing listeners, clearing timers. Completely undiscussed.",
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
    id: 8,
    tag: "GAP #6 — HONEST VERDICT",
    headline: "More drawbacks than benefits. And that's fine to say.",
    sub: "3 real benefits. 6 real drawbacks. It's a tool for a specific job — not a pattern to adopt widely. Knowing when NOT to use it is the senior developer skill.",
    code: null,
    pros: [
      "Clean encapsulation of imperative actions",
      "Essential for component library authors",
      "Bridges React with non-React APIs (canvas, video)",
    ],
    cons: [
      "Fights React's declarative model",
      "Stale closure bugs (silent, hard to find)",
      "Unit testing becomes complex",
      "Easy to abuse instead of lifting state",
      "Couples parent tightly to child internals",
      "React 19 is reshaping ref patterns already",
    ],
    accent: "#f59e0b",
  },
];