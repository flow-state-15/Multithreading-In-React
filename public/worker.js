onmessage = (e) => {
	/* 
        todo: useful if trying to pass over a fn
        todo: note - eval is unsafe
        if returning data send back typed array buffer
    */
	// console.log("on worker thread, message event: ", e.data);
	// let res = null;
	// if (e.data.task) {
	// make parsed code a statement to avoid syntax error
	// 	const fn = eval?.("'use strict';\n(" + e.data.task + ")");
	// 	if (e.data.args) {
	// 		// throw new Error("calling task with args incomplete")
	// 		res = fn(e.data.args);
	// 	} else {
	// 		res = fn();
	// 	}
	// }

	function randomizeArray(a) {
		// mutating input
		for (let i = 0; i < a.length; i++) {
            // 8bit ints
			a[i] = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		}
		return a;
	}

	const array = new Uint8Array(20);
	const startTime = Date.now();

    // worker task time is hard coded for now.
    // can read value from `self` as alternative
	while (Date.now() - startTime < 10000) {
		const startInterval = Date.now();

		//delay output since we are console logging
		while (Date.now() - startInterval < 50) {}

		randomizeArray(array);
		postMessage({ result: array.buffer });
	}
};
