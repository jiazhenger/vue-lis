import { Message } from 'element-ui'
/* ====================================== 方法插件  ====================================== */
export default{
	install(Vue){
      // 信息提示
      Vue.prototype.$msg = (msg,index,time) => {const arr = ['warning','success','info','error']
      	const i = $fn.isNumber(index) ? index : 1
      	Message({message:msg, type:arr[i], duration:time||1500, offset:100})
      }
  }
}