import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const images = [1, 3, 4, 6, 7, 8, 9, 10];

  const [current, setCurrent] = useState<number | null>(null);

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (current === null) return;
    setCurrent((current - 1 + images.length) % images.length);
  };

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (current === null) return;
    setCurrent((current + 1) % images.length);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (current === null) return;

      switch (e.key) {
        case "ArrowLeft":
          setCurrent((current - 1 + images.length) % images.length);
          break;
        case "ArrowRight":
          setCurrent((current + 1) % images.length);
          break;
        case "Escape":
          setCurrent(null);
          break;
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  return (
    <>
      <h1>Cloudflare Workers + R2</h1>

      <div className="gallery">
        {images.map((item, index) => (
          <img
            key={item}
            src={`/${item}.png`}
            alt={`${item}`}
            className="gallery-img"
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {current !== null && (
        <div
          className="preview-mask"
          onClick={() => setCurrent(null)}
        >
          <button className="nav-btn left" onClick={prev}>
            <svg viewBox="0 0 24 24">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>

          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/${images[current]}.png`}
              alt=""
              className="preview-img"
            />

            <div className="preview-title">
              {images[current]}.png
            </div>

            <div className="preview-index">
              {current + 1} / {images.length}
            </div>
          </div>

          <button className="nav-btn right" onClick={next}>
            <svg viewBox="0 0 24 24">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default App;
