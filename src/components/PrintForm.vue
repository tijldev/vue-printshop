<template>
	<div class="print-form">
		<h4>Bestel je print</h4>
		<q-stepper ref="stepper">
			<q-step default title="Upload">
				<step-upload></step-upload>
				<div class="row q-mt-md items-center">
					<div class="col-6"/>
					<div class="col-6">
						<div class="justify-end row">
							<q-btn color="primary" @click="$refs.stepper.next()" label="Volgende" :disable="!fileSelected" ></q-btn>
						</div>

					</div>
				</div>
			</q-step>

			<q-step title="Formaat" name="format">
				<step-format></step-format>
				<div class="row q-mt-md items-center">
					<div class="col-6">
						<price></price>
					</div>
					<div class="col-6">
						<div class="row justify-end">
							<q-btn class="q-mr-md q-mb-sm" color="primary" outline @click="$refs.stepper.previous()" label="Vorige" ></q-btn>
							<q-btn class="q-mb-sm" color="primary" @click="$refs.stepper.next()" label="Volgende" ></q-btn>
						</div>
					</div>
				</div>
			</q-step>

			<q-step title="Papiersoort">
				<step-paper></step-paper>
				<div class="row q-mt-md items-center">
					<div class="col-6">
						<price></price>
					</div>
					<div class="col-6 row justify-end">
						<q-btn class="q-mr-md" color="primary" outline @click="$refs.stepper.previous()" label="Vorige" ></q-btn>
						<q-btn color="primary" @click="$refs.stepper.next()" label="Volgende" ></q-btn>
					</div>
				</div>
			</q-step>

			<q-step title="Afwerking">
				<step-finish></step-finish>
				<div class="row q-mt-md items-center">
					<div class="col-6">
						<price></price>
					</div>
					<div class="col-6 row justify-end">
						<q-btn class="q-mr-md" color="primary" outline @click="$refs.stepper.previous()" label="Vorige" ></q-btn>
						<q-btn color="primary" @click="$refs.stepper.next()" label="Volgende" ></q-btn>
					</div>
				</div>
			</q-step>

			<q-step title="Overzicht" name="overview">
				<step-overview></step-overview>
				<div class="row q-mt-md items-center">
					<div class="col-6">
						<price></price>
					</div>
					<div class="col-6 row justify-end">
						<q-btn class="q-mr-md" color="primary" outline @click="$refs.stepper.previous()" label="Vorige" ></q-btn>
						<add-to-cart-button></add-to-cart-button>
					</div>
				</div>
			</q-step>

		</q-stepper>
	</div>
</template>

<script>
import StepUpload from './Steps/StepUpload.vue'
import StepFinish from './Steps/StepFinish.vue'
import StepFormat from './Steps/StepFormat.vue'
import StepOverview from './Steps/StepOverview.vue'
import StepPaper from './Steps/StepPaper.vue'
import Price from './Price.vue'
import AddToCartButton from './AddToCartButton.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'PrintForm',
	components: {
		StepUpload,
		StepFinish,
		StepFormat,
		StepOverview,
		StepPaper,
		Price,
		AddToCartButton
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters({ imageSource: 'image/imageSource' }),
		fileSelected() {
			return this.imageSource
		}
	},
	mounted() {
		this.$refs.stepper.goToStep('overview')
	}
}
</script>

<style>
.price {
	text-align: right;
	display: block;
	border-top: 1px solid black;
	width: 200px;
	float: right;
	padding-top: 10px;
}

.q-field {
	padding: 10px;
}

.format > * {
	display: inline-block;
}

.print-form {
	padding: 2rem;
}

.q-stepper-tab {
	padding: 1rem;
}
</style>
