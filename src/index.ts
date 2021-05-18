function getSelfShadowRoots(containers: ParentNode[]) {
  const nodeList: ParentNode[] = [];
  for (const ele of containers) {
    const e = ele as Element;
    if (e.shadowRoot) {
      nodeList.push(e.shadowRoot);
    }
  }
  return nodeList;
}

function contactSelfAndSelfShadowRoot(containers: ParentNode[]) {
  return [...containers, ...getSelfShadowRoots(containers)];
}

function getAllSubShadowRoots(containers: ParentNode[]) {
  return getSelfShadowRoots(querySelectorAll('*', containers));
}

function contactAllShadowRoots(containers: ParentNode[]) {
  return [...getSelfShadowRoots(containers), ...getAllSubShadowRoots(containers)];
}

function contactSelfAndAllSubShadowRoots(containers: ParentNode[]) {
  return [...contactSelfAndSelfShadowRoot(containers), ...getAllSubShadowRoots(containers)];
}

function queryAll(deepSelector: string, containers: ParentNode[]): Element[] {
  const selectors = deepSelector.split(' ').filter((e) => !!e);
  return selectors.reduce((eles, selector) => {
    return eles
      .map((container) => {
        const childs = [...container.querySelectorAll(selector)];
        return [...queryAll(selector, contactAllShadowRoots(eles)), ...childs];
      })
      .flat() as Element[];
  }, containers) as Element[];
}

function querySelectorAll(deepSelector: string, containers: ParentNode[]): Element[] {
  if (deepSelector.includes('>>>')) {
    const selectors = deepSelector.split('>>>');

    if (selectors.length > 2) throw new Error('Cannot use multiple `>>>`');
    if (selectors[1] && selectors[1].includes('>>')) throw new Error('Cannot use `>>` after `>>>`');
    return queryAll(selectors[1], querySelectorAll(selectors[0], containers));
  } else {
    const selectors = deepSelector.split('>>');
    return selectors.reduce((eles, selector, index, arr) => {
      const isLastSelector = index === arr.length - 1;
      return eles
        .map((container) => {
          const childs = [...container.querySelectorAll(selector)];
          if (isLastSelector) {
            return childs;
          } else {
            return contactSelfAndAllSubShadowRoots(childs);
          }
        })
        .flat() as Element[];
    }, containers) as Element[];
  }
}

function querySelector(deepSelector: string, containers: ParentNode[]) {
  return querySelectorAll(deepSelector, containers)[0] || null;
}

declare global {
  interface Document {
    deepQuerySelector: (s: string) => null | Element;
  }
  interface Document {
    deepQuerySelectorAll: (s: string) => Element[];
  }
  interface Element {
    deepQuerySelector: (s: string) => null | Element;
  }
  interface Element {
    deepQuerySelectorAll: (s: string) => Element[];
  }
}

Document.prototype.deepQuerySelectorAll = function (selector: string) {
  return querySelectorAll(selector, [this]);
};

Document.prototype.deepQuerySelector = function (selector: string) {
  return querySelector(selector, [this]);
};

Element.prototype.deepQuerySelectorAll = function (selector: string) {
  return querySelectorAll(selector, contactSelfAndSelfShadowRoot([this]));
};

Element.prototype.deepQuerySelector = function (selector: string) {
  return querySelector(selector, contactSelfAndSelfShadowRoot([this]));
};

export {};
