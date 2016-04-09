
interface GeoQuery {}

interface GeoFire extends GeoQuery {
	set(keyOrLocations: any, location: any);
}

interface GeoFireStatic {
	/**
	 * Constructs a new GeoFire reference from a full GeoFire URL.
	 */
	new (GeoFireURL: string): GeoFire;
}
declare var GeoFire: GeoFireStatic;

declare module 'geofire' {
	export = GeoFire;
}
