import { Message } from 'element-ui'

module.exports = (msg,index,time) => {const arr = ['warning','success','info','error']
    const i = $fn.isNumber(index) ? index : 1
    Message({message:msg, type:arr[i], duration:time||1500, offset:100})
}
