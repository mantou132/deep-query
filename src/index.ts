import { html, GemElement, customElement } from '@mantou/gem';

import './elements/switch';

@customElement('lib-root')
export class Lib extends GemElement {
  render() {
    return html`
      <style>
        lib-switch {
          margin-top: 5em;
        }
      </style>
      <lib-switch></lib-switch>
    `;
  }
}
