const stateManager: Record<any, any> = {};

export function c(e: string | ((props: any) => HTMLElement), props?: any) {
  let element: HTMLElement;
  if (typeof e === "string") {
    element = document.createElement(e);
    const { children, ...remProps } = props;

    // creating event handlers
    Object.keys(remProps).forEach((propKey) => {
      if (propKey.startsWith("on")) {
        const type = propKey.slice(2).toLowerCase();
        element.addEventListener(type, remProps[propKey]);
      }
    });

    // other props
    Object.keys(remProps).forEach((propKey) => {
      if (!propKey.startsWith("on")) {
        if (propKey === "className")
          element.setAttribute("class", remProps[propKey]);
        else element.setAttribute(propKey, remProps[propKey]);
      }
    });

    // children
    if (typeof children === "string") {
      element.innerHTML = children;
    } else if (Array.isArray(children))
      children.forEach((i: any) => element.appendChild(i));
    else element.appendChild(children);
  } else {
    element = e(props);
  }
  return element;
}

const meta = {
  e: null as null | (() => HTMLElement),
  app: null as null | HTMLElement,
};

export function render(e: () => HTMLElement, app: HTMLElement) {
  meta.e = e;
  meta.app = app;
  app.appendChild(e());
}

function reRender() {
  if (meta.app && meta.e) {
    meta.app.innerHTML = "";
    meta.app.appendChild(meta.e());
  }
}

function getState<T>(key: string): T {
  return stateManager[key];
}

function setState<T>(key: string, value: T) {
  stateManager[key] = value;
  reRender();
}

export function useState<T>(key: string, value: T) {
  if (!getState(key)) {
    stateManager[key] = value;
  }
  return [getState<T>(key), (item: T) => setState(key, item)] as const;
}
