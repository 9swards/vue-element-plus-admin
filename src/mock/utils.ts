/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj: { [index: string]: any } = {};
  const searchArr = search.split('&');
  searchArr.forEach((v) => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      obj[name] = v.substring(index + 1, v.length);
    }
  });
  return obj;
}
