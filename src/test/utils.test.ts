import { expect } from '@open-wc/testing';
import '../examples/hello';

const parent = document.querySelector('test-parent')!;
const childWrapDiv = parent.shadowRoot?.querySelector('.child-wrap');
const parentDiv = parent.shadowRoot?.querySelector('.parent');
const child = parent.shadowRoot?.querySelector('test-child');
const childDiv = child?.shadowRoot?.querySelector('.child');

describe('>>', () => {
  it('document `>>` query', () => {
    expect(document.deepQuerySelectorAll('test-parent >> *')).to.have.length(3);
    expect(document.deepQuerySelectorAll('test-parent  >>  *')).to.have.length(3);
    expect(document.deepQuerySelector('test-parent >> div')).to.equal(childWrapDiv);
    expect(document.deepQuerySelector('test-parent >> .parent')).to.equal(parentDiv);
    expect(document.deepQuerySelector('test-parent >> #parent')).to.equal(parentDiv);
  });
  it('element `>>` query', () => {
    expect(parent.deepQuerySelectorAll('>> *')).to.have.length(3);
    expect(parent.deepQuerySelectorAll(' >> *')).to.have.length(3);
    expect(parent.deepQuerySelector('>> div')).to.equal(childWrapDiv);
    expect(parent.deepQuerySelector('>> test-child >> div')).to.equal(childDiv);
    expect(parent.deepQuerySelector('>> test-child >> .child')).to.equal(childDiv);
    expect(parent.deepQuerySelector('>> test-child >> #child')).to.equal(childDiv);
  });
});

describe('>>>', () => {
  it('document `>>>` query', () => {
    expect(document.deepQuerySelectorAll('>>> div div')).to.have.length(2);
    expect(document.deepQuerySelectorAll('  >>>  div  div')).to.have.length(2);
    expect(document.deepQuerySelectorAll('>>> test-child')).to.have.length(1);
    expect(document.deepQuerySelector('body >>> div')).to.equal(childWrapDiv);
    expect(document.deepQuerySelector('body >>> .child')).to.equal(childDiv);
    expect(document.deepQuerySelector('body >>> #child')).to.equal(childDiv);
  });

  it('element `>>>` query', () => {
    expect(parent.deepQuerySelectorAll('>>> div')).to.have.length(4);
    expect(parent.deepQuerySelectorAll('>>> div div')).to.have.length(2);
    expect(parent.deepQuerySelectorAll('>>> :defined :defined')).to.have.length(3);
    expect(parent.deepQuerySelectorAll('>>> .child')).to.have.length(1);
    expect(document.body.deepQuerySelector('>>> div')).to.equal(childWrapDiv);
    expect(document.body.deepQuerySelector('test-parent >>> div')).to.equal(childWrapDiv);
    expect(document.body.deepQuerySelector('test-parent >>> .child')).to.equal(childDiv);
    expect(document.body.deepQuerySelector('test-parent >>> #child')).to.equal(childDiv);
  });
});
