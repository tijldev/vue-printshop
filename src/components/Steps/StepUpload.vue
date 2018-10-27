<template>
	<div class="step-upload">
		<div class="row">
			<image-preview
				class="col-12 col-md-4"
				:src="imageSource"></image-preview>
			<div class="form col-12 col-md-8">
				<q-field
					label="Kies je bestand"
					:count="1">
					<q-uploader
						url="specify-url-here"
						@remove:cancel="removePreview"
						@add="updatePreview"
						hide-upload-button
						hide-upload-progress
						no-thumbnails
						auto-expand
						extensions=".tif,.jpg,.jpeg" ></q-uploader>
				</q-field>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import ImagePreview from '../ImagePreview.vue'
export default {
	name: 'StepUpload',
	components: {
		ImagePreview
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters({ imageSource: 'image/imageSource' })
	},
	methods: {
		...mapActions({ updateImageFile: 'image/loadImage' }),
		updatePreview(files) {
			this.updateImageFile(files[0])
		},
		removePreview() {
			this.updateImageFile(null)
		}
	}
}
</script>

<style lang="sass" scoped>

</style>
