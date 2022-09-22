const getKarmaConfig = require('balena-config-karma');
const packageJSON = require('./package.json');

module.exports = (config) => {
	const karmaConfig = getKarmaConfig(packageJSON);
	karmaConfig.logLevel = config.LOG_INFO;
	karmaConfig.webpack.experiments = {
		asyncWebAssembly: true,
	};

	config.set(karmaConfig);
};
