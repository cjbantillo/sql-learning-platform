export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--charcoal)",
        color: "white",
        padding: "26px 20px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>CSU Digital Academy</div>
          <div style={{ fontSize: "13px", color: "#cfcfcf" }}>
            Built for Caraga State University • SQL Learning
          </div>
        </div>
        <div style={{ fontSize: "13px", color: "#cfcfcf" }}>
          © {currentYear} Caraga State University
        </div>
      </div>
    </footer>
  );
}
