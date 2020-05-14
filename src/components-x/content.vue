<template>  
	<section class='wh' :class='{oys:scrollY,oxs:scrollX, oxys:scrollXY}'>
		<div :style='{minWidth:mw}' :class='contentClass'>
			<slot></slot>
		</div>
	</section>
</template>

<script>
	export default {
		props:{
			scrollY :		{ type:Boolean, default:false },
			scrollX :		{ type:Boolean, default:false },
			scrollXY :		{ type:Boolean, default:false },
			mw: 			{ type:String, 	default:'1000px' },
			contentClass: 	{ type:String },
		}
	}
</script>