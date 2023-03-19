export default class WorkerPool {
    constructor(threads=window.navigator.hardwareConcurrency){
        this.worker_pool = []
        this.threads = threads
        for(let i=0; i<threads; ++i){
            const worker = new Worker("worker.js")
            worker.addEventListener("message", (e) => {
                worker.event = e
                worker.result = e.data.result

                if(!worker.setRender) throw new Error("no worker render method")

                worker.setRender(new Uint8Array(e.data.result))
            })
            this.worker_pool.push(worker)
        }
    }

    runTask(){
        for(let i=0; i < this.worker_pool.length; ++i){
            this.worker_pool[i].postMessage("pass serializable objects")
        }    
    }
}