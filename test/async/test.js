
const content = undefined;

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
    content = content
  }
);

console.log('', content)