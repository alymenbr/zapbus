
interface GeofireDataSnapshot {
	/**
	 * Returns true if this DataSnapshot contains any data.
	 * It is slightly more efficient than using snapshot.val() !== null.
	 */
	exists(): boolean;
	/**
	 * Gets the JavaScript object representation of the DataSnapshot.
	 */
	val(): any;
	/**
	 * Gets a DataSnapshot for the location at the specified relative path.
	 */
	child(childPath: string): GeofireDataSnapshot;
	/**
	 * Enumerates through the DataSnapshot’s children (in the default order).
	 */
	forEach(childAction: (childSnapshot: GeofireDataSnapshot) => void): boolean;
	forEach(childAction: (childSnapshot: GeofireDataSnapshot) => boolean): boolean;
	/**
	 * Returns true if the specified child exists.
	 */
	hasChild(childPath: string): boolean;
	/**
	 * Returns true if the DataSnapshot has any children.
	 */
	hasChildren(): boolean;
	/**
	 * Gets the key name of the location that generated this DataSnapshot.
	 */
	key(): string;
	/**
	 * @deprecated Use key() instead.
	 * Gets the key name of the location that generated this DataSnapshot.
	 */
	name(): string;
	/**
	 * Gets the number of children for this DataSnapshot.
	 */
	numChildren(): number;
	/**
	 * Gets the Geofire reference for the location that generated this DataSnapshot.
	 */
	ref(): Geofire;
	/**
	 * Gets the priority of the data in this DataSnapshot.
	 * @returns {string, number, null} The priority, or null if no priority was set.
	 */
	getPriority(): any; // string or number
	/**
	 * Exports the entire contents of the DataSnapshot as a JavaScript object.
	 */
	exportVal(): Object;
}

interface GeofireOnDisconnect {
	/**
	 * Ensures the data at this location is set to the specified value when the client is disconnected
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	set(value: any, onComplete: (error: any) => void): void;
	set(value: any): Promise<void>;
	/**
	 * Ensures the data at this location is set to the specified value and priority when the client is disconnected
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	setWithPriority(value: any, priority: string|number, onComplete: (error: any) => void): void;
	setWithPriority(value: any, priority: string|number): Promise<void>;
	/**
	 * Writes the enumerated children at this Geofire location when the client is disconnected
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	update(value: Object, onComplete: (error: any) => void): void;
	update(value: Object): Promise<void>;
	/**
	 * Ensures the data at this location is deleted when the client is disconnected
	 * (due to closing the browser, navigating to a new page, or network issues).
	 */
	remove(onComplete: (error: any) => void): void;
	remove(): Promise<void>;
	/**
	 * Cancels all previously queued onDisconnect() set or update events for this location and all children.
	 */
	cancel(onComplete: (error: any) => void): void;
	cancel(): Promise<void>;
}

interface GeofireQuery {
	/**
	 * Listens for data changes at a particular location.
	 */
	on(eventType: string, callback: (dataSnapshot: GeofireDataSnapshot, prevChildName?: string) => void, cancelCallback?: (error: any) => void, context?: Object): (dataSnapshot: GeofireDataSnapshot, prevChildName?: string) => void;
	/**
	 * Detaches a callback previously attached with on().
	 */
	off(eventType?: string, callback?: (dataSnapshot: GeofireDataSnapshot, prevChildName?: string) => void, context?: Object): void;
	/**
	 * Listens for exactly one event of the specified event type, and then stops listening.
	 */
	once(eventType: string, successCallback: (dataSnapshot: GeofireDataSnapshot) => void, context?: Object): void;
	once(eventType: string, successCallback: (dataSnapshot: GeofireDataSnapshot) => void, failureCallback?: (error: any) => void, context?: Object): void;
	once(eventType: string): Promise<GeofireDataSnapshot>
	/**
	 * Generates a new Query object ordered by the specified child key.
	 */
	orderByChild(key: string): GeofireQuery;
	/**
	 * Generates a new Query object ordered by key name.
	 */
	orderByKey(): GeofireQuery;
	/**
	 * Generates a new Query object ordered by child values.
	 */
	orderByValue(): GeofireQuery;
	/**
	 * Generates a new Query object ordered by priority.
	 */
	orderByPriority(): GeofireQuery;
	/**
	 * @deprecated Use limitToFirst() and limitToLast() instead.
	 * Generates a new Query object limited to the specified number of children.
	 */
	limit(limit: number): GeofireQuery;
	/**
	 * Creates a Query with the specified starting point.
	 * The generated Query includes children which match the specified starting point.
	 */
	startAt(value: string, key?: string): GeofireQuery;
	startAt(value: number, key?: string): GeofireQuery;
	/**
	 * Creates a Query with the specified ending point.
	 * The generated Query includes children which match the specified ending point.
	 */
	endAt(value: string, key?: string): GeofireQuery;
	endAt(value: number, key?: string): GeofireQuery;
	/**
	 * Creates a Query which includes children which match the specified value.
	 */
	equalTo(value: string|number|boolean, key?: string): GeofireQuery;
	/**
	 * Generates a new Query object limited to the first certain number of children.
	 */
	limitToFirst(limit: number): GeofireQuery;
	/**
	 * Generates a new Query object limited to the last certain number of children.
	 */
	limitToLast(limit: number): GeofireQuery;
	/**
	 * Gets a Geofire reference to the Query's location.
	 */
	ref(): Geofire;
}

