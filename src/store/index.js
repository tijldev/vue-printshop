import Vuex from 'vuex'
import Vue from 'vue'

import image from './modules/image'
import paper from './modules/paper'
import montage from './modules/montage'
import api from './api'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
	state: {
		orderNotes: ''
	},
	getters: {
		pricePerPrint: (state, getters) => {
			const paperPrice = getters['paper/itemPrice']
			const montagePrice = getters['montage/itemPrice']
			const price = paperPrice + montagePrice
			return price
		},
		totalPrice: (state, getters) => {
			const price = getters['pricePerPrint']
			const priceRounded = Math.round(100 * price, 2) / 100
			return priceRounded
		}
	},
	mutations: {
		updateOrderNotes(state, value) {
			state.orderNotes = value
		}
	},
	actions: {
		submitPrint({ state, getters }) {
			const productDescription = {
				bestand: getters['image/imageName'],
				hoogte: getters['paper/height'] + 'mm',
				breedte: state.paper.width + 'mm',
				papiersoort: getters['paper/paperType'].name,
				montage: getters['montage/montageType'].name,
				opmerkingen: state.orderNotes
			}
			const price = getters['totalPrice']
			const name = `Fotoprint (${getters['image/imageName']})`
			const imageFile = state.image.imageFile

			return new Promise((resolve, reject) => {
				api.createProduct(
					name,
					price,
					JSON.stringify(productDescription, null, '\t'),
					imageFile
				)
					.then(response => {
						const productId = response.data.id
						api.addProductToCart(productId)
							.then(response => {
								resolve(response)
							})
							.catch(error => {
								reject(error)
							})
					})
					.catch(error => {
						reject(error)
					})
			})
		}
	},
	modules: {
		image,
		paper,
		montage
	}
})
