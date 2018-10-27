import paperTypes from '../paperTypes'
// initial state
const state = {
	width: 300,
	height: 300,
	selectedPaperTypeIndex: 0,
	paperTypes: paperTypes
}

// getters
const getters = {
	paperType: state => {
		return state.paperTypes[state.selectedPaperTypeIndex]
	},
	surface: state => {
		return (state.width * state.height) / 1000000
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
	updateHeight(state, value) {
		state.height = value
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
