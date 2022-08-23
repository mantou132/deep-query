const fs = require('fs');
const path = require('path');
const text = fs.readFileSync(path.resolve(__dirname, '../../dist/index.js'));

const selectorFunction = new Function(
  'selector',
  'element',
  `
    ${text}
    return element.deepQuerySelectorAll(selector);
  `,
);

module.exports.locatorStrategy = selectorFunction;
