import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    location: z.string(),
    image: image(),
    gallery: z.array(image()).optional(),
    order: z.number().default(1),
  }),
});

const heroCollection = defineCollection({
  type: 'data',
  schema: z.object({
    headline: z.string(),
    backgroundImage: z.string(),
  }),
});

// About et Legal sont de type 'content' (Markdown)
const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    image: z.string().optional(),
    caption: z.string().optional(),
    surtitle: z.string().optional(),
    headline: z.string().optional(),
    architectRole: z.string().optional(),
    architectName: z.string().optional(),
  }),
});

const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    surtitle: z.string(),
    title: z.string(),
    titleAccent: z.string(),
  }),
});

export const collections = {
  projects: projectsCollection,
  hero: heroCollection,
  about: aboutCollection,
  legal: legalCollection,
};