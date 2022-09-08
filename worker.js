self.onmessage = (e) => {
    console.log(`worker: ${e.data}`);
    console.log("worker: got a message! starting test...");

    test();
}

async function test() {
    for (let i = 1; i <= 100; i++) {
        await sleep(50);
        console.log("worker: Executed after 1 second");
        self.postMessage(i);
    }
    self.postMessage('DONE');
}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}