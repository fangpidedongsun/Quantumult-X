const cookieName = '京东到家'
const signurlKey = 'chen_signurl_jddj'
const signheaderKey = 'chen_signheader_jddj'
const chen = init()
const requrl = $request.url
try{
  if (this.$request) {
    const signurlVal = requrl
    const signheaderVal = JSON.stringify($request.headers)
    chen.log(`URL:${signurlVal}`)
    const flag = requrl.includes('userSigninNew')
    if (flag) {
      chen.setdata(signurlVal, signurlKey)
      chen.setdata(signheaderVal, signheaderKey)
      chen.msg(cookieName, `获取Cookie: 成功`, ``)
    }
  }
}catch(e){
  chen.log(`${cookieName}失败 ${e}`)
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chen.done()