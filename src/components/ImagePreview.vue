<template>
	<div class="image-preview">
		<div class="content">
			<img :src="src">
		</div>

	</div>
</template>

<script>
export default {
	name: 'ImagePreview',
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
.image-preview {
	.content {
		max-width: 100%;
		height: 256px;
		background-color: lightgrey;
		background-image: url(../assets/background.jpg);
		background-size: cover;
		background-position: center center;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}
	img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12),
			0 2px 4px 0 rgba(0, 0, 0, 0.08);
	}
}
</style>
