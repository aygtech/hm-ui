const timeTransfer = (time, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!time) return ''

  time = new Date(time)
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${time.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return format
}

export default {
  timeTransfer,
}
