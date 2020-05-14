<template>  
	<div ref='box' style='position:relative;padding:5px;background:#fff;border-radius:5px;border: 1px solid #DCDFE6;height: 100px;margin-bottom: 24px;'>
		<textarea v-if="mode==='textarea'" ref='area' style='width:100%;height:100%;border:0;background:none;line-height:24px' :value='value' @input='onInput($event)' @keydown='onKeyDown($event)' />
		<input v-else ref='area' style='width:100%;height:100%;border:0;background:none;line-height:24px' :value='value' @input='onInput($event)' @keydown='onKeyDown($event)' />
		
		<dl ref='slide' @click.stop v-show='show' :style="{top:top + 'px',maxHeight:28*5 + 'px',left:mode==='textarea'?'10px':0,right:mode==='textarea'?'10px':0}" style='overflow-y:auto;position:absolute;left:10px;right:10px;box-shadow:2px 2px 5px #ddd;border-radius:5px;background:#fff'>
			<dd 
				v-for='(v,i) in data' 
				:key='i' 
				@click='onSelect(v.sugg_content)' 
				style='height:28px;line-height:28px;padding:0 5px;cursor:pointer;' 
				:style="{borderTop:i===0?0:'1px solid #eee',background:index===i?'#37a6da':'none',color:index===i?'#fff':'#333'}"
			>{{v.sugg_content}}</dd>
		</dl>
		<div class='info' v-if="mode==='textarea'">(使用向下" ↓ "箭头自动搜索)</div>  
	</div>  
</template>

<script>
	import $http from '@com/http'
	var clear
	export default {
		props:{
			styles	: String,
			id		: String, 			// kind_id
			type	: { type:Number, default:0 },
			value	: String,
			mode	: { type:String, default:'textarea' }
		},
		data(){
			return {
				data: [],
				show: false,
				top: 20,
				index:0,
				api:'report-result-suggestion/index'
			}
		},
		mounted(){
			document.querySelector('body').addEventListener('click',e=>{
				this.show = false
			})
			// 上下移动选择联想
			document.querySelector('body').addEventListener('keydown',e=>{
				if(this.show){
					if(e.keyCode === 40 && this.index < this.data.length-1){
						this.index ++
					}else if(e.keyCode === 38 && this.index>0){
						this.index --
					}else if(e.keyCode === 13){
						this.onSelect(this.data[this.index].sugg_content)
					}
				}
			})
			if(this.mode === 'textarea'){
				this.$refs.area.addEventListener('click',e=>{
					this.top = e.pageY - this.$refs.box.offset().top + 10
				})
			}else{
				this.top = this.$refs.box.clientHeight + 1
			}
		},
		methods:{
			onInput(e){
				this.$emit('input', e.target.value)
			},
			// 按向下箭头执行
			onKeyDown(e){
				if(this.show) return false
				if(e.keyCode === 40){
					this.index = 0
					const len = this.value.length
					const param = { kind_id:this.id }
					let search = this.value.substring(len-3,len)
					
					if(search.indexOf('\n') >= 0){ search = '' }
					
					if(this.type === 0){ 	// 建议与解释
						this.api = 'report-result-suggestion/index'
						param.sugg_content = search
					} else if (this.type === 1) { // 报告
						this.api = 'report-result-info/index' 
						param.result_content = search
					} else if(this.type === 2){ // 
						
					}
					// ajax
					$http.pull(this,this.api,{
						param: param,
						dataName:null
					}).then(data=>{
						this.data = data.items || []
						if(this.data.length > 0){
							this.show = true
							this.$refs.area.blur()
						}
					})
				}else if(e.keyCode === 38){
				
				}else{
					this.show = false
				}
			},
			// 选择文本并插入
			onSelect(v){
				this.show = false
				setTimeout(()=>{
					if(this.$refs.area){
						this.$refs.area.focus()
					}
					
					if(this.mode === 'textarea'){
						document.execCommand('insertHtml',false,v)
					}else{
						this.$refs.area.value = v
					}
				})
			}
		}
	}
</script>
<style scoped>
.info{
	position: absolute;
	bottom: -24px;
	line-height: 24px;
	color: #ccc
}
</style>