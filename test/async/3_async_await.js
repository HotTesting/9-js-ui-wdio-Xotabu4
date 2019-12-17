const fs = require("fs"); // Do not worry for .require now, we will look on it on next lesson.
const util = require("util");
const readFile = util.promisify(fs.readFile);

// async/await is special keywords to work with async operations results
// async/await is still based on Promises
// Lets see how we can work with async operations using async/await

console.log("Reading file async 1.json");
let content = await readFile("./6/data/1.json", { encoding: "UTF8" });
console.log("File content is", content);

// await can be only used inside "async" function:
async function doSomeAsyncThing() {
    console.log("Reading file async 1.json");
    let promise = readFile("./file.txt", { encoding: "UTF8" });
    let content = await promise;
    console.log("File content type", typeof content); // text
    console.log("File content is", content); // {"hello": "world!"}
    return content;
}
doSomeAsyncThing();


// Function that is declared as async now will return Promise
// Does not matter what you return from that function - it will be wrapped to Promise.
let res = doSomeAsyncThing();
console.log("Async function returned", res, "Type is", typeof res);

// Lets rewrite to async/await:

async function print3Files() {
    // And usage is folowing
    console.log("Reading file async 1.json");
    let content = await readFile("1.json");
    console.log("File 1.json returned", content);
    console.log("Reading file async 2.json");
    let content2 = await readFile("2.json");
    console.log("File 2.json returned", content2);
    console.log("Reading file async 3.json");
    let content3 = await readFile("3.json");
    console.log("File 3.json returned", content3);
    console.log("Done executing async commands");
}
console.log("staring");
print3Files();
console.log("finished scheduling async commands");

// Error handling
// Just ordinary try/catch:
async function print3Files() {
    try {
        console.log("Reading file async 1.json");
        let content = await readFile("1.json");
        console.log("File 1.json returned", content);
        console.log("Reading file async nonexist.json");
        let content2 = await readFile("nonexist.json");
        console.log("File 2.json returned", content2);
        console.log("Reading file async 3.json");
        let content3 = await readFile("3.json");
        console.log("File 3.json returned", content3);
        console.log("Done executing async commands");
    } catch (err) {
        console.log("Oh no, we have error!");
        console.log(err);
        throw err
    }
}
let prom = print3Files();
