export const stringify = (params: object) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, v));
      continue;
    }

    search.set(key, value);
  }

  return search;
};
