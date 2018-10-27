<template>
	<div class="step-finish">
		<div class="row">
			<image-preview 
				class="col-12 col-md-4" 
				:src="imageSource"></image-preview>
			<div class="form col-12 col-md-8 q-px-md">
				<overview-list></overview-list>
				<q-scroll-area 
					class="paper-list" 
					style="height: 200px;">
					<q-list link>
						<q-item 
							tag="label" 
							v-for="(item, index) in montageOptions" 
							:key="index" 
							separator >
							<q-item-side>
								<q-radio 
									v-model="selectedMontageIndex" 
									:val="index"  ></q-radio>
							</q-item-side>
							<q-item-main>
								<q-item-tile label>{{ item.name }}</q-item-tile>
								<q-item-tile sublabel>€ {{ item.price }}</q-item-tile>
							</q-item-main>
						</q-item>
					</q-list>
				</q-scroll-area>
			</div>
		</div>
	</div>
</template>

<script>
import ImagePreview from '../ImagePreview.vue'
import OverviewList from '../OverviewList.vue'
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'StepFinish',
	components: {
		ImagePreview,
		OverviewList
	},
	computed: {
		...mapState({
			paperWidth: state => state.paper.width,
			montageTypes: state => state.montage.montageTypes
		}),
		...mapGetters({
			paperSurface: 'paper/surface',
			imageSource: 'image/imageSource'
		}),
		selectedMontageIndex: {
			get() {
				return this.$store.state.montage.selectedMontageTypeIndex
			},
			set(value) {
				this.$store.commit(
					'montage/updateSelectedMontageTypeIndex',
					value
				)
			}
		},
		montageOptions() {
			return this.montageTypes.map(element => {
				return {
					...element,
					price: this.calculatePrice(element)
				}
			})
		}
	},
	methods: {
		calculatePrice(montage) {
			const surface = this.paperSurface
			let montagePrice = 0

			if (surface < 0.25) montagePrice = montage.priceSmall
			else if (surface < 1) montagePrice = montage.priceMedium
			else montagePrice = montage.priceLarge

			const price = montagePrice * surface
			const priceRounded = Math.round(100 * price, 2) / 100
			return priceRounded
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
</style>
