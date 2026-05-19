import { useState } from "react";
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink 
} from "@react-pdf/renderer";

// Reuse your Slide interface
interface Slide {
  id: number;
  tag: string;
  headline: string;
  sub: string;
  code: string | null;
  accent: string;
  pros?: string[];
  cons?: string[];
}

// 1. Define custom styles matching your aesthetic for the printable canvas
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#080c14",
    fontFamily: "Helvetica",
    color: "#f1f5f9",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2a3a",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00e5ff",
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  slideBlock: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#0d1520",
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  tag: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  headline: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    lineHeight: 1.3,
  },
  subText: {
    fontSize: 10,
    color: "#94a3b8",
    lineHeight: 1.5,
    marginBottom: 10,
  },
  codeContainer: {
    backgroundColor: "#060a10",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  codeLine: {
    fontSize: 8,
    fontFamily: "Courier",
    lineHeight: 1.4,
    color: "#94a3b8",
  },
  commentLine: {
    fontSize: 8,
    fontFamily: "Courier",
    lineHeight: 1.4,
    color: "#475569",
  },
  gridContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  gridColumn: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
  },
  gridTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    letterSpacing: 1,
  },
  gridItem: {
    fontSize: 8.5,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 9,
    color: "#334155",
  }
});

// 2. Build the Document Structure Template
const PDFDocumentTemplate = ({ data }: { data: Slide[] }) => (
  <Document title="useImperativeHandle Deep Dive Guide">
    <Page size="A4" style={styles.page}>
      {/* Header Banner */}
      <View style={styles.header}>
        <Text style={styles.title}>React Deep-Dive Masterclass</Text>
        <Text style={styles.subtitle}>Everything Missing from the Standard Docs on useImperativeHandle</Text>
      </View>

      {/* Slide Iteration Map */}
      {data.map((slide) => (
        <View 
          key={slide.id} 
          style={[styles.slideBlock, { borderLeftColor: slide.accent }]}
          wrap={false} // Prevents a single slide container block from broken page splitting
        >
          <Text style={[styles.tag, { color: slide.accent }]}>{slide.tag}</Text>
          <Text style={styles.headline}>{slide.headline}</Text>
          <Text style={styles.subText}>{slide.sub}</Text>

          {/* Conditional Code Elements */}
          {slide.code && (
            <View style={styles.codeContainer}>
              {slide.code.split("\n").map((line, index) => {
                const isComment = line.trim().startsWith("//");
                return (
                  <Text 
                    key={index} 
                    style={isComment ? styles.commentLine : styles.codeLine}
                  >
                    {line}
                  </Text>
                );
              })}
            </View>
          )}

          {/* Conditional Pro / Con System Matrices */}
          {slide.pros && slide.cons && (
            <View style={styles.gridContainer}>
              <View style={[styles.gridColumn, { backgroundColor: "#0a1a0a" }]}>
                <Text style={[styles.gridTitle, { color: "#22c55e" }]}>PLUS POINTS</Text>
                {slide.pros.map((p, i) => (
                  <Text key={i} style={[styles.gridItem, { color: "#86efac" }]}>→ {p}</Text>
                ))}
              </View>
              <View style={[styles.gridColumn, { backgroundColor: "#1a0a0a" }]}>
                <Text style={[styles.gridTitle, { color: "#ef4444" }]}>DRAWBACKS</Text>
                {slide.cons.map((c, i) => (
                  <Text key={i} style={[styles.gridItem, { color: "#fca5a5" }]}>→ {c}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}

      {/* Simple Footer Pagination Hook */}
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);

// 3. Main Export Component Trigger Button
export default function DownloadPDFButton({ slidesData }: { slidesData: Slide[] }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <PDFDownloadLink
        document={<PDFDocumentTemplate data={slidesData} />}
        fileName="useImperativeHandle_Masterclass.pdf"
        style={{
          textDecoration: "none",
          padding: "0.6rem 1.4rem",
          color: "#080c14",
          backgroundColor: "#00e5ff",
          border: "1px solid #00e5ff",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          fontWeight: 700,
          cursor: "pointer",
          display: "inline-block",
          transition: "opacity 0.2s",
        }}
      >
        {/* Render fallback status states cleanly */}
        {({ loading }) => (loading ? "Compiling Document..." : "Download Blueprint PDF 📄")}
      </PDFDownloadLink>
    </div>
  );
}