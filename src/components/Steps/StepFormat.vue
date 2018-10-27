<template>
	<div class="step-format">
		<div class="row">
			<div class="col-12 col-md-4">
				<image-preview :src="imageSource"></image-preview>
			</div>
			<div class="col-12 col-md-8 q-px-md">
				<overview-list></overview-list>
				<div class="row items-center justify-center">
					<q-field
						class="col"
						:error="$v.paperWidth.$invalid"
						error-label="Geef een breedte tussen 50mm en 1100mm">
						<q-input
							v-model="paperWidth"
							type="number"
							:decimals="0"
							suffix="mm"
							float-label="Breedte" ></q-input>
					</q-field>
					<div>x</div>
					<q-field
						class="col"
						:error="$v.paperHeight.$invalid"
						error-label="Geef een hoogte tussen 100mm en 1350mm">
						<q-input
							v-model="paperHeight"
							:disabled="true"
							:readonly="true"
							type="number"
							:decimals="0"
							suffix="mm"
							float-label="Hoogte" ></q-input>
					</q-field>
				</div>
			</div>
		</div>
		<div class="row q-mt-md items-center">
			<div class="col-6">
				<price></price>
			</div>
			<div class="col-6">
				<div class="row justify-end">
					<q-btn
						class="q-mr-md q-mb-sm"
						color="primary"
						outline
						@click="$emit('previous')"
						label="Vorige" ></q-btn>
					<q-btn
						class="q-mb-sm"
						color="primary"
						@click="$emit('next')"
						label="Volgende"
						:disable="isInValid" ></q-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OverviewList from '../OverviewList.vue'
import ImagePreview from '../ImagePreview.vue'
import { mapGetters } from 'vuex'
import Price from '../Price.vue'
import { required, between } from 'vuelidate/lib/validators'
export default {
	name: 'StepFormat',
	components: {
		ImagePreview,
		OverviewList,
		Price
	},
	props: {
		stepper: {
			type: Object,
			default: null
		}
	},
	computed: {
		...mapGetters({
			imageSource: 'image/imageSource',
			imageName: 'image/imageName',
			paperHeight: 'paper/height'
		}),
		paperWidth: {
			get() {
				return this.$store.state.paper.width
			},
			set(value) {
				this.$store.commit('paper/updateWidth', value)
			}
		},
		isInValid() {
			return this.$v.$invalid
		}
	},
	methods: {},
	validations: {
		paperWidth: {
			required: true,
			between: between(50, 1100)
		},
		paperHeight: {
			required: true,
			between: between(100, 1350)
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
