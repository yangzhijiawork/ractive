define([
	'parse/Parser/expressions/primary/literal/objectLiteral/keyValuePair'
], function (
	getKeyValuePair
) {

	'use strict';

	return function getKeyValuePairs ( parser ) {
		var start, pairs, pair, keyValuePairs;

		start = parser.pos;

		pair = getKeyValuePair( parser );
		if ( pair === null ) {
			return null;
		}

		pairs = [ pair ];

		if ( parser.matchString( ',' ) ) {
			keyValuePairs = getKeyValuePairs( parser );

			if ( !keyValuePairs ) {
				parser.pos = start;
				return null;
			}

			return pairs.concat( keyValuePairs );
		}

		return pairs;
	};

});
