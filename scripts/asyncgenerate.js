const { Resolver } = require("dns/promises");
const { characters, tlds } = require("../constant");
const { generateDomainName2 } = require("../utils");
const Domain = require("../models/Domain");
var mongoose = require("mongoose");

const resolver = new Resolver();

let registered = [];

require("../db");

let X = 4;

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
    let numberofrequests = 1000;
    let i = 0;
    for (let tld of tlds) {
      let domains = generateDomainName2(X, characters);
      for (let j = 0; j < Math.pow(26, X); j++) {
        let url = domains.next().value;
        promises.push(checkAvailable(url + "." + tld));
        i++;
        if (i % numberofrequests === 0) {
          await Promise.all(promises);
          promises = [];
          console.log(registered);
          console.log(registered.length);
        }
      }
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    console.log(registered);
    console.log(registered.length);
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
