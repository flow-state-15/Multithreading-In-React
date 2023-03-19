import { useEffect, useState } from "react";
import WorkerPool from "./threading/main";
import Thread from "./Thread";
import "./App.css";

function App() {
	const [pool, setPool] = useState([]);
	const [wVisible, setWVisible] = useState(false);

	useEffect(() => {
		return () => {
			pool.forEach((w) => w.terminate());
		};
	}, []);

	const handleSpawn = () => {
        if(pool.length) return
		const workerClass = new WorkerPool();
		setPool(workerClass.worker_pool);
		setWVisible(true);
	};

	const postTaskAllWorkers = (pool) => {
		for (let i = 0; i < pool.length; ++i) {
			pool[i].postMessage({ idx: i });
		}
	};

	return (
		<div className="App">
			<h1>Threading Test</h1>
			<button onClick={handleSpawn}>spawn workers</button>
			<br />
			{wVisible && (
				<button onClick={() => postTaskAllWorkers(pool)}>
					hit all threads
				</button>
			)}
			<div className="flx">
				{pool.map((w, idx) => (
					<div key={idx}>
						<Thread worker={w} idx={idx+1} />
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
