import axios from 'axios'

const wpapi = axios.create({
	baseURL: 'http://demakersnieuw.local/wp-json'
})

export default {
	createProduct(name, price, description, file) {
		return new Promise((resolve, reject) => {
			const options = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			const formData = new FormData()
			formData.append('name', name)
			formData.append('price', price)
			formData.append('description', description)
			formData.append('image', file)

			wpapi
				.post('printshop/add', formData, options)
				.then(response => {
					console.log(response)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	addProductToCart(productId) {
		return new Promise((resolve, reject) => {
			const cart = {
				product_id: productId
			}
			wpapi
				.post('wc/v2/cart/add', cart)
				.then(response => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
}
