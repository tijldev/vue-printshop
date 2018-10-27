<template>
	<div class="step-paper">
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
							v-for="(item, index) in paperOptions" 
							:key="index" 
							separator 
							:disabled="item.disabled" >
							<q-item-side>
								<q-radio 
									v-model="selectedPaperIndex" 
									:val="index" 
									:disable="item.disabled" ></q-radio>
							</q-item-side>
							<q-item-main>
								<q-item-tile label>{{ item.name }}</q-item-tile>
								<q-item-tile sublabel>€{{item.price}} | Max breedte: {{ item.maxWidth }}mm</q-item-tile>
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
import { mapState, mapGetters } from 'vuex'
import OverviewList from '../OverviewList.vue'
export default {
	name: 'StepPaper',
	components: {
		ImagePreview,
		OverviewList
	},
	computed: {
		...mapState({
			paperWidth: state => state.paper.width,
			paperTypes: state => state.paper.paperTypes
		}),
		...mapGetters({
			paperSurface: 'paper/surface',
			imageSource: 'image/imageSource'
		}),
		selectedPaperIndex: {
			get() {
				return this.$store.state.paper.selectedPaperTypeIndex
			},
			set(value) {
				this.$store.commit('paper/updateSelectedPaperTypeIndex', value)
			}
		},
		paperOptions() {
			return this.paperTypes.map(element => {
				return {
					...element,
					disabled: this.paperWidth > element.maxWidth,
					price:
						Math.round(
							this.paperSurface *
								element.pricePerSquareMeter *
								100,
							2
						) / 100
				}
			})
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
</style>
