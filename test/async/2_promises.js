const filesystem = require("fs");

// PROMISES
// Promises are special object-abstraction over result of async operation that is not ready yet
let futureResult = new Promise(function(resolve, reject) {
  setTimeout(function() {
    console.log("Now our Promise is fulfilled after 2 secs!");
    resolve();
  }, 2000);
});

// Key feature is possibility to subscribe to result when it will be ready using .then()
futureResult.then(function() {
  console.log("1 Yay! Promise is fulfilled!");
});
// You can subscribe multiple times to same promise:
futureResult.then(function() {
  console.log("2 Yay! Promise is fulfilled!");
});

// Lets rewrite this to use Promise
filesystem.readFile(
  // relative path to file
  `./6/data/1.json`,
  // reading options
  { encoding: "UTF8" },
  // special function called callback:
  function(err, content) {}
);

function readFile(filename) {
  let result = new Promise(function(resolve, reject) {
    filesystem.readFile(
      // relative path to file
      `./6/data/${filename}`,
      // reading options
      { encoding: "UTF8" },
      // special function called callback:
      function(err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      }
    );
  });
  return result;
  // Our function returns Promise,
  // that will allow us listen for result of async operation
}

// And usage is folowing
console.log("Reading file async 1.json");
let promise1 = readFile("1.json");
// Instead of passing callback - we are "subscribe" to "resolved" state of promise
promise1.then(function(content) {
  console.log("File 1.json returned", content);
});
console.log("Reading file async 2.json");
let promise2 = readFile("2.json");
promise2.then(function(content) {
  console.log("File 2.json returned", content);
});
console.log("Reading file async 3.json");
let promise3 = readFile("3.json");
promise3.then(function(content) {
  console.log("File 3.json returned", content);
});
console.log("Done scheduling async commands");

// Lets make this print ordered
console.log("Reading file async 1.json");
readFile("1.json")
  .then(function(content) {
    console.log("File 1.json returned", content);
    console.log("Reading file async 2.json");
    return readFile("2.json");
  })
  .then(function(content2) {
    console.log("File 2.json returned", content2);
    console.log("Reading file async 3.json");
    return readFile("3.json");
  })
  .then(function(content3) {
    console.log("File 3.json returned", content3);
  });
console.log("Done scheduling async command");

// Error handling with promises
console.log("Reading file async 1.json");
readFile("1.json")
  .then(function(content) {
    console.log("File 1.json returned", content);
    console.log("Reading file async nonexistingfile.json");
    return readFile("nonexistingfile.json");
  })
  .then(function(content2) {
    console.log("File 2.json returned", content2);
    console.log("Reading file async 3.json");
    return readFile("3.json");
  })
  .then(function(content3) {
    console.log("File 3.json returned", content3);
  })
  .catch(function(err) {
    console.log("Oh no, we have error!");
    console.log(err);
  })
console.log("Done scheduling async command");
