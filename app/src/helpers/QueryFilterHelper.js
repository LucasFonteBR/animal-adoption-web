export const builderQueryStringFilter = (querySearch) => {
  if (!querySearch) {
    return '';
  }
  const objectKeys = Object.keys(querySearch);
  if (objectKeys.length <= 0) {
    return '';
  }

  return objectKeys
    .filter((key) => querySearch[key] && querySearch[key] !== '')
    .map((key) => key + '=' + querySearch[key])
    .join('&');
};
