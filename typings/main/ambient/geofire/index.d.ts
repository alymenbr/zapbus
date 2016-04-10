
interface Firebase {}

interface GeoQuery {}

interface GeoFire extends GeoQuery {
	set(keyOrLocations: any, location: any);
	get(key: any): any;
}

interface GeoFireStatic {
	/**
	 * Constructs a new GeoFire reference from a full GeoFire URL.
	 */
	new (GeoFireURL: Firebase): GeoFire;
}
declare var GeoFire: GeoFireStatic;

declare module 'geofire' {
	export = GeoFire;
}
