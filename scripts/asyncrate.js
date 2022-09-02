const { Resolver } = require("dns/promises");
const { characters, tlds } = require("../constant");
const { generateDomainName } = require("../utils");
const Domain = require("../models/Domain");
var mongoose = require("mongoose");

const resolver = new Resolver();

let registered = [];

require("../db");

let X = 3;
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
    let i = 0;
    for (let tld of tlds) {
      for (let domain of domains) {
        promises.push(checkAvailable(domain + "." + tld));
      }
      i++;
      if (i % 10 === 0) {
        await Promise.all(promises);
        promises = [];
      }
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  } catch (err) {}
  try {
    let created = [];
    for (let url of registered) {
      created.push(
        Domain.create({
          url,
        })
      );
    }
    await Promise.all(created);
    console.log("URLS Saved On DATABASE");
  } catch (error) {
    console.log(error);
  }

  console.log(registered);
  console.log(registered.length);
  mongoose.connection.close();
})();
