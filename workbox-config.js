module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{ico,html,png,json,txt}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/sw.js'
};