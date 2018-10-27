<template>
	<div class="step-overview row">
		<image-preview class="col-12 col-md-4" :src="croppedImageSource"></image-preview>
		<div class="form col-12 col-md-8 q-px-md">
			<overview-list></overview-list>
			<q-input
				v-model="orderNotes"
				type="textarea"
				stack-label="Opmerkingen"
				rows="5">
			</q-input>
		</div>
	</div>
</template>

<script>
import ImagePreview from '../ImagePreview.vue'
import OverviewList from '../OverviewList.vue'
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'StepOverview',
	components: {
		ImagePreview,
		OverviewList
	},
	computed: {
		...mapState({
			croppedImage: state => state.image.croppedImage
		}),
		...mapGetters({
			croppedImageSource: 'image/croppedImageSource'
		}),
		orderNotes: {
			get() {
				return this.$store.state.orderNotes
			},
			set(value) {
				this.$store.commit('updateOrderNotes', value)
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="sass" scoped>

</style>
