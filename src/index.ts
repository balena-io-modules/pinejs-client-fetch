import type { Params, AnyObject } from 'pinejs-client-core';
import { PinejsClientCore } from 'pinejs-client-core';
export type { PinejsClientCore } from 'pinejs-client-core';

interface BackendParams {
	/** The browser fetch API implementation or a compatible one */
	fetch?: typeof fetch;
}

export class RequestError extends Error {
	public code = 'PineClientFetchRequestError';

	constructor(
		public body: string,
		public status: number,
		public responseHeaders: object,
	) {
		super(`Request error: ${body}`);
	}
}

export default class PineFetch extends PinejsClientCore<PineFetch> {
	constructor(
		params: Params,
		public backendParams: BackendParams,
	) {
		super(params);
		if (
			typeof backendParams?.fetch !== 'function' &&
			typeof fetch !== 'function'
		) {
			throw new Error(
				'No fetch implementation provided and native one not available',
			);
		}
	}

	async _request({
		url,
		body,
		...options
	}: {
		url: string;
		body?: AnyObject;
	} & AnyObject) {
		const normalizedBody =
			body == null
				? null
				: typeof body === 'object'
					? JSON.stringify(body)
					: body;

		// Assign to a variable first, otherwise browser fetch errors in case the context is different.
		const fetchImplementation = this.backendParams?.fetch ?? fetch;

		const response = await fetchImplementation(url, {
			...options,
			body: normalizedBody,
		});

		if (response.status >= 400) {
			let responseBody = 'Unknown error';
			try {
				responseBody = await response.text();
			} catch {
				// empty
			}
			throw new RequestError(responseBody, response.status, response.headers);
		}
		return response.json();
	}
}
