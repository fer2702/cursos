module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{json,html,png}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};