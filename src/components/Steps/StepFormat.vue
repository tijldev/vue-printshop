<template>
	<div class="step-format">
		<div class="row">
			<div class="col-12 col-md-4">
				<vue-cropper :view-mode="1" :data="cropData" class="cropper" ref="cropper" :src="imageSource"></vue-cropper>
			</div>
			<div class="col-12 col-md-8 q-px-md">
				<overview-list></overview-list>
				<div class="row items-center justify-center">
					<q-field class="col" :error="$v.paperWidth.$invalid" error-label="Dit is te breed">
						<q-input v-model="paperWidth" type="number" :decimals="0" suffix="mm" float-label="Breedte" ></q-input>
					</q-field>
					<div>x</div>
					<q-field class="col" :error="$v.paperHeight.$invalid" error-label="Dit is te hoog">
						<q-input v-model="paperHeight" type="number" :decimals="0" suffix="mm" float-label="Hoogte" ></q-input>
					</q-field>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import OverviewList from '../OverviewList.vue'
import { mapGetters } from 'vuex'
import { required, minLength, between } from 'vuelidate/lib/validators'
export default {
	name: 'StepFormat',
	components: {
		VueCropper,
		OverviewList
	},
	computed: {
		...mapGetters({
			imageSource: 'image/imageSource',
			imageName: 'image/imageName'
		}),
		aspectRatio() {
			return this.paperWidth / this.paperHeight
		},
		paperWidth: {
			get() {
				return this.$store.state.paper.width
			},
			set(value) {
				this.$store.commit('paper/updateWidth', value)
			}
		},
		paperHeight: {
			get() {
				return this.$store.state.paper.height
			},
			set(value) {
				this.$store.commit('paper/updateHeight', value)
			}
		},
		cropData: {
			get() {
				return this.$store.state.image.cropData
			}
		},
		croppedImage: {
			get() {
				return this.$store.state.image.croppedImage
			},
			set(value) {
				this.$store.commit('image/updateCroppedImage', value)
			}
		}
	},
	watch: {
		aspectRatio() {
			this.$refs.cropper.setAspectRatio(this.aspectRatio)
			this.updateCroppedImage()
		}
	},
	methods: {
		onCropEnd() {
			const data = this.$refs.cropper.getData(true)
			this.$store.commit('image/updateCropData', data)
			this.updateCroppedImage()
		},
		updateCroppedImage() {
			const data = this.$refs.cropper.getImageData()
			// get image data for post processing, e.g. upload or setting image src
			this.$refs.cropper
				.getCroppedCanvas({
					width: data.width,
					height: data.height,
					minWidth: 256,
					minHeight: 256,
					maxWidth: 4096,
					maxHeight: 4096,
					fillColor: '#fff',
					imageSmoothingEnabled: false,
					imageSmoothingQuality: 'high'
				})
				.toBlob(blob => {
					this.croppedImage = new File(
						[blob],
						`cropped-${this.imageName}`
					)
				})
		}
	},
	mounted() {
		const cropper = this.$refs.cropper
		const image = cropper.$refs.img

		image.addEventListener('ready', () => {
			const data = this.$refs.cropper.getImageData()
			const width = data.width
			const height = data.height
			this.$refs.cropper.setCropBoxData({
				left: 0,
				top: 0,
				width,
				height
			})
			cropper.setAspectRatio(this.aspectRatio)
			this.onCropEnd()
		})
		image.addEventListener('cropend', () => {
			this.onCropEnd()
		})
	},
	validations: {
		paperWidth: {
			between: between(50, 1100)
		},
		paperHeight: {
			between: between(100, 1350)
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
