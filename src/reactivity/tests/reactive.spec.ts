import { reactive } from "../reactive"

describe('reactive', () => {
	it('happy path', () => {
		const original = { foo: 1 }
		const observed = reactive(original)
		// not equal
		expect(observed).not.toBe(original)
		expect(observed.foo).toBe(1)
	})
})