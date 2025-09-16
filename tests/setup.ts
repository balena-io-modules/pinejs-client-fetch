import * as fetchPonyfillFactory from 'fetch-ponyfill';
import PineFetch from '../src/index';

const API_BASE_URL = 'https://api.balena-cloud.com/';
const API_VERSION = 'v5/';

const IS_BROWSER = typeof window !== 'undefined';

// While testing on a browser, rely on the library to use the native `fetch`.
const backendParams = IS_BROWSER
	? {}
	: { fetch: fetchPonyfillFactory({ Promise }).fetch };

export interface TestSuiteContext extends Mocha.Context {
	// So that TS lets us type the `this` of `it` calls.
	pineClient?: PineFetch;
}

export const givenAPineClient = function (beforeFn: Mocha.HookFunction) {
	beforeFn(function (this: TestSuiteContext) {
		this.pineClient = new PineFetch(
			{ apiPrefix: API_BASE_URL + API_VERSION },
			backendParams,
		);
	});
};
