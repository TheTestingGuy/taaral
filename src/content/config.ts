import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  // 1. On passe la fonction helper 'image' ici
  schema: ({ image }) => z.object({
    title: z.string(),
    location: z.string(),
    // 2. On indique que ce champ est une vraie image !
    image: image(), 
    order: z.number(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};