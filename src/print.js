const nodes = require("./nodes");

function printNode(path, opts, print) {
  const { type, body } = path.getValue();

  if (type in nodes) {
    return nodes[type](path, opts, print);
  }

  if (type[0] === "@") {
    return body;
  }

  throw new Error(
    `Unsupported node encountered: ${type}\n${JSON.stringify(body, null, 2)}`
  );
}

module.exports = printNode;
