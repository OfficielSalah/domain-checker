const { Resolver } = require("dns/promises");
const { characters, tlds } = require("../constant");
const { generateDomainName } = require("../utils");

const resolver = new Resolver();

let registered = [];

let X = 4;
let domains = generateDomainName(X, characters);

console.log(domains.length);
console.log("domains generated");

const checkAvailable = async (url) => {
  await resolver
    .resolve4(url)
    .then((addresses) => {
      console.log("DOMAIN REGISTERED : " + url);
      registered.push(url);
    })
    .catch((err) =>
      console.log(
        `${url} | ERROR CODE: ${err.code} |  ERROR MESSAGE: ${err.message}`
      )
    );
};

(async function () {
  try {
    let promises = [];
    for (let tld of tlds) {
      for (let domain of domains) {
        promises.push(checkAvailable(domain + "." + tld));
      }
    }
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }

  console.log(registered);
  console.log(registered.length);
})();
