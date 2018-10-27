<template>
	<div class="add-to-cart-button">
		<q-btn color="positive" @click="addToCart" label="In winkelmand" icon="shopping_cart" ></q-btn>
		<q-dialog
			v-model="isSuccess"
			stack-buttons
			prevent-close
		>
			<span slot="title">Jepla!</span>

			<span slot="message">Uw print werd toegevoegd aan de winkelmand.</span>

			<template slot="buttons" slot-scope="props">
				<q-btn color="positive" label="Winkelmand" @click="goToShoppingCart" ></q-btn>
				<q-btn color="primary" label="Voeg nog een print toe" @click="goToNewPrint" ></q-btn>
			</template>
		</q-dialog>
	</div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'AddToCartButton',
	components: {},
	data() {
		return {
			isSuccess: false
		}
	},
	methods: {
		goToNewPrint() {
			window.location.href = window.location.hostname + '/fine-art-print'
			this.isSuccess = false
		},
		goToShoppingCart() {
			window.location.href = window.location.hostname + '/winkelmand'
			this.isSuccess = false
		},
		...mapActions(['submitPrint']),
		addToCart() {
			this.$q.loading.show({})
			this.submitPrint()
				.then(() => {
					this.$q.loading.hide()
					this.isSuccess = true
				})
				.catch(error => {
					console.error(error)
					this.showDialogFail()
				})
		},
		showDialogFail() {
			this.$q.loading.hide()
			this.$q.dialog({
				title: 'Hola pola!',
				message:
					'Er liep iets mis. Check je verbinding en probeer het opnieuw.',

				// optional
				color: 'primary',

				// optional; we want an "OK" button
				ok: true, // takes i18n value, or String for "OK" button label
				preventClose: true
			})
		}
	}
}
</script>

<style scoped lang="scss">
.add-to-cart-button {
}
</style>
