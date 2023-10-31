import { z } from 'zod';

export const poiSchema = z.object({
	uuid: z.string(),
	name: z.string(),
	description: z.string(),
	iconUrl: z.string().url(),
	imgUrl: z.string().url(),
	x: z.number(),
	y: z.number(),
	tags: z.array(z.enum(['WILD', 'ADVENTURE', 'DARKRIDE', 'FANTASY'])),
	category: z.enum(['attraction', 'refreshment'])
});

export const attractionSchema = z.object({
	attractionUUID: z.string(),
	minHeight: z.number(),
	minAge: z.number(),
	throughput: z.enum(['LOW', 'HIGH']),
	threshold: z.number(),
	open: z.boolean()
});

export type POIFormSchema = typeof poiSchema;
export type AttractionFormSchema = typeof attractionSchema;
