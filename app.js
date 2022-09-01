const dns = require("dns/promises");
var unicode = require("unidecode");
const tldEnum = require("tld-enum");

// const list = tldEnum.list;
const list = ["com", "org", "net", "int", "edu", "gov", "mil"];

const prefixes = [
  "google",
  "yotta",
  "zetta",
  "exa",
  "peta",
  "tera",
  "giga",
  "mega",
  "kilo",
  "hecto",
  "deka",
  "deci",
  "centi",
  "milli",
  "micro",
  "nano",
  "pico",
  "femto",
  "atto",
  "zepto",
  "yocto",
];

let registered = [];

const asynccheckAvailable = async (url) => {
  await dns.resolve4(url).then((res) => {
    registered.push(url);
  });
};

(async function () {
  for (let pre of prefixes) {
    for (let li of list) {
      try {
        await asynccheckAvailable(pre + "." + unicode(li));
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log(registered);
})();
