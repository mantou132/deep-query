import '../../';

class Child extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <div id="child" class="child">
        child-div
        <div id="child-child" class="child-child">child-child-div</div>
      </div>
    `;
  }
}
customElements.define('test-child', Child);

class Parent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <div id="child-wrap" class="child-wrap">
        <test-child></test-child>
      </div>
      <div id="parent" class="parent">parent div</div>
    `;
  }
}
customElements.define('test-parent', Parent);

document.body.append(new Parent());

console.log(document.querySelector('test-parent')?.deepQuerySelectorAll('>>> :defined  :defined'));
