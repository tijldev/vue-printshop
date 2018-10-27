// initial state
const state = {
	imageFile: null,
	croppedImage: null,
	cropData: {
		x: 0,
		y: 0,
		scaleX: 1,
		scaleY: 1,
		rotate: 0,
		width: 300,
		height: 300
	}
}

// getters
const getters = {
	imageSource: state => {
		if (state.imageFile !== null) {
			return URL.createObjectURL(state.imageFile)
		}
	},
	croppedImageSource: state => {
		if (state.croppedImage !== null) {
			return URL.createObjectURL(state.croppedImage)
		}
	},
	imageName: state => {
		if (state.imageFile !== null) {
			return state.imageFile.name
		}
	},
	aspectRatio: (state, getters, rootState) => {
		return rootState.paper.width / rootState.paper.height
	},
	imageResolution: (state, getters, rootState) => {
		return (
			Math.round(
				(100 * state.cropData.width) /
					(rootState.paper.width * 0.0393700787)
			) / 100
		)
	}
}
// mutations
const mutations = {
	updateImageFile(state, value) {
		state.imageFile = value
	},
	updateCropData(state, value) {
		state.cropData = value
	},
	updateCroppedImage(state, value) {
		state.croppedImage = value
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
