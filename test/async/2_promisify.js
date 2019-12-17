// Nodejs allows you to wrap function that is based on callbacks to use promises
// Special function .promisify() can be used

const fs = require("fs"); // Do not worry for .require now, we will look on it on next lesson.
const util = require("util");
let readFile = util.promisify(fs.readFile);

// Now readFile is returns Promise, instead of working with callbacks
readFile("./6/data/1.json", { encoding: "UTF8" })
.then(function(content) {
  console.log(content);
});


const fs = require("fs"); 
const util = require("util");
let readFile = util.promisify(fs.readFile);
readFile("./myFile.txt", { encoding: "UTF8" })
.then(function(content) {
  console.log(content);
});