const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.resolve(__dirname, '../../dist/index.js'));

// a string because playwright does a .toString on a selector engine and we need to
// make sure that query-selector-shadow-dom is injected and loaded into the function closure
const engineString = `
    ${text}
    return {
        create(root, target) {
            return undefined;
        },
        query(root, selector) {
            return root.deepQuerySelector(selector);
        },
        queryAll(root, selector) {
            return root.deepQuerySelectorAll(selector);
        }
    }
`;
const selectorEngine = new Function('', engineString);

module.exports = { selectorEngine };
