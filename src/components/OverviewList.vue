<template>
	<ul class="overview-list">
		<li><strong>Bestand: </strong><span>{{ imageName }}</span></li>
		<li><strong>Afmetingen: </strong>{{ paperWidth }}mm x {{ paperHeight }}mm</li>
		<li><strong>Resolutie: </strong>{{ imageResolution}} PPI</li>
		<li><strong>Papiersoort: </strong>{{ paperType.name }}</li>
		<li><strong>Montage: </strong>{{ montageType.name }}</li>
	</ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'OverviewList',
	computed: {
		...mapState(['croppedImage', 'paperDimensions', 'montageTypes']),
		...mapState({
			paperWidth: state => state.paper.width,
			paperHeight: state => state.paper.height
		}),
		...mapGetters({
			imageName: 'image/imageName',
			imageResolution: 'image/imageResolution',
			paperType: 'paper/paperType',
			montageType: 'montage/montageType'
		})
	}
}
</script>

<style scoped lang="scss">
.overview-list {
	list-style: none;
	padding: 0;
	word-break: break-all;
}
</style>
