/**
 * getUrlHash 方法
 * @param  {[String]} url [default:location.href]
 * @return {[String]}
 */
function getUrlHash(url) {
  return decodeURIComponent(url ? url.substring(url.indexOf('#') + 1) : window.location.hash.substr(1))
}

export default {
  getUrlHash,
}
