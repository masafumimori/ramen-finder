module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,html,png,json,txt}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};