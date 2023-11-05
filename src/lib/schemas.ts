import { z } from 'zod';

export const poiSchema = z.object({
	name: z.string(),
	description: z.string(),
	iconUrl: z.string().url(),
	imgUrl: z.string().url(),
	x: z.coerce.number(),
	y: z.coerce.number(),
	tags: z.array(z.enum(['WILD', 'ADVENTURE', 'DARKRIDE', 'FANTASY'])),
	category: z.enum(['attraction', 'refreshment']),
	minAge: z.coerce.number(),
	minHeight: z.coerce.number(),
	open: z.boolean()
});

export const refreshmentSchema = z.object({
	x: z.coerce.number().max(1000).min(0),
	y: z.coerce.number().max(1000).min(0),
	name: z.string().min(3),
	category: z.enum(['FOOD', 'DRINKS', 'SNACKS'])
});

export const attractionSchema = z.object({
	throughput: z.enum(['LOW', 'HIGH']),
	threshold: z.coerce.number()
});

export const visitorCountSchema = z.object({
	date: z.date()
});

export type POIFormSchema = typeof poiSchema;
export type AttractionFormSchema = typeof attractionSchema;
