module.exports = {
	pluginOptions: {
		quasar: {
			theme: 'ios',
			plugins: ['vuelidate']
		}
	},
	transpileDependencies: [/[\\\/]node_modules[\\\/]quasar-framework[\\\/]/],
	configureWebpack: {
		// No need for splitting
		optimization: {
			splitChunks: false
		}
	}
}
