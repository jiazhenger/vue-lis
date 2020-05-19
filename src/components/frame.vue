<template>
	<el-container class='wh' style='background:#e8f0f6;'>
		<!-- 左侧 -->
		<el-aside class='fv' width='180px'>
			<!-- logo -->
			<div class='fxmc' style='height:56px;background:#37a6da;'>
				<div class='fxm cf'>
					<Img :src='ImgLogo' size='36px'/>
					<hgroup class='ml10'>
						<h2 class='f16 omits-1'>诺森检验</h2>
						<h3 class='f12 omits-1'>实验室信息管理系统</h3>
					</hgroup>
				</div>
			</div>
			<!-- menu -->
			<el-menu class='ex' v-if='fn.hasArray(data)' id='vertial-menu' :collapse='collapse'>
				<template v-for='(v,i) in data'>
					<el-submenu :index='i.toString()'>
						<template slot='title'><i class='m-ico el-icon-menu'></i><span>{{v.title}}</span></template>
						<el-menu-item-group>
							<template v-for='(p,j) in v.children'>
								<el-menu-item :index="i + '-' + j">{{p.title}}</el-menu-item>
							</template>
						</el-menu-item-group>
					</el-submenu>
				</template>
			</el-menu>
		</el-aside>
		<!-- center -->
		<div></div>
		<!-- 右侧 -->
		<div class='fv ex' id='horizontal-menu'>
			<header class='w fx bcf' style='padding:0;height:56px'>
				<!-- 横向菜单 -->
				<el-menu :default-active='activeIndex' mode='horizontal' style='border:0' class='ex' @select='select'>
					<template v-for='(v,i) in menu'>
						<el-menu-item :index='v.route'><i class='m-ico el-icon-menu'></i><span>{{v.title}}</span></el-menu-item>
					</template>
				</el-menu>
				<!--  -->
				<div class='fx'>
					<User class='mr20' />
					<NavItem title='首页' ico='el-icon-s-home' @click="$router.push('/')" />
					<NavItem title='消息' ico='el-icon-message-solid' />
					<NavItem title='设置' ico='el-icon-s-tools' />
					<NavItem title='导航' ico='el-icon-menu' />
					<NavItem title='退出' ico='el-icon-switch-button' @click='logout' />
				</div>
			</header>
			<div class='ex bcf r3px' style='margin:10px 0 0 10px'>
				<slot></slot>
			</div>
		</div>
	</el-container>
</template>

<script>
    // ================================================================ element-ui
    import { Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
    Vue.use(Container)
    Vue.use(Aside)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItemGroup)
    Vue.use(MenuItem)
    // ================================================================ 二次封装 element-ui
    const $msg = import('@eu/js/msg')
    const $confirm = import('@eu/js/confirm')
	// ================================================================ 加载图片
	import ImgLogo from '@img/frame/logo.png'
	// ================================================================ 自定义模板
	Vue.component('NavItem', {
        template: `
        	<div class='fxmc tc c0 cp tap' style='width:56px;height:56px' @click='click'>
        		<div><i :class='ico' style='font-size:16px'></i><h6 class='f12'>{{title}}</h6></div>
        	</div>
        `,
        props:{ ico:String, title:String, link:String },
        methods:{
        	click(){ this.$emit('click') }
        }
    })
	// ================================================================  class
	export default {
		components:{
			Img: 		() => import('@cpx/img'),
			User: 		() => import('@tp/user'),
		},
		props:{
			title : String,
			menu : { type:Array, default:[] }
		},
		data(){
			return {
				fn:$fn,
				ImgLogo,
				data: [],
				collapse:false,
				activeIndex: '0'
			}
		},
		mounted(){
			// 首次加载时，获取当前菜单选中项、左侧菜单列表数据
			const hash = location.hash.replace('#','')
			const arr = this.menu.filter(v => hash.indexOf(v.route) >= 0)
			if($fn.hasArray(arr)){
				this.activeIndex = arr[0].route
				this.data = arr[0].data
			}
		},
		methods:{
			select(v){
				// 获取与当前Url匹配的数据
				const arr = this.menu.filter(x=>x.route === v)
				if($fn.hasArray(arr)){ this.data = arr[0].data }
				// 跳转到指定路由
				this.$router.push(v)
			},
			// 退出登录
			logout(){
                $confirm.then(f=>{
                    f('确认退出登录?', '提示', {
                        confirmButtonText: '退出登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(data=>{
                        $http.submit(this,'index/logout',{dataName:null,loading:true,replace:'/login',loadingText:'退出登录中'}).then(data=>{
                            $fn.remove()
                            $msg.then(f=>f('您已退出登录'))
                        })
                    }).catch(action=>{})
                })
			}
		}
	}
</script>
