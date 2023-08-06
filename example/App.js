// App component

export const App = {
	render() {
		// UI
		return h("div", "hi, " + this.msg)
	},

	setup() {
		// composition api
		return {
			msg: 'mini-vue',
		}
	}
}