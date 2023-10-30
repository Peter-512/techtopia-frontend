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

export type FullAttraction = Attraction & Omit<AdminAttraction, 'attractionUUID'>;

export type Gate = {
	gateUUID: string;
	coordinates: {
		x: number;
		y: number;
	};
};
