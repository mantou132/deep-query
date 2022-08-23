const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.resolve(__dirname, '../../dist/index.js'));

const QueryHandler = {
  queryOne: new Function(
    'element',
    'selector',
    `
      ${text}
      return element.deepQuerySelector(selector);
    `,
  ),
  queryAll: new Function(
    'element',
    'selector',
    `
      ${text}
      return element.deepQuerySelectorAll(selector);
    `,
  ),
};
module.exports.QueryHandler = QueryHandler;
