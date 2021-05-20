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

function getSelfAndSelfShadowRoot(containers: ParentNode[]) {
  return [...containers, ...getSelfShadowRoots(containers)];
}

function getAllSubShadowRoots(containers: ParentNode[]) {
  return getSelfShadowRoots(querySelectorAll('*', containers));
}

function getAllShadowRoots(containers: ParentNode[]) {
  return [...getSelfShadowRoots(containers), ...getAllSubShadowRoots(containers)];
}

function getSelfAndAllSubShadowRoots(containers: ParentNode[]) {
  return [...getSelfAndSelfShadowRoot(containers), ...getAllSubShadowRoots(containers)];
}

// NOTE: Check shadowDOM first
function queryAll(deepSelector: string, containers: ParentNode[]): Element[] {
  if (!deepSelector) return [];
  if (!containers.length) return [];

  const nodeList: Element[] = [];

  // current css scope
  nodeList.push(
    ...containers
      .map((container) => {
        return [...container.querySelectorAll(deepSelector)];
      })
      .flat(),
  );

  const selectors = deepSelector.split(/(?:\w)\s+(?:\w)/).filter((e) => !!e.trim());

  let prevSelector = '';
  for (let i = 0; i < selectors.length; i++) {
    const nextContainers =
      prevSelector === ''
        ? containers
        : containers
            .map((container) => {
              return [...container.querySelectorAll(prevSelector)];
            })
            .flat();

    nodeList.push(...queryAll(deepSelector, getAllShadowRoots(nextContainers)));

    prevSelector = `${prevSelector} ${selectors[i]}`;
  }

  return nodeList;
}

function querySelectorAll(deepSelector: string, containers: ParentNode[]): Element[] {
  if (!deepSelector.trim()) throw new Error(`'${deepSelector}' is not a valid selector`);

  if (deepSelector.includes('>>>')) {
    const selectors = deepSelector.split('>>>');

    if (selectors.length > 2) throw new Error('Cannot use multiple `>>>`');
    if (selectors[1] && selectors[1].includes('>>')) throw new Error('Cannot use `>>` after `>>>`');
    if (!selectors[1].trim()) throw new Error('Cannot be empty after `>>>`');

    const deepBeforeContainers = selectors[0].trim() ? querySelectorAll(selectors[0], containers) : containers;
    return queryAll(selectors[1], deepBeforeContainers);
  } else {
    const selectors = deepSelector.split('>>');

    if (!selectors[selectors.length - 1].trim()) throw new Error('Cannot be empty after `>>`');

    return selectors.reduce((eles, selector, index) => {
      // Allow `>>` beginning
      if (!selector.trim()) return getSelfAndSelfShadowRoot(eles);

      const isLastSelector = index === selectors.length - 1;
      return eles
        .map((container) => {
          const childs = [...container.querySelectorAll(selector)];
          if (isLastSelector) {
            return childs;
          } else {
            return getSelfAndAllSubShadowRoots(childs);
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
  return querySelectorAll(selector, [this]);
};

Element.prototype.deepQuerySelector = function (selector: string) {
  return querySelector(selector, [this]);
};

export const deepQuerySelector = document.deepQuerySelector.bind(document);
export const deepQuerySelectorAll = document.deepQuerySelectorAll.bind(document);
