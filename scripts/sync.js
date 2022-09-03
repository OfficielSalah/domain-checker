const { Resolver } = require("dns");
const { characters, tlds } = require("../constant");
const { generateDomainName } = require("../utils");

const resolver = new Resolver();

let registered = [];

let X = 5;
let domains = generateDomainName(X, characters);

console.log(domains.length);
console.log("domains generated");

const checkAvailable = (url) => {
  resolver.resolve4(url, (err, addresses) => {
    if (err) {
      console.log(
        `${url} | ERROR CODE: ${err.code} |  ERROR MESSAGE: ${err.message}`
      );
    } else {
      console.log("DOMAIN REGISTERED : " + url);
      registered.push(url);
      console.log(registered.length);
      console.log(registered);
    }
  });
};

for (let domain of domains) {
  for (let tld of tlds) {
    checkAvailable(domain + "." + tld);
  }
}
