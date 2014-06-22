import types from 'config/types';

export default function Viewmodel$splice ( keypath, spliceSummary ) {
	var viewmodel = this, i, dependants;

	// Mark changed keypaths
	for ( i = spliceSummary.rangeStart; i < spliceSummary.rangeEnd; i += 1 ) {
		viewmodel.mark( keypath + '.' + i );
	}

	if ( spliceSummary.balance ) {
		viewmodel.mark( keypath + '.length' );
	}

	// Trigger splice operations
	if ( dependants = viewmodel.deps[ 'default' ][ keypath ] ) {
		dependants.filter( canSplice ).forEach( dependant => dependant.splice( spliceSummary ) );
	}
}

function canSplice ( dependant ) {
	return dependant.type === types.SECTION && !dependant.inverted && dependant.rendered;
}