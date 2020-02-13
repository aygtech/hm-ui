import url from './url'

/**
 * 返回一个lower - upper之间的随机数
 * @param {Number} lower
 * @param {Number} upper
 * @return  {Number} 返回值
 */
function random(lower, upper) {
  lower = +lower || 0
  upper = +upper || 0
  return Math.random() * (upper - lower) + lower
}

export default {
  ...url,
  random,
}
