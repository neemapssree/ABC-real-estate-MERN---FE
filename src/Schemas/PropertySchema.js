import { z } from 'zod';

export const propertySchema = z.object({
    propname: z.string().min(1, 'Property name is required'),
    state: z.string().min(1, 'Please select a state'),
    type: z.string().min(1, 'Please select a unit type'),
    beds: z.array(z.string()).min(1, 'Select atleast one bedroom option'),
    baths: z.array(z.string()).min(1, 'Select atleast one bathroom option'),
    price: z.string().min(1, 'Price is required'),
    area: z.string().min(1, 'Area is required'),
    handover: z.string().optional(),
    propaddress: z.string().optional(),
    isFeatured: z.boolean(),
    isStock: z.boolean(),
});