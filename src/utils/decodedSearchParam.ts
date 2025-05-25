export const getEncodedSearchParams = (searchParams: string) => {
  return encodeURIComponent(searchParams || "")
    .replaceAll(/%20/g, "+")
    .replaceAll(/%40/g, "@")
    .replaceAll(/%100/g, " ");
};

export const updatePlusCodeChar = (searchParams: string) => {
  return searchParams.replaceAll("+", "%100");
};
