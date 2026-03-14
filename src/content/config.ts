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
  schema: ({ image }) => z.object({
    headline: z.string(),
    backgroundImage: image(),
    backgroundVideo: z.string().optional(),
  }),
});

const projectsPageCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    headline: z.string(),
    backgroundImage: image(),
    backgroundVideo: z.string().optional(),
  }),
});

// About et Legal sont de type 'content' (Markdown)
const aboutCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    image: image(),
    caption: z.string().optional(),
    surtitle: z.string().optional(),
    headline: z.string().optional(),
    architectRole: z.string().optional(),
    architectName: z.string().optional(),
  }),
});

const formulasCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    categories: z.array(
      z.object({
        name: z.string(),
        packages: z.array(
          z.object({
            name: z.string(),
            price: z.string(),
            features: z.array(z.string()),
          })
        ).optional(),
        optionsTitle: z.string().optional(),
        options: z.array(
          z.object({
            name: z.string(),
            price: z.string(),
          })
        ).optional(),
      })
    ).optional(),
    disclaimer: z.string().optional(),
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

const footerCollection = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string().optional(),
    socials: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  hero: heroCollection,
  "projects-page": projectsPageCollection,
  about: aboutCollection,
  legal: legalCollection,
  footer: footerCollection,
  formulas: formulasCollection,
};