import PineFetch from '../build/index.js';

const API_BASE_URL = 'https://api.balena-cloud.com/';
const API_VERSION = 'v5/';

export interface TestSuiteContext extends Mocha.Context {
	// So that TS lets us type the `this` of `it` calls.
	pineClient?: PineFetch;
}

export const givenAPineClient = function (beforeFn: Mocha.HookFunction) {
	beforeFn(function (this: TestSuiteContext) {
		this.pineClient = new PineFetch({ apiPrefix: API_BASE_URL + API_VERSION });
	});
};
