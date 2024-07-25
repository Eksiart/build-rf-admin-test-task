type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

function getQueryParams(params: OptionalRecord<string, string>, replace: boolean = false) {
  let searchParams: URLSearchParams;
  if (replace) {
    searchParams = new URLSearchParams();
  } else {
    searchParams = new URLSearchParams(window.location.search);
  }

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });

  return `?${searchParams.toString()}`;
}

export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params));
}

export function newQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params, true));
}
