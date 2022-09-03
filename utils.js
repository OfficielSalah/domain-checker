function generateDomainName(X, arr) {
  let ml = [];
  let result = [];
  ml = arr;
  for (let i = 0; i < ml.length; i++) {
    result.push(ml[i]);
  }

  let count = ml.length;

  for (let z = 0; z < X - 1; z++) {
    let tmp = [];

    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < ml.length; k++) {
        if (arr[i] != ml[k]) {
          tmp.push(ml[k] + arr[i]);
          count += 1;
        }
      }
    }

    for (let i = 0; i < tmp.length; i++) {
      result.push(tmp[i]);
    }

    ml = tmp;
  }
  return result;
}
function* generateDomainName2(X, arr) {
  let ml = [];
  ml = arr;
  for (let i = 0; i < ml.length; i++) {
    yield ml[i];
  }

  let count = ml.length;

  for (let z = 0; z < X - 1; z++) {
    let tmp = [];

    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < ml.length; k++) {
        if (arr[i] != ml[k]) {
          tmp.push(ml[k] + arr[i]);
          yield ml[k] + arr[i];
          count += 1;
        }
      }
    }
    ml = tmp;
  }
}
module.exports = { generateDomainName, generateDomainName2 };
