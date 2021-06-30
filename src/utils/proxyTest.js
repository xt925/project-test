let proxys = {};
(function() {
  const proxyConfig = {
    set (target, prop, value) {
      // let currValue = Reflect.get(target, prop)
      if (typeof value !== 'number') {
        throw new Error('Type validation error')
      }
      target[prop] = value
      return true
    },
    // 防止使用new 关键字调用
    construct: function(trapTarget,argumentList){
      throw new Error("拒绝new");
    }
  }
  
  proxys.NumberArray = (...rest) => {
    let array = new Array(...rest)
    return new Proxy(array, proxyConfig)
  }
})()

export default proxys