# Deep query

Support over the ShadowDOM boundary query element.

Add `deepQuerySelector` and `deepQuerySelectorAll` method to `document` and `Element`, these methods support `>>`, `>>>` selector.

Note: `DeepQuerySelectorall` return array and not sort in DOM Tree.

# Install

```bash
npm i deep-query-selector
```

or

```ts
import 'https://cdn.skypack.dev/deep-query-selector';
```

## Usage

```ts
document.deepQuerySelector('test-parent >> div');
document.deepQuerySelector('test-parent >> .parent');
document.deepQuerySelector('test-parent >> #parent');
parent.deepQuerySelector('>> test-child >> div');
parent.deepQuerySelector('>> test-child >> .child');
parent.deepQuerySelector('>> test-child >> #child');
document.deepQuerySelector('body >>> div');
document.deepQuerySelector('body >>> .child');
document.deepQuerySelector('body >>> #child');
document.body.deepQuerySelector('>>> div');
document.body.deepQuerySelector('test-parent >>> div');
document.body.deepQuerySelector('test-parent >>> .child');
document.body.deepQuerySelector('test-parent >>> #child');
```
