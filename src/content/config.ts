import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    image: z.string(), // Plus tard, on pourra utiliser image() d'Astro pour l'optimisation
    order: z.number(), // Pour trier l'ordre d'affichage
  }),
});

export const collections = {
  'projects': projectsCollection,
};