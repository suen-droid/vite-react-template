import { useState } from "react";
import "./App.css";

function App() {
  const [preview, setPreview] = useState<string | null>(null);

  const images = [1, 2, 3, 4, 6, 7, 8, 9, 10];

  return (
    <>
      <h1>Cloudflare Workers + R2</h1>

      <div className="gallery">
        {images.map((item) => (
          <img
            key={item}
            src={`/${item}.png`}
            alt={`${item}`}
            className="gallery-img"
            onClick={() => setPreview(`/${item}.png`)}
          />
        ))}
      </div>

      {preview && (
        <div
          className="preview-mask"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="preview-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default App;
