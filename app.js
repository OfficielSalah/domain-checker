const { Resolver } = require("dns");
const resolver = new Resolver();

let registered = [];

let arr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let tlds = [
  "com",
  "net",
  "org",
  "jp",
  "de",
  "uk",
  "fr",
  "br",
  "it",
  "ru",
  "es",
  "me",
  "gov",
  "pl",
  "ca",
  "au",
  "cn",
  "co",
  "in",
  "nl",
];

function generateDomainName(X, arr) {
  let ml = [];
  let result = [];
  ml = arr;
  for (let i = 0; i < ml.length; i++) {
    result.push(ml[i]);
  }

  let count = ml.length;

  // Traverse all possible lengths
  for (let z = 0; z < X - 1; z++) {
    // Stores all combinations
    // of length z
    let tmp = [];

    // Traverse the array
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < ml.length; k++) {
        if (arr[i] != ml[k]) {
          // Generate all
          // combinations of length z
          tmp.push(ml[k] + arr[i]);
          count += 1;
        }
      }
    }

    // Print all combinations of length z
    for (let i = 0; i < tmp.length; i++) {
      result.push(tmp[i]);
    }

    // Replace all combinations of length z - 1
    // with all combinations of length z
    ml = tmp;
  }
  return result;
}

let X = 3;
let result = generateDomainName(X, arr);

function* data(arr) {
  yield* arr;
}

let arrayOfDomains = data(result);

const checkAvailable = (url) => {
  resolver.resolve4(url, (err, addresses) => {
    if (err) {
      console.log(
        `${String(url).toUpperCase()} | ERROR CODE: ${
          err.code
        } |  ERROR MESSAGE: ${err.message}`
      );
    } else {
      registered.push(url);
    }
  });
};
let i = 0;
const main = () => {
  while (true) {
    let tmp = arrayOfDomains.next().value;
    console.log(tmp);
    if (tmp === undefined) {
      console.log("undefined is detected");
      break;
    }
    for (let tld of tlds) {
      checkAvailable(tmp + "." + tld);
    }
  }
};
main();
