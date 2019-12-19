const fs = require("fs");

// All operations we did before are blocking
// This means that next operation won't be started before previous is complete
function doMath(a, b) {
  console.log("1 Doing math for ", a, b);
  return a + b;
}

console.log("0 Starting...");
doMath(2, 2); // <-- synchronus code
console.log("2 Did math!");
console.log("3 Ending...");

// One of strong side of JS, is that it works extremely well with special asynchronus operations
// These operations does not block next commands execution until async command execution completed:
function asyncDoMath(a, b) {
  console.log("1.0 Starting doing math for", a, b);
  // setTimeout means - run this function in 2 seconds, not immediately
  setTimeout(function() {
    console.log("1.1 Result is", a + b);
  }, 2000);
}

console.log("0 Starting...");
asyncDoMath(5, 5); // <-- async code, does not block next commands to be started
console.log("2 Did math!");
console.log("3 Ending...");

// This extremely useful for long running Input/Output operations like reading files, sending HTTP requests...
// Lets see 2 implementations for printing file content - sync and async
function printFileSync(name) {
  const fs = require("fs");
  let content = fs.readFileSync(`./data/${name}`, { encoding: "UTF8" });
  console.log(name, "is ready:");
  console.log(content);
}

function printFileAsync(name) {
  const fs = require("fs");
  fs.readFile(`./data/${name}`, { encoding: "UTF8" }, function(err, content) {
    console.log(name, "is ready:");
    console.log(content);
  });
}

// Sync:
console.log("Reading file sync 1.json");
printFileSync("1.json");
console.log("Reading file sync 2.json");
printFileSync("2.json");
console.log("Done executing sync commands");

// Async
console.log("Reading file async 1.json");
printFileAsync("1.json");
console.log("Reading file async 2.json");
printFileAsync("2.json");
console.log("Done scheduling async commands");

// You can think of Async code like 'schedule to execute this operation in background'

// Lets see how fs.readFile looks like:
fs.readFile(
  // relative path to file
  `./6/data/1.json`,
  // reading options
  { encoding: "UTF8" },
  // special function called callback:
  function(err, content) {
    console.log(content);
  }
);

// Callback is a special function that will be executed once your async operation is complete
// You can think of it like -
// please call this function once file will be opened and content will be loaded
// Notice! fs.readFile DOES NOT RETURN ANYTHING (undefined)
let a = fs.readFile();
a; // undefined

// Result of your async function will be passed to callback function
fs.readFile(
  // relative path to file
  `./6/data/notexisting.json`,
  // reading options
  { encoding: "UTF8" },
  // special function called callback:
  function(err, content) {
    console.log("Here is our async function returned result!");
    console.log(content);
  }
);

// ERRORS handling:
fs.readFile(
  // relative path to file
  `./6/data/notexisting.json`,
  // reading options
  { encoding: "UTF8" },
  // special function called callback:
  function(err, content) {
    // It is convention - first parameter of callback function must be err
    // if we have error
    if (err) {
      console.log("Oh no, we have error!");
      console.log(err);
      // you can re-throw if you want
      throw err;
    }
    console.log(name, "is ready:");
    console.log(content);
  }
);

// Why we can't just do try/catch?
try {
  fs.readFile();
} catch (err) {
  // blabla
}
// Because async function is only SCHEDULED at this point, and not actually executed
// Execution stack will be different when function will be actually executed,
// so try/catch cannot handle that

// ******************************************************************************************
// Why callbacks are bad?

// When you need to run commands in strict order
// Example: Reading first file, using content of that file to read next files
// DO NOT WORRY IF YOU DONT UNDERSTAND
// This is called pyramid of DOOM
const fs = require("fs");
fs.readFile(`./test/async/data/paths.json`, { encoding: "UTF8" }, function(
  err,
  filepaths
) {
  // converting string to json
  let parsedFilepaths = JSON.parse(filepaths);
  // showing what we got
  console.log("Got file paths!", parsedFilepaths);
  fs.readFile(parsedFilepaths.first, { encoding: "UTF8" }, function(
    err,
    contentFirst
  ) {
    console.log("Got first file", contentFirst);
    fs.readFile(parsedFilepaths.second, { encoding: "UTF8" }, function(
      err,
      contentSecond
    ) {
      console.log("Got second file", contentSecond);
      fs.readFile(parsedFilepaths.third, { encoding: "UTF8" }, function(
        err,
        contentThird
      ) {
        console.log("Got third file", contentThird);
      });
    });
  });
});

// Problem #2 - Error handling
// Who can say where the problem is?
const fs = require("fs");
fs.readFile(`./6/data/paths.json`, { encoding: "UTF8" }, function(
  err,
  filepaths
) {
  // converting string to json
  let parsedFilepaths = JSON.parse(filepaths);
  // showing what we got
  console.log("Got file paths!", parsedFilepaths);
  fs.readFile(parsedFilepaths.first, { encoding: "UTF8" }, function(
    err,
    contentFirst
  ) {
    console.log("Got first file", contentFirst);
    fs.readFile(parsedFilepaths.second, { encoding: "UTF8" }, function(
      err,
      contentSecond
    ) {
      console.log("Got second file", contentSecond);
      fs.readFile(parsedFilepaths.three, { encoding: "UTF8" }, function(
        err,
        contentThird
      ) {
        console.log("Got third file", contentThird); // OOOPS - undefined!
      });
    });
  });
});

// Problem is here
// fs.readFile(`./${parsedFilepaths.three}`, - wrong string

const fs = require("fs");
fs.readFile(
  // path to first file
  `./6/data/paths.json`,
  // options
  { encoding: "UTF8" },
  // callback
  function(err, filepaths) {
    if (err) {
      throw err;
    }
    // converting string to json
    let parsedFilepaths;
    try {
      parsedFilepaths = JSON.parse(filepaths);
    } catch (err) {
      throw err;
    }
    // showing what we got
    console.log("Got file paths!", parsedFilepaths);
    fs.readFile(parsedFilepaths.first, { encoding: "UTF8" }, function(
      err,
      contentFirst
    ) {
      if (err) {
        throw err;
      }
      console.log("Got first file", contentFirst);
      fs.readFile(parsedFilepaths.second, { encoding: "UTF8" }, function(
        err,
        contentSecond
      ) {
        if (err) {
          throw err;
        }
        console.log("Got second file", contentSecond);
        fs.readFile(
          `./${parsedFilepaths.three}`,
          { encoding: "UTF8" },
          function(err, contentThird) {
            if (err) {
              throw err;
            }
            // OOOPS - undefined!
            console.log("Got third file", contentThird);
          }
        );
      });
    });
  }
);
// Horrible code became even more horrible!
