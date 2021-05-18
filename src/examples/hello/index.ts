import '../../';

class Child extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <div id="child" class="child">child div</div>
    `;
  }
}
customElements.define('test-child', Child);

class Parent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <test-child></test-child>
      <div id="parent" class="parent">parent div</div>
    `;
  }
}
customElements.define('test-parent', Parent);

document.body.append(new Parent());
