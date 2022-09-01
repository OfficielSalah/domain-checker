var dns = require("dns");

function checkAvailable(url) {
  //uses the core modules to run an IPv4 resolver that returns 'err' on error
  dns.resolve4(url, function (err, addr) {
    if (addr) {
      console.log("domain name registered");
    }
    if (err) console.log(url + " is possibly available : " + err);
  });
}
// calls the function of a given url
checkAvailable("google.com");
