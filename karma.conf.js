import getKarmaConfig from 'balena-config-karma';
import packageJSON from './package.json' with { type: 'json' };

export default (config) => {
	const karmaConfig = getKarmaConfig(packageJSON);
	karmaConfig.logLevel = config.LOG_INFO;
	karmaConfig.webpack.experiments = {
		asyncWebAssembly: true,
	};

	config.set(karmaConfig);
};
