<template>
	<Frame :menu='data'>
		<router-view/>
	</Frame>
</template>

<script>
	export default {
		name: 'laboratory',
		components:{
			Frame: 	() => import('@cpt/frame'),
		},
		data(){
			return {
				data:[
					{
						title:'检测中心',
						route:'/main/laboratory/testCenter',
						data:[
							{
								title: '基因室',
								children:[
									{ title:'HPV分型岗', route:'/laboratory/testCenter/hpv' },
									{ title:'HPV分型岗', route:'/laboratory/testCenter/hpv' },
								]
							},
							{
								title: '发光室',
								children:[
									{ title:'HPV分型岗', route:'/laboratory/testCenter/hpv' },
									{ title:'HPV分型岗', route:'/laboratory/testCenter/hpv' },
								]
							}
						]
					},
					{
						title:'实验室管理',
						route:'/main/laboratory/experimentCenter',
						data:[
							{
								title: '设备管理',
								children:[
									{ title:'设备列表', route:'/laboratory/testCenter/hpv' },
									{ title:'设备列表', route:'/laboratory/testCenter/hpv' },
								]
							},
							{
								title: '标签管理',
								children:[
									{ title:'设备列表', route:'/laboratory/testCenter/hpv' },
									{ title:'设备列表', route:'/laboratory/testCenter/hpv' },
								]
							}
						]
					}
				]
			}
		}
	}
</script>