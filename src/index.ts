import type { AnyObject, Resource, AnyResource } from 'pinejs-client-core';
import { PinejsClientCore } from 'pinejs-client-core';
export type { PinejsClientCore } from 'pinejs-client-core';

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

export default class PineFetch<
	Model extends {
		[key in keyof Model]: Resource;
	} = {
		[key in string]: AnyResource;
	},
> extends PinejsClientCore<Model> {
	async _request({
		url,
		body,
		...options
	}: {
		url: string;
		body?: AnyObject;
	} & AnyObject) {
		let normalizedBody: string | undefined;
		if (body != null && typeof body === 'object') {
			// If body is an object then JSON.stringify it and set the matching content-type header
			options.headers ??= {};
			options.headers['Content-Type'] = 'application/json';
			normalizedBody = JSON.stringify(body);
		} else {
			normalizedBody = body;
		}

		const response = await fetch(url, {
			...options,
			body: normalizedBody,
		});

		let responseBody;
		try {
			// Fetch the response as text
			responseBody = await response.text();
			// And then try to parse it as JSON as it is likely to be JSON
			responseBody = JSON.parse(responseBody);
			// TODO: base this upon the returned content-type header
		} catch {
			// empty
		}

		if (response.status >= 400) {
			throw new RequestError(
				responseBody ?? 'Unknown error',
				response.status,
				response.headers,
			);
		}
		return responseBody;
	}
}
