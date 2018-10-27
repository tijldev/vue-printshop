import montageTypes from '../montageTypes'

// initial state
const state = {
	selectedMontageTypeIndex: 0,
	montageTypes: montageTypes
}

// getters
const getters = {
	itemPrice: (state, getters, rootState, rootGetters) => {
		const surface = rootGetters['paper/surface']

		let montagePrice = 0
		const montage = getters.montageType
		if (surface < 0.25) montagePrice = montage.priceSmall
		else if (surface < 1) montagePrice = montage.priceMedium
		else montagePrice = montage.priceLarge
		const price = montagePrice * surface
		const priceRounded = Math.round(100 * price, 2) / 100
		return priceRounded
	},

	montageType: state => {
		return state.montageTypes[state.selectedMontageTypeIndex]
	}
}

// mutations
const mutations = {
	updateSelectedMontageTypeIndex(state, value) {
		state.selectedMontageTypeIndex = value
	}
}

// actions
const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
