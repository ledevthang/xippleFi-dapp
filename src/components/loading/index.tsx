import "./styles.css";
function Loading() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        background: "rgba(218, 222, 227, 0.3)",
      }}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
