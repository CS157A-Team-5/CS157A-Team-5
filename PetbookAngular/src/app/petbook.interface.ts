export interface Pet {
	id: Number;
	owner_id: Number;
	name: String;
	weight: Number
	age: Number;
	species: String;
}

export interface Owner {
	id: Number;
	email: String;
	password: String;
	name: String;
	location: String;
}

export interface Club {
	id: Number;
	name: String;
	species: String;
	size: Number;
}

export interface Park {
	id: Number;
	name: String;
	location: String;
	hours: String;
}

export interface Treat {
	id: Number;
	manufacturer: String;
	name: String;
	species: String;
}
