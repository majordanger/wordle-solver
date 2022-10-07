// import { Solver } from './solver.js';
self.importScripts('./solver.js');

self.onmessage = (e) => {
    const message = (num) => { self.postMessage(num) };
    const solver = new Solver(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6], e.data[7], message);
    const results = solver.compute();
    self.postMessage(results);
}

