<template>
	<vue-cropper class="cropper" ref="cropper" :src="imageSource"></vue-cropper>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import { mapGetters } from 'vuex'
export default {
	name: 'StepFormat',
	components: {
		VueCropper
	},
	computed: {
		...mapGetters(['imageSource', 'imageName']),
		aspectRatio() {
			return this.width / this.height
		},
		width: {
			get() {
				return this.$store.state.dimensions.width
			},
			set(value) {
				this.$store.commit('updateWidth', value)
			}
		}
	},
	watch: {
		aspectRatio() {
			this.$refs.cropper.setAspectRatio(this.aspectRatio)
		}
	},
	data() {
		return {
			formatType: '',
			size: '',
			width: '',
			height: ''
		}
	},
	validations: {
		width: {
			between: between(0, 1600)
		},
		height: {
			between: between(0, 8000)
		}
	}
}
</script>

<style lang="scss" scoped>
.cropper {
	height: 16rem;
	max-width: 100%;
}
</style>
