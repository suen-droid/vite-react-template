import { useState } from "react";
import "./App.css";

function App() {
  const images = [1, 2, 3, 4, 6, 7, 8, 9, 10];

  const [current, setCurrent] = useState<number | null>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (current === null) return;
    setCurrent((current - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (current === null) return;
    setCurrent((current + 1) % images.length);
  };

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
            ❮
          </button>

          <img
            src={`/${images[current]}.png`}
            className="preview-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="nav-btn right" onClick={next}>
            ❯
          </button>
        </div>
      )}
    </>
  );
}

export default App;
