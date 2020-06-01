<template>
	<Content contentClass='pt20 fv wh' scrollXY mw='700px'>
		<!-- 消息 -->
		<header @click='open'>
			<div class='bor1 r100px fxm plr25' style='margin:0 10%;height:60px'>
				<div class='bcm r100px fxmc' style='width:24px;height:24px;'><i class='icon-tongzhi cf'></i></div>
				<div class='ex h60 ml10 mr20'>4564</div>
				<User />
			</div>
		</header>
		<!-- logo -->
		<Img :src='ImgLogo' width='300px' class='mt40 mb40'/>
		<!-- menu -->
		<nav>
			<menu class='fxw xj' style='width:500px;margin:0 auto'>
				<MenuItem title='实验室系统'	:ico='ImgN1'	color='#5CB8E8' link='/main/laboratory/testCenter' 	isSpace />
				<MenuItem title='物流系统' 	:ico='ImgN2' 	color='#FFBC00' link='/main/logistics'	isSpace />
				<MenuItem title='管理员系统' :ico='ImgN3' 	color='#7179F2' link='/main/admin' />
				<MenuItem title='业务系统' 	:ico='ImgN4' 	color='#13AE60' link='/main/business'	isSpace />
				<MenuItem title='客服系统' 	:ico='ImgN5' 	color='#5675BC' link='/main/service' 	isSpace />
				<MenuItem title='财物系统' 	:ico='ImgN6' 	color='#FD8442' link='/main/financing'/>
			</menu>
		</nav>
		<div class='ex'></div>
		<!-- footer -->
		<footer class='f12 c0 tc fxc pb5'>
			<p>LIS系统-B</p>
			<p style='margin:0 70px'>操作者：admin</p>
			<p>关于诺森医学检验</p>
			<p style='margin-left:70px'>联系电话 100-0000</p>
		</footer>
        <Charge ref='c' />
	</Content>
</template>


<script>
	// ================================================================ 加载图片
	import ImgLogo from '@img/index/logo.png'
	import ImgN1 from '@img/index/n-1.png'
	import ImgN2 from '@img/index/n-2.png'
	import ImgN3 from '@img/index/n-3.png'
	import ImgN4 from '@img/index/n-4.png'
	import ImgN5 from '@img/index/n-5.png'
	import ImgN6 from '@img/index/n-6.png'
	// ================================================================ 自定义模板
	Vue.component('MenuItem', {
        template: `
        	<li class='bor1 r10px fxm mb50 tap cp' @click='$router.push(link)' style='width:120px;height:120px;box-shadow:0px 1px 6px rgba(0,0,0,0.1)' :style="{marginRight:isSpace?'70px':'0'}">
        		<div class='w'>
        			<Img :src='ico' width='35px'/>
        			<h3 class='tc f18 mt15' :style='{color:color}'>{{title}}</h3>
        		</div>
        	</li>
        `,
        props:{ ico:String, title:String, color:String, isSpace:Boolean, link:String },
        components:{
			Img: () => import('@cpx/img'),
		},
    })
	// ================================================================ class
	export default {
		name: 'index',
		components:{
			Img: 		() => import('@cpx/img'),
			Content: 	() => import('@cpx/content'),
			User: 		() => import('@tp/user'),
            Charge: 		() => import('@tp/charge'),
		},
		data(){
			return {
				fn:$fn,
				ImgLogo,ImgN1,ImgN2,ImgN3,ImgN4,ImgN5,ImgN6,
				data:[],
				userData:$fn.getUser()
			}
		},
		mounted(){
		},
		methods:{
			save(v){
				console.log(v)
			},
            open(){
                this.$refs.c.open()
            }
		}
	}
</script>
