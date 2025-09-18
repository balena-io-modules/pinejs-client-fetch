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

		if (response.status >= 400) {
			let responseBody = 'Unknown error';
			try {
				responseBody = await response.text();
			} catch {
				// empty
			}
			throw new RequestError(responseBody, response.status, response.headers);
		}
		return await response.json();
	}
}
