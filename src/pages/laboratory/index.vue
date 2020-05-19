<template>
	<Content isPage :scrollY='false' contentClass='wh'>
		<div class='wh p10' :style="{height}">
            <GcArViewer
                viewMode    = 'continuous'
                language    = "zh"
                :report     = "{ Uri: 'static/test.rdlx-json' }"
            />
        </div>
	</Content>
</template>

<script>
    // ================================================================ 报表
    import { Viewer } from '@grapecity/activereports-vue'
    import '@grapecity/activereports-localization'
    import '@grapecity/activereports/styles/ar-js-viewer.css'
	export default {
        components:{
            GcArViewer  : Viewer,
            Content		: () => import('@cpx/content'),
        },
        data(){
            return {
                reportZoom: 50,
                sidebar: false,
                toolbar: true,
                height: (window.innerHeight - 65) + 'px'
            }
        },
        mounted(){

        }
	}
</script>
