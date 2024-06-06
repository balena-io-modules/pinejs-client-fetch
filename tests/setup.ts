import * as fetchPonyfillFactory from 'fetch-ponyfill';
import PineFetchNode from '../src/index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: PineFetchBrowser } = require('../build/index.umd');

const API_BASE_URL = 'https://api.balena-cloud.com/';
const API_VERSION = 'v5/';

const IS_BROWSER = typeof window !== 'undefined';

const PineFetch: typeof PineFetchNode = IS_BROWSER
	? PineFetchBrowser
	: PineFetchNode;

// While testing on a browser, rely on the library to use the native `fetch`.
const backendParams = IS_BROWSER
	? {}
	: { fetch: fetchPonyfillFactory({ Promise }).fetch };

export interface TestSuiteContext extends Mocha.Context {
	// So that TS lets us type the `this` of `it` calls.
	pineClient?: PineFetchNode;
}

export const givenAPineClient = function (beforeFn: Mocha.HookFunction) {
	beforeFn(function (this: TestSuiteContext) {
		this.pineClient = new PineFetch(
			{ apiPrefix: API_BASE_URL + API_VERSION },
			backendParams,
		);
	});
};
