import { html, GemElement, customElement } from '@mantou/gem';

@customElement('lib-switch')
export class Switch extends GemElement {
  get content() {
    return 'content';
  }
  render() {
    return html`lib-switch`;
  }
}
