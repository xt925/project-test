import { Message } from 'element-ui'
let currMsg
const message = new Proxy(Message, {
  apply (target, ctx, args) {
    currMsg && currMsg.close()
    console.log(target, ctx, args)
    currMsg = Reflect.apply(target, ctx, args);
    return currMsg
  },
  get: function (target, propKey, receiver) {
    return function(...rest) {
      currMsg && currMsg.close()
      currMsg = Reflect.get(target, propKey, receiver)(...rest)
      return currMsg
    }
  }
})
export default message