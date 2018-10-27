// initial state
const state = {
	imageFile: null,
	width: 0,
	height: 0
}

// getters
const getters = {
	imageSource: state => {
		if (state.imageFile !== null) {
			return URL.createObjectURL(state.imageFile)
		}
	},
	imageName: state => {
		if (state.imageFile !== null) {
			return state.imageFile.name
		}
	},
	aspectRatio: state => {
		return state.width / state.height
	},
	imageResolution: (state, getters, rootState) => {
		return (
			Math.round(
				(100 * state.width) / (rootState.paper.width * 0.0393700787)
			) / 100
		)
	}
}
// mutations
const mutations = {
	updateImageFile(state, value) {
		state.imageFile = value
	},
	updateHeight(state, value) {
		state.height = value
	},
	updateWidth(state, value) {
		state.width = value
	}
}

// actions
const actions = {
	loadImage({ commit }, fileObject) {
		commit('updateImageFile', fileObject)
		const image = new Image()
		image.src = URL.createObjectURL(fileObject)
		image.addEventListener('load', () => {
			commit('updateHeight', image.height)
			commit('updateWidth', image.width)
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
