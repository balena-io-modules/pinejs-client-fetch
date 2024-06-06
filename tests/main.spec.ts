import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import type { TestSuiteContext } from './setup';
import { givenAPineClient } from './setup';
import type { AnyObject } from './common';

describe('pinejs-client-fetch', function () {
	this.timeout(10 * 1000);

	givenAPineClient(before);

	it('should be able to fetch a public resource', async function (this: TestSuiteContext) {
		const devices = (await this.pineClient!.get({
			resource: 'public_device',
			options: {
				$top: 1,
			},
		})) as AnyObject[];
		expect(devices).to.be.an('array').that.has.lengthOf(1);
		const [device] = devices;
		expect(device).to.be.an('object');
		expect(device).to.have.property('latitude');
		expect(device).to.have.property('longitude');
	});

	it('should error on a non-public resource', async function (this: TestSuiteContext) {
		const promise = this.pineClient!.get({
			resource: 'device',
			options: {
				$top: 1,
			},
		});

		const err = await expect(promise).to.be.rejected;
		expect(err).to.have.property('code', 'PineClientFetchRequestError');
		expect(err).to.have.property('status', 401);
		expect(err).to.have.property('message').that.contains('Unauthorized');
	});
});
