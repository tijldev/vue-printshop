<template>
	<div class="paper-chooser">
		<div class="content">
			<img :src="src">
		</div>
	</div>
</template>

<script>
export default {
	name: 'PaperChooser',
	data() {
		return {}
	},
	props: {
		src: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.paper-chooser {
	background: lightgrey;
}
.content {
	height: 16rem;
	max-width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 100%;
		max-height: 100%;
		display: block;
		object-fit: contain;
	}
}
</style>
