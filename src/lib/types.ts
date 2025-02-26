export type Attraction = {
	attractionUUID: string;
	name: string;
	description: string;
	imageUrl: string;
	iconUrl: string;
	waitingTime: number;
	coordinates: {
		x: number;
		y: number;
	};
	tags: string[];
	minHeight: number;
	minAge: number;
	open: boolean;
};

export type AdminAttraction = {
	attractionUUID: {
		uuid: string;
	};
	throughput: 'LOW' | 'HIGH';
	currentVisitors: number;
	currentWaitingTime: number;
	threshold: number;
};

export type PointOfInterest = {
	category: 'REFRESHMENT_STAND' | 'ATTRACTION';
	uuid: string;
	name: string;
	waitingTime: number | null;
	minHeight: number | null;
	minAge: number | null;
	x: number;
	y: number;
	tags: string[];
};

export type FullAttraction = Attraction & Omit<AdminAttraction, 'attractionUUID'>;

export type Gate = {
	gateUUID: string;
	coordinates: {
		x: number;
		y: number;
	};
};

export type VisitorForecast = {
	date: string;
	predictedVisitors: number;
	error: boolean;
	errorMessage: string;
};

export type WeatherForecast = {
	date: string;
	weatherType: string;
	temperatureType: string;
};

export type RefreshmentStandsForecast = {
	amount: number;
};

export type RefreshmentStand = {
	uuid: string;
	name: string;
	category: string;
	x: number;
	y: number;
};
