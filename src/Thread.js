import { useState } from "react";

export default function Thread({ worker, idx }) {
	const [render, setRender] = useState(null);

	const runThread = () => {
		worker.postMessage("begin");
	};

	if (!worker.setRender) worker.setRender = setRender;

	return (
		<div className="flx-item">
			<h3>Thread {idx}</h3>
			<button onClick={runThread}>run function</button>
			<label>task result:</label>
			<span className="wrkr-res">{render}</span>
		</div>
	);
}