interface Geofire extends GeofireQuery {

	/**
	 * Gets a Geofire reference for the location at the specified relative path.
	 */
	child(childPath: string): Geofire;
	/**
	 * Gets a Geofire reference to the parent location.
	 */
	parent(): Geofire;
	/**
	 * Gets a Geofire reference to the root of the Geofire.
	 */
	root(): Geofire;
	/**
	 * Returns the last token in a Geofire location.
	 */
	key(): string;
	/**
	 * @deprecated Use key() instead.
	 * Returns the last token in a Geofire location.
	 */
	name(): string;
	/**
	 * Gets the absolute URL corresponding to this Geofire reference's location.
	 */
	toString(): string;
	/**
	 * Writes data to this Geofire location.
	 */
	set(value: any, onComplete: (error: any) => void): void;
	set(value: any): Promise<void>;
	/**
	 * Writes the enumerated children to this Geofire location.
	 */
	update(value: Object, onComplete: (error: any) => void): void;
	update(value: Object): Promise<void>;
	/**
	 * Removes the data at this Geofire location.
	 */
	remove(onComplete: (error: any) => void): void;
	remove(): Promise<void>;
	/**
	 * Generates a new child location using a unique name and returns a Geofire reference to it.
	 * @returns {Geofire} A Geofire reference for the generated location.
	 */
	push(value?: any, onComplete?: (error: any) => void): GeofireWithPromise<void>;
	/**
	 * Writes data to this Geofire location. Like set() but also specifies the priority for that data.
	 */
	setWithPriority(value: any, priority: string|number, onComplete: (error: any) => void): void;
	setWithPriority(value: any, priority: string|number): Promise<void>;
	/**
	 * Sets a priority for the data at this Geofire location.
	 */
	setPriority(priority: string|number, onComplete: (error: any) => void): void;
	setPriority(priority: string|number): Promise<void>;
	/**
	 * Atomically modifies the data at this location.
	 */
	transaction(updateFunction: (currentData: any)=> any, onComplete?: (error: any, committed: boolean, snapshot: GeofireDataSnapshot) => void, applyLocally?: boolean): void;

	onDisconnect(): GeofireOnDisconnect;
}

interface GeofireWithPromise<T> extends Geofire, Promise<T> {}

interface GeofireStatic {
	/**
	 * Constructs a new Geofire reference from a full Geofire URL.
	 */
	new (GeofireURL: string): Geofire;
	/**
	 * Manually disconnects the Geofire client from the server and disables automatic reconnection.
	 */
	goOffline(): void;
	/**
	 * Manually reestablishes a connection to the Geofire server and enables automatic reconnection.
	 */
	goOnline(): void;

	ServerValue: {
		/**
		 * A placeholder value for auto-populating the current timestamp
		 * (time since the Unix epoch, in milliseconds) by the Geofire servers.
		 */
		TIMESTAMP: any;
	};
}
declare var Geofire: GeofireStatic;

declare module 'Geofire' {
	export = Geofire;
}
