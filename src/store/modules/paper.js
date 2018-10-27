import paperTypes from '../paperTypes'
// initial state
const state = {
	width: 300,
	selectedPaperTypeIndex: 0,
	paperTypes: paperTypes
}

// getters
const getters = {
	height: (state, getters, rootState, rootGetters) => {
		const aspectRatio = rootGetters['image/aspectRatio']
		const height = state.width / aspectRatio
		const heightRounded = Math.ceil(height)
		return heightRounded
	},
	paperType: state => {
		return state.paperTypes[state.selectedPaperTypeIndex]
	},
	surface: (state, getters) => {
		return (state.width * getters['height']) / 1000000
	},
	itemPrice: (state, getters) => {
		return getters.paperType.pricePerSquareMeter * getters.surface
	}
}

// mutations
const mutations = {
	updateWidth(state, value) {
		state.width = value
	},
	updateSelectedPaperTypeIndex(state, value) {
		state.selectedPaperTypeIndex = value
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
