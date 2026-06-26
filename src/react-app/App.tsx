// src/App.tsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
	const [preview, setPreview] = useState<string | null>(null);
	const images = [1, 2, 3, 4, 6, 7, 8, 9, 10];

	return (
		<>
			<div>
				<div className="gallery">
  {images.map((item) => (
    <img
      key={item}
      src={`/${item}.png`}
      alt={String(item)}
      className="gallery-img"
      onClick={() => setPreview(`/${item}.png`)}
    />
  ))}
</div>

{preview && (
  <div className="preview-mask" onClick={() => setPreview(null)}>
    <img
      src={preview}
      className="preview-img"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}
			</div>
			<h1>Vite + React + Hono + Cloudflare</h1>
			<div className="card">
				<button
					onClick={() => setCount((count) => count + 1)}
					aria-label="increment"
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div className="card">
				<button
					onClick={() => {
						fetch("/api/")
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name));
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</button>
				<p>
					Edit <code>worker/index.ts</code> to change the name
				</p>
			</div>
			<p className="read-the-docs">Click on the logos to learn more</p>
		</>
	);
}

export default App;
