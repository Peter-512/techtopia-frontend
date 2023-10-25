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
	isOpen: boolean;
};
