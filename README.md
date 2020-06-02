# pinejs-client-fetch
This module provides the programming interface for the [pinejs][pinejs] API using fetch.

## Usage

```js
import PineFetch from 'pinejs-client-fetch';

const pine = new PineClientFetch(
	{ apiPrefix: 'https://api.balena-cloud.com/v5/' },
	{ fetch: fetch },
);

const result = await pine.get({
	resource: 'application',
	options: {
		$top: 1,
		$select: 'app_name',
	},
})
```

You can also define extra [`init` options for the `fetch` calls][fetchInit]
in the `passthrough` property:


```js
await pine.get({
    resource: 'application',
    passthrough: {
        headers: {
            authorization: "Bearer " + myBearerToken,
        }
    }
});
```

[pinejs]: https://github.com/balena-io-modules/pinejs-client-js
[fetchInit]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
