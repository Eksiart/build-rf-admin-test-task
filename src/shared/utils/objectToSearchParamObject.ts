type ReturnType = Record<string, string | number | boolean>;

export const objectToSearchParamObject = (obj: object): ReturnType => {
  const newObj: ReturnType = {};
  Object.entries(obj).forEach(([name, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        newObj[name] = value.toString();
      } else {
        newObj[name] = value;
      }
    }
  });
  return newObj;
};

export const objectToSearchParamObjectOnlyStrings = (obj: object): Record<string, string> => {
  const newObj: Record<string, string> = {};
  Object.entries(obj).forEach(([name, value]) => {
    if (value !== undefined && value !== '') {
      newObj[name] = value.toString();
    }
  });
  return newObj;
};
