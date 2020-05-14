<template>  
	<Dialog ref='dialog' title='收费' width='60%' class='fxmc'>
		<!-- 物价列表 -->
		<Title title='物价列表' class='mb10'/>
		<Box>
			<header class='p10 bbor1'>
				<Form :inline='true' :model='model' @submit='submit'>
					<FormItem label='物价名称'>
    					<Input v-model='model.item_name' p='输入物价名称' @clear='submit' :disabled='pagingLoading'/>
  					</FormItem>
  					<FormItem label='物价代码'>
    					<Input v-model='model.price_code' p='输入物价代码' @clear='submit' :disabled='pagingLoading'/>
  					</FormItem>
  					<FormItem>
    					<Button label='搜索' icon='el-icon-search' native-type='submit'  @click='submit($event)' :loading='pagingLoading'/>
  					</FormItem>
				</Form>
			</header>
			<Table ref='list' :data='data' :col='col' @select='onSelect' :pag='pag' :loading='pagingLoading'/>
		</Box>
		<!-- 已选物价 -->
		<Title title='已选物价' class='mtb10'/>
		<Box class='oh'>
			<Table :data='data2' :col='col2' :height='200' emptyText='请先选择物价'>
				<el-table-column label='操作' align='center' width='120'>
					<template slot-scope='scope'>
						<Popconfirm @yes='onYes()'>
							<Button label='删除' icon='el-icon-delete' type='danger'  @click='onDel(scope)' slot='reference' />
						</Popconfirm>
					</template>
				</el-table-column>
			</Table>
			<dl class='fx h30 tc' v-if='data2.length>0'>
				<dt style='width:40%'>总计</dt>
				<dd class='ex lbor1'>{{total}}</dd>
			</dl>
		</Box>
		<footer class='fxmc mt20'>
			<Button label='保存' size='medium' @click='save' fixed :loading='pagingLoading'/>
			<div class='mlr15'></div>
			<Button label='取消' size='medium' plain fixed @click='close'/>
		</footer>
	</Dialog>
</template>

<script>
	// ================================================================ element-ui
	import { TableColumn, Popconfirm } from 'element-ui'
	Vue.use(TableColumn)
	Vue.use(Popconfirm)
	// ================================================================  class
	export default {
		components:{
			Box			: ()=>import('@cpx/box-1'),
			Title		: ()=>import('@cpt/title'),
			Dialog		: ()=>import('@cpt/ui/dialog'),
			Form		: ()=>import('@cpt/ui/form'),
			FormItem	: ()=>import('@cpt/ui/form-item'),
			Input		: ()=>import('@cpt/ui/input'),
			Button		: ()=>import('@cpt/ui/button'),
			Table		: ()=>import('@cpt/table-simple'),
			Col			: ()=>import('@cpt/ui/table-col'),
			Popconfirm	: ()=>import('@cpt/ui/popconfirm')
		},
		props:{
			
		},
		data(){
			return {
				fn:$fn,
				index:0,
				model:{
					
				},
				total:'0.00',
				data:[],
		        data2:[],
		        col:[
		        	{ prop:'selection' },
		        	{ prop:'item_name', 	label:'名称' },
		        	{ prop:'price_code', 	label:'物价代码'},
		        	{ prop:'price', 		label:'参考价' }
		        ],
		        col2:[
		        	{ prop:'item_name', 	label:'名称' },
		        	{ prop:'price_code', 	label:'物价代码'},
		        	{ prop:'price', 		label:'参考价' }
		        ],
		        pag:{ 
		        	small:true,
		        	change: v => this.fetch(v)
		        },
		        pagingLoading:true
			}
		},
		mounted(){
			this.fetch()
		},
		methods:{
			// ajax
			fetch(page){ $http.paging(this,'qt-item-source/select',{param:{page,limit:5,...this.model}}) },
			// 搜索
			submit(v){
				this.fetch()
			},
			// 打开、关闭弹窗
			open(){ this.$refs.dialog.open() },
			close(){ this.$refs.dialog.close() },
			// 添加选择数据
			onSelect(v){
				if(v.length > 0){
					this.data2 = Array.from(new Set([...this.data2,...v]))
					this.sum()
				}
			},
			// 删除选择数据
			onDel(scope){ this.index = scope.$index },
			onYes(){ 
				this.data2.splice(this.index,1);
				this.sum()
//				this.$refs.list.addRows(this.data2)
			},
			// 求和
			sum(){
				if(this.data2.length > 0){
					const arr = this.data2.map(v=>v.price*1)
					this.total =  arr.reduce((prev, next, index, array) => prev + next)
				}else{
					this.total = 0
				}
				this.total = this.total.toFixed(2)
			},
			// 保存
			save(){ 
				this.$emit('save',this.total)
				this.close()
			}
		}
	}
</script>