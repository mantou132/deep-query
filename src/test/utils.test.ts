import { expect } from '@open-wc/testing';
import '../examples/hello';

const parent = document.querySelector('test-parent')!;
const parentDiv = parent.shadowRoot?.querySelector('div');
const child = parent.shadowRoot?.querySelector('test-child');
const childDiv = child?.shadowRoot?.querySelector('div');

describe('>>', () => {
  it('document `>>` query', () => {
    expect(document.deepQuerySelector('test-parent >> div')).to.equal(parentDiv);
    expect(document.deepQuerySelector('test-parent >> .parent')).to.equal(parentDiv);
    expect(document.deepQuerySelector('test-parent >> #parent')).to.equal(parentDiv);
  });
  it('element `>>` query', () => {
    expect(parent.deepQuerySelector('>> div')).to.equal(parentDiv);
    expect(parent.deepQuerySelector('test-child >> div')).to.equal(childDiv);
    expect(parent.deepQuerySelector('test-child >> .child')).to.equal(childDiv);
    expect(parent.deepQuerySelector('test-child >> #child')).to.equal(childDiv);
  });
});

describe('>>>', () => {
  it('document `>>>` query', () => {
    expect(document.deepQuerySelector('body >>> div')).to.equal(childDiv);
    expect(document.deepQuerySelector('body >>> .child')).to.equal(childDiv);
    expect(document.deepQuerySelector('body >>> #child')).to.equal(childDiv);
  });

  it('element `>>>` query', () => {
    expect(document.body.deepQuerySelector('>>> div')).to.equal(childDiv);
    expect(document.body.deepQuerySelector('test-parent >>> div')).to.equal(childDiv);
    expect(document.body.deepQuerySelector('test-parent >>> .child')).to.equal(childDiv);
    expect(document.body.deepQuerySelector('test-parent >>> #child')).to.equal(childDiv);
  });
});
